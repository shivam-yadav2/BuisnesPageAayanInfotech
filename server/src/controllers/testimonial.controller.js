const Testimonial = require("../models/testimonial.mode.js");
const { ApiError } = require("../utils/ApiError.utils.js");
const { ApiResponse } = require("../utils/ApiResponse.utils.js");
const { asyncHandler } = require("../utils/asyncHandler.utils.js");

exports.getTestimonials = asyncHandler(async (req, res) => {
  const testimonial = await Testimonial.find();
  res
    .status(200)
    .json(
      new ApiResponse(200, testimonial, "Testimonials  fetched successfully")
    );
});

exports.addTestimonial = asyncHandler(async (req, res) => {
  const { name, message } = req.body;

  console.log("Request Body:", req.body);

  if (!name || !message) {
    throw new ApiError(400, "name and message is required");
  }

  const newTestimonial = await Testimonial.create({ name, message });

  res
    .status(201)
    .json(
      new ApiResponse(201, newTestimonial, "Testimonial added successfully")
    );
});

exports.updateTestimonial = asyncHandler(async (req, res) => {
  const { name, id, isActive, message } = req.body;

  console.log("Request Body:", req.body);

  const newTestimonial = await Testimonial.findByIdAndUpdate(id, {
    name,
    message,
    isActive,
  });

  res
    .status(201)
    .json(
      new ApiResponse(201, newTestimonial, "Testimonial updated successfully")
    );
});

exports.deleteTestimonial = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const testimonial = await Testimonial.findByIdAndDelete( id );
  if (!testimonial) {
    throw new ApiError(404, "Testimonial not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Testimonial deleted successfully"));
});

exports.changeTestimonialActiveStatus = asyncHandler(async (req, res) => {
  const { isActive, id } = req.body;

  const status = await Testimonial.findByIdAndUpdate(id, {
    isActive,
  });

  if (!status) {
    throw new ApiError(404, "Testimonial not Found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Testimonial status updated"));
});
