const mongoose = require("mongoose");

const { Schema } = mongoose;
const TestimonialSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    message: {
      type: String,
      required: [true, "Message is required"],
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", TestimonialSchema);
