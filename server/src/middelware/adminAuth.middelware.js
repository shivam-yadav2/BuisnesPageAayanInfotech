const jwt = require("jsonwebtoken");
const  Admin  = require("../models/auth.model.js");
const { ApiError } = require("../utils/ApiError.utils.js");
const { asyncHandler } = require("../utils/asyncHandler.utils.js");

const verifyAdminJwt = asyncHandler(async (req, res, next) => {
    try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer", "").trim();
        console.log(token)

        if (!token) {
            throw new ApiError(401, "Unauthorized Request");
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);

        const user = await Admin.findById(decodedToken?._id).select("-password ");

        if (!user) {
            throw new ApiError(401, "Invalid accessToken");
        }

        req.user = user;
        next();

    } catch (error) {
        throw new ApiError(401, error?.message);
    }
});

module.exports = { verifyAdminJwt };
