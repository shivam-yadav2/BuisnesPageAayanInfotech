const Admin = require("../models/auth.model.js");
const { ApiError } = require("../utils/ApiError.utils.js");
const { ApiResponse } = require("../utils/ApiResponse.utils.js");
const { asyncHandler } = require("../utils/asyncHandler.utils.js");

const jwt = require("jsonwebtoken");

const generateAccessAndRefreshTokens = async (adminId) => {
  try {
    const admin = await Admin.findById(adminId);
    const refreshToken = admin.generateRefreshToken();
    const accessToken = admin.generateAccessToken();
    admin.refreshToken = refreshToken;
    await admin.save({ validateBeforeSave: false });
    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(500, "Token not generated");
  }
};

const registerAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  console.log(email, password);

  if ([email, password].some((field) => field?.trim() === "")) {
    throw new ApiError(400, "All fields are required");
  }

  const isAlreadyExist = await Admin.findOne({ email });

  if (isAlreadyExist) {
    throw new ApiError(409, "Admin Already Exists");
  }

  const user = await Admin.create({
    email,
    password,
  });

  if (!user) {
    throw new ApiError(500, "Admin not created");
  }

  const createdUser = await Admin.findById(user._id).select("-password");

  if (!createdUser) {
    throw new ApiError(500, "User not created");
  }

  return res
    .status(201)
    .json(new ApiResponse(201, "Admin Created", createdUser));
});

const loginAdmin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    throw new ApiError(400, "All fields are required");
  }

  const existedAdmin = await Admin.findOne({ email });
  if (!existedAdmin) {
    throw new ApiError(404, "Admin not found");
  }

  const isPasswordCorrect = await existedAdmin.isPasswordCorrect(password);

  if (!isPasswordCorrect) {
    throw new ApiError(400, "Invalid credentials");
  }

  const { accessToken, refreshToken } = await generateAccessAndRefreshTokens(
    existedAdmin._id
  );

  const loggedInAdmin = await Admin.findById(existedAdmin._id).select(
    "-password -refreshToken"
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };

  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        {
          admin: loggedInAdmin,
          accessToken,
          refreshToken,
        },
        "Admin Logged In"
      )
    );
});

const logoutAdmin = asyncHandler(async (req, res) => {
  const { id } = req.body;
  await Admin.findByIdAndUpdate(
    id,
    {
      $set: {
        refreshToken: undefined,
      },
    },
    {
      new: true,
    }
  );

  const options = {
    httpOnly: true,
    secure: false,
    sameSite: "lax",
  };

  return res
    .status(200)
    .clearCookie("accessToken", options)
    .clearCookie("refreshToken", options)
    .json(new ApiResponse(200, {}, "Admin logged out successfully"));
});

const refreshAccessToken = asyncHandler(async (req, res) => {
  const incomingRefreshToken =
    req.cookies.refreshToken || req.body.refreshToken;

  if (!incomingRefreshToken) {
    throw new ApiError(401, "Unauthorized request");
  }

  try {
    const decodedToken = jwt.verify(
      incomingRefreshToken,
      process.env.REFRESH_TOKEN_SECRET
    );

    const admin = await Admin.findById(decodedToken?._id);
    if (!admin) {
      throw new ApiError(401, "Invalid Refresh Token");
    }

    if (incomingRefreshToken !== admin?.refreshToken) {
      throw new ApiError(401, "Refresh Token is expired");
    }

    const options = {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
    };

    const { accessToken, refreshToken: newRefreshToken } =
      await generateAccessAndRefreshTokens(admin._id);

    return res
      .status(200)
      .cookie("accessToken", accessToken, options)
      .cookie("refreshToken", newRefreshToken, options)
      .json(
        new ApiResponse(
          200,
          { accessToken, newRefreshToken },
          "Access Token Refreshed Successfully"
        )
      );
  } catch (error) {
    throw new ApiError(401, error?.message || "Invalid Refresh Token");
  }
});

module.exports = {
  registerAdmin,
  loginAdmin,
  logoutAdmin,
  refreshAccessToken,
};