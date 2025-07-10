const express = require("express");
const {
  getAbout,
  addAboutData,
  updateAboutData,
} = require("../controllers/about.controller.js");
const { upload } = require("../middelware/multer.middelware.js");


const router = express.Router();

router.route("/get-about").get(getAbout);
router.route("/add-about").post(upload.fields([
  { name: "image", maxCount: 1 },
]),addAboutData);
router.route("/update-about").post(upload.fields([
  { name: "image", maxCount: 1 },
]),updateAboutData);


module.exports = router;
