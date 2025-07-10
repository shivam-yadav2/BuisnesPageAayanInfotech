const About = require("../models/about.model.js");
const { ApiError } = require("../utils/ApiError.utils.js");
const { ApiResponse } = require("../utils/ApiResponse.utils.js");
const { asyncHandler } = require("../utils/asyncHandler.utils.js");

exports.getAbout = asyncHandler(async (req, res) => {
  const about = await About.findOne();
  res
    .status(200)
    .json(new ApiResponse(200, about, "About data fetched successfully"));
});

// ADD a new enquiry
exports.addAboutData = asyncHandler(async (req, res) => {
  const { content } = req.body;

  console.log("Request Body:", req.body);

  if (!content) {
    throw new ApiError(400, "Content and image are required");
  }

  let imagePath = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imagePath = req.files.image[0].path
      .replace("public\\", "")
      .replace(/\\/g, "/");
  }

  const newabout = await About.create({ content, image: imagePath });

  res
    .status(201)
    .json(new ApiResponse(201, newabout, "About Data added successfully"));
});

exports.updateAboutData = asyncHandler(async (req, res) => {
  const { id, content } = req.body;

  console.log("Request Body:", req.body);

  if (!content) {
    throw new ApiError(400, "Content is required");
  }

  let imagePath = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imagePath = req.files.image[0].path
      .replace("public\\", "")
      .replace(/\\/g, "/");
  }

  const updateData = { content };
  if (imagePath) {
    updateData.image = imagePath;
  }

  const updatedAbout = await About.findByIdAndUpdate(id, updateData, {
    new: true,
    runValidators: true,
  });

  res
    .status(200)
    .json(new ApiResponse(200, updatedAbout, "About Data updated successfully"));
});