const express = require("express");
const {
  getAbouts,
  addAbout,
  updateAbout,
  deleteAbout,
  changeActiveStatus,
} = require("../controllers/about.controller.js");

const router = express.Router();

router.route("/get-about").get(getAbouts);
router.route("/add-about").post(addAbout);
router.route("/update-about").post(updateAbout);
router.route("/delete-about").post(deleteAbout);
router.route("/change-status").post(changeActiveStatus);

module.exports = router;
