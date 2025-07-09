const mongoose = require("mongoose");

const { Schema } = mongoose;
const ServiceSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "service Image is required"],
    },
    title: {
      type: String,
      required:[true,"Title is required"]
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Service", ServiceSchema);