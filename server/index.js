const dotenv = require("dotenv");
const connectDB = require("./src/db/config.db.js");
const app = require("./src/app");
const { errorHandler } = require("./src/middelware/errorHandler.middelware.js");

dotenv.config({ path: "./.env" });

// console.log(`PORT from .env: ${process.env.PORT}`);

// app.use(errorHandler);


const startServer = async () => {
  try {
    await connectDB();
    app.listen(process.env.PORT, () => {
      console.log(`✅ Server is running on port ${process.env.PORT}`);
    });

    // 🔥 Test response at the root endpoint
    app.get("/", (req, res) => {
      res.status(200).json({ message: "Server is up and running!" });
    });
  } catch (err) {
    console.error("❌ Server failed to start", err);
  }
};

startServer();