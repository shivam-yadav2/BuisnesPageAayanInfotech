const Slider = require("../models/slider.model.js");
const { ApiError } = require("../utils/ApiError.utils.js");
const { ApiResponse } = require("../utils/ApiResponse.utils.js");
const { asyncHandler } = require("../utils/asyncHandler.utils.js");

exports.getSliders = asyncHandler(async (req, res) => {
  const sliders = await Slider.find({
    isActive: true,
  });
  res
    .status(200)
    .json(new ApiResponse(200, sliders, "Sliders fetched successfully"));
});

exports.addSlider = asyncHandler(async (req, res) => {
  const { altText } = req.body;

  console.log("Request Body:", req.body);

  if (!req.files || !req.files.image || !req.files.image[0]) {
    throw new ApiError(400, "Image is required");
  }

  const imagePath = req.files.image[0].path
    .replace("public\\", "")
    .replace(/\\/g, "/");

  const newSlider = await Slider.create({
    image: imagePath,
    altText: altText || "slider Image",
    isActive: true,
  });

  res
    .status(201)
    .json(new ApiResponse(201, newSlider, "Slider added successfully"));
});

exports.updateSlider = asyncHandler(async (req, res) => {
  const { altText, id, isActive } = req.body;

  console.log("Request Body:", req.body);

  if (!id) {
    throw new ApiError(400, "Slider ID is required");
  }

  let imagePath = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imagePath = req.files.image[0].path
      .replace("public\\", "")
      .replace(/\\/g, "/");
  }

  const updateData = {
    altText: altText || "slider Image",
    isActive: isActive !== undefined ? isActive : true,
  };

  if (imagePath) {
    updateData.image = imagePath;
  }

  const updatedSlider = await Slider.findByIdAndUpdate(id, updateData, {
    new: true,
  });

  if (!updatedSlider) {
    throw new ApiError(404, "Slider not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedSlider, "Slider updated successfully"));
});

exports.deleteSlider = asyncHandler(async (req, res) => {
  const { id } = req.body;

  if (!id) {
    throw new ApiError(400, "Slider ID is required");
  }

  const slider = await Slider.findByIdAndDelete(id);

  if (!slider) {
    throw new ApiError(404, "Slider not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Slider deleted successfully"));
});

exports.changeActiveStatus = asyncHandler(async (req, res) => {
  const { isActive, id } = req.body;

  if (!id) {
    throw new ApiError(400, "Slider ID is required");
  }

  if (isActive === undefined) {
    throw new ApiError(400, "isActive status is required");
  }

  const updatedSlider = await Slider.findByIdAndUpdate(
    id,
    { isActive },
    { new: true }
  );

  if (!updatedSlider) {
    throw new ApiError(404, "Slider not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, updatedSlider, "Slider status updated"));
});