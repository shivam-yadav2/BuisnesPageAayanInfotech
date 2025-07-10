const Service = require("../models/service.model.js");
const { ApiError } = require("../utils/ApiError.utils.js");
const { ApiResponse } = require("../utils/ApiResponse.utils.js");
const { asyncHandler } = require("../utils/asyncHandler.utils.js");

exports.getServices = asyncHandler(async (req, res) => {
  const service = await Service.find();
  res
    .status(200)
    .json(new ApiResponse(200, service, "Services  fetched successfully"));
});

exports.getServicesFront = asyncHandler(async (req, res) => {
  const service = await Service.find({
    isActive: true,
  });
  res
    .status(200)
    .json(new ApiResponse(200, service, "Services  fetched successfully"));
});

exports.addService = asyncHandler(async (req, res) => {
  const { title } = req.body;

  console.log("Request Body:", req.body);

  if (!title) {
    throw new ApiError(400, "Title is required");
  }

  let imagePath = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imagePath = req.files.image[0].path
      .replace("public\\", "")
      .replace(/\\/g, "/");
  }

  const newService = await Service.create({ title, image: imagePath });

  res
    .status(201)
    .json(new ApiResponse(201, newService, "Service added successfully"));
});

exports.updateService = asyncHandler(async (req, res) => {
  const { title, id, isActive } = req.body;

  console.log("Request Body:", req.body);

  let imagePath = "";
  if (req.files && req.files.image && req.files.image[0]) {
    imagePath = req.files.image[0].path
      .replace("public\\", "")
      .replace(/\\/g, "/");
  }

  const newService = await Service.findByIdAndUpdate(id, {
    title,
    image: imagePath,
    isActive,
  });

  res
    .status(201)
    .json(new ApiResponse(201, newService, "Service added successfully"));
});

exports.deleteService = asyncHandler(async (req, res) => {
  const { id } = req.body;
  const service = await Service.findByIdAndDelete( id );
  if (!service) {
    throw new ApiError(404, "Service not found");
  }

  res
    .status(200)
    .json(new ApiResponse(200, null, "Service deleted successfully"));
});

exports.changeActiveStatus = asyncHandler(async (req, res) => {
  const { isActive, id } = req.body;

  const status = await Service.findByIdAndUpdate(id, {
    isActive,
  });

  if (!status) {
    throw new ApiError(404, "Service not Found");
  }

  res.status(200).json(new ApiResponse(200, null, "Service status updated"));
});
