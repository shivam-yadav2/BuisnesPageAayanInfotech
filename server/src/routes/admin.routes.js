const express = require("express");
const { loginAdmin ,registerAdmin } = require("../controllers/Admin.controller.js");


const router = express.Router();

router.route("/login").post(loginAdmin);
router.route("/register").post(registerAdmin);
router.route("/register").post(registerAdmin);

module.exports = router;
