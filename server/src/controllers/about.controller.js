const About = require('../models/about.model.js')
const {ApiError} = require("../utils/ApiError.utils.js");
const {ApiResponse} = require("../utils/ApiResponse.utils.js");
const {asyncHandler} = require("../utils/asyncHandler.utils.js");

exports.getAbout = asyncHandler(async (req, res) => {
  const about = await About.findOne();
  res
    .status(200)
    .json(new ApiResponse(200, about, "About data fetched successfully"));
});

// ADD a new enquiry
exports.addAboutData = asyncHandler(async (req, res) => {
  
  const { title, description} = req.body;
  
 console.log("Request Body:", req.body);
 
  if (!title || !description) {
    throw new ApiError(400, "Title and description are required");
  }

  const newabout = await About.create({ title, description });

  res
    .status(201)
    .json(new ApiResponse(201, newabout, "About Data added successfully"));
});

// DELETE an enquiry by ID
exports.deleteEnquiry = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const enquiry = await EnquirySchema.findByIdAndUpdate(id, {
    $set: {
      isDeleted: true,
    },
  });
  if (!enquiry) {
    throw new ApiError(404, "Enquiry not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Enquiry deleted successfully"));
});

