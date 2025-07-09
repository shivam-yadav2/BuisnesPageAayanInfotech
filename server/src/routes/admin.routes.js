const express = require("express");
const { loginAdmin, registerAdmin, logoutAdmin, refreshAccessToken } = require("../controllers/Admin.controller.js");

const router = express.Router();

router.route("/login").post(loginAdmin);
router.route("/register").post(registerAdmin);
router.route("/logout").post(logoutAdmin);
router.route("/refresh-token").post(refreshAccessToken);

module.exports = router;
