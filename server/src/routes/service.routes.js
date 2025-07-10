const express = require("express");
const {
  getServices,
  addService,
  updateService,
  deleteService,
  changeActiveStatus,
} = require("../controllers/service.controller.js");
const { verifyAdminJwt } = require("../middelware/adminAuth.middelware.js");
const { upload } = require("../middelware/multer.middelware.js");

const router = express.Router();

router.route("/get-services").get( getServices);
router.route("/add-service").post(verifyAdminJwt, upload.fields([
  { name: "image", maxCount: 1 },
]), addService);
router.route("/update-service").post(verifyAdminJwt, upload.fields([
  { name: "image", maxCount: 1 },
]), updateService);
router.route("/delete-service").post(verifyAdminJwt, deleteService);
router.route("/change-status").post(verifyAdminJwt, changeActiveStatus);

module.exports = router;
