const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const xss = require("xss-clean");
const mongoSanitize = require("express-mongo-sanitize");
const rateLimit = require("express-rate-limit");

const app = express();
const corsOptions = {
  origin: ["http://localhost:5173", "http://localhost:5174"],
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
};
app.use(cors(corsOptions));
app.use(helmet());
app.use(xss());
app.use(mongoSanitize());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: "Too many Requests from this IP , try again later",
});

app.use(limiter);

// routes import
const adminRouter = require("./routes/admin.routes.js");
const serviceRouter = require("./routes/service.routes.js");
const testimonialRouter = require("./routes/testimonial.routes.js");
const sliderRouter = require("./routes/slider.routes.js");
const aboutRouter = require("./routes/about.routes.js");
const enquiryRouter = require("./routes/enquiry.routes.js");

// // Use Routes
app.use("/api/v1/admin/", adminRouter);
app.use("/api/v1/service/", serviceRouter);
app.use("/api/v1/testimonial/", testimonialRouter);
app.use("/api/v1/slider/", sliderRouter);
app.use("/api/v1/about/", aboutRouter);
app.use("/api/v1/enquiry/", enquiryRouter);

module.exports = app;
