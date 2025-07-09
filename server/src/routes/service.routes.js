const express = require("express");
const {
  getServices,
  addService,
  updateService,
  deleteService,
  changeActiveStatus,
} = require("../controllers/service.controller.js");
const { verifyAdminJwt } = require("../middelware/adminAuth.middelware.js");

const router = express.Router();

router.route("/get-services").get(verifyAdminJwt, getServices);
router.route("/add-service").post(verifyAdminJwt, addService);
router.route("/update-service").post(verifyAdminJwt, updateService);
router.route("/delete-service").post(verifyAdminJwt, deleteService);
router.route("/change-status").post(verifyAdminJwt, changeActiveStatus);

module.exports = router;
