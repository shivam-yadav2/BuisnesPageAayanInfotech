const express = require("express");
const {
  getTestimonials,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  changeTestimonialActiveStatus,
  getTestimonialsFront,
} = require("../controllers/testimonial.controller.js");
const { verifyAdminJwt } = require("../middelware/adminAuth.middelware.js");

const router = express.Router();

router.route("/get-testimonial").get(getTestimonials);
router.route("/get-user-testimonial").get(getTestimonialsFront);
router.route("/add-testimonial").post(verifyAdminJwt, addTestimonial);
router.route("/update-testimonial").post(verifyAdminJwt, updateTestimonial);
router.route("/delete-testimonial").post(verifyAdminJwt, deleteTestimonial);
router
  .route("/change-testimonial-status")
  .post(verifyAdminJwt, changeTestimonialActiveStatus);

module.exports = router;
