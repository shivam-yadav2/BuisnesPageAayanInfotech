const EnquirySchema = require("../models/enquiry.model.js");
const { ApiError } = require("../utils/ApiError.utils.js");
const { ApiResponse } = require("../utils/ApiResponse.utils.js");
const { asyncHandler } = require("../utils/asyncHandler.utils.js");

console.log("Enquiry Model:", EnquirySchema);
// GET all enquiries
exports.getAllEnquiries = asyncHandler(async (req, res) => {
  const enquiries = await EnquirySchema.find({ isDeleted: false });
  res
    .status(200)
    .json(new ApiResponse(200, enquiries, "Enquiries fetched successfully"));
});

// ADD a new enquiry
exports.createEnquiry = asyncHandler(async (req, res) => {
  const { name, email, message } = req.body;

  console.log("Request Body:", req.body);

  if (!name || !email || !message) {
    throw new ApiError(400, "Name  , email and message   are required");
  }

  const newEnquiry = await EnquirySchema.create({ name, email, message });

  res
    .status(201)
    .json(new ApiResponse(201, newEnquiry, "Enquiry created successfully"));
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
