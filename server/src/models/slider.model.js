const mongoose = require("mongoose");

const { Schema } = mongoose;
const SliderSchema = new Schema(
  {
    image: {
      type: String,
      required: [true, "image is required"],
    },
    altText: {
      type: String,
      default: "slider Image",
    },
    isActive: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Slider", SliderSchema);
