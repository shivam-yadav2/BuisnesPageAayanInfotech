const express = require("express");
const { loginAdmin ,registerAdmin, logoutAdmin } = require("../controllers/Admin.controller.js");

const router = express.Router();

router.route("/login").post(loginAdmin);
router.route("/register").post(registerAdmin);
router.route("/logout").post(logoutAdmin);

module.exports = router;
