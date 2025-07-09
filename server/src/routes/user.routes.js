const express = require("express");
const {
  registerUser,
  loginUser,
  logoutUser,
  refreshAccessToken,
  getCurrentUser,
  updateUserData,
  updateAvatar,
  changePassword,
  getAllUser,
  updateUserApprovalStatus,
  updatePropertyStatus,
  getUserProperties,
  deleteProperty
} = require("../controllers/user.controller.js");

const { verifyJwt } = require("../middelware/auth.middelware.js");
const { upload } = require("../middelware/multer.middelware.js");
const { verifyAdminJwt } = require("../middelware/adminAuth.middelware.js");

const router = express.Router();

router.route("/signup").post(
  upload.fields([
    { name: "avatar", maxCount: 1 },
  ]),
  registerUser
);

router.route("/signin").post(loginUser);

// Secured routes
router.route("/logout").post(verifyJwt, logoutUser);
router.route("/refresh-token").post(refreshAccessToken);
router.route("/me").get(verifyJwt, getCurrentUser);
router.route("/all-users").get(verifyAdminJwt, getAllUser);
router.route("/update").post(verifyJwt, updateUserData);
router.route("/update-status").post(verifyAdminJwt, updateUserApprovalStatus);
router.route("/change-password").post(verifyJwt, changePassword);
router.route("/user-properties").post(verifyJwt, getUserProperties);
router.route("/update-property-availability").post(verifyJwt, updatePropertyStatus);
router.route("/user-property-delete").post(verifyJwt, deleteProperty);
router
  .route("/update-avatar")
  .post(verifyJwt, upload.single("avatar"), updateAvatar);

module.exports = router;
