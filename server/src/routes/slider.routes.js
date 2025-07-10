const express = require("express");
const {
  getSliders,
  addSlider,
  updateSlider,
  deleteSlider,
  changeActiveStatus,
} = require("../controllers/slider.controller.js");
const { verifyAdminJwt } = require("../middelware/adminAuth.middelware.js");
const { upload } = require("../middelware/multer.middelware.js");

const router = express.Router();

router.route("/get-slider").get( getSliders);
router.route("/add-slider").post(verifyAdminJwt, upload.fields([
  { name: "image", maxCount: 1 },
]), addSlider);
router.route("/update-slider").post(verifyAdminJwt, upload.fields([
  { name: "image", maxCount: 1 },
]), updateSlider);
router.route("/delete-slider").post(verifyAdminJwt, deleteSlider);
router.route("/change-status").post(verifyAdminJwt, changeActiveStatus);

module.exports = router;
