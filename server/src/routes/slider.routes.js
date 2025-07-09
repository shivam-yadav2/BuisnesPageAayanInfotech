const express = require("express");
const {
  getSliders,
  addSlider,
  updateSlider,
  deleteSlider,
  changeActiveStatus,
} = require("../controllers/slider.controller.js");
const { verifyAdminJwt } = require("../middelware/adminAuth.middelware.js");

const router = express.Router();

router.route("/get-slider").get(verifyAdminJwt, getSliders);
router.route("/add-slider").post(verifyAdminJwt, addSlider);
router.route("/update-slider").post(verifyAdminJwt, updateSlider);
router.route("/delete-slider").post(verifyAdminJwt, deleteSlider);
router.route("/change-status").post(verifyAdminJwt, changeActiveStatus);

module.exports = router;
