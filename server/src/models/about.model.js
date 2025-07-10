const mongoose = require("mongoose");

const { Schema } = mongoose;
const AboutSchema = new Schema(
  {
    content: {
      type: String,
      required: [true, "Content is required"],
    },
    image: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("About", AboutSchema);
