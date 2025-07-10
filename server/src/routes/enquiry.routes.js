const express = require("express");
const router = express.Router();
const {
  createEnquiry,
  getAllEnquiries,
  deleteEnquiry,
} = require("../controllers/enquiry.controller");

// Enquiry Routes
router.route("/add").post(createEnquiry);
router.route("/getAll").get(getAllEnquiries);
router.route("/deleteById/:id").delete(deleteEnquiry);

module.exports = router;