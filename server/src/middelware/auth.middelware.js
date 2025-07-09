const jwt = require("jsonwebtoken");
const { User } = require("../models/user.model.js");
const { ApiError } = require("../utils/ApiError.utils.js");
const { asyncHandler } = require("../utils/asyncHandler.utils.js");

const verifyJwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "").trim();
        console.log(token)

        if (!token) {
            throw new ApiError(401, "Unauthorized Request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await User.findById(decodedToken?._id).select("-password -refreshToken");

        if (!user) {
            throw new ApiError(401, "Invalid accessToken");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message);
    }
});

module.exports = { verifyJwt };
