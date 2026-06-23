require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");
const portfolioRoutes = require("./routes/portfolioRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

const startServer = async () => {
  await connectDB();

  const PORT = process.env.PORT || 5000;
  const server = app.listen(PORT, () => {
    console.log(`Server running in ${process.env.NODE_ENV || "production"} mode on port ${PORT}`);
  });

  server.on("error", (err) => {
    if (err.code === "EADDRINUSE") {
      console.error(`Port ${PORT} is already in use. Please stop the process using this port or set PORT to a free port.`);
    } else {
      console.error("Server error:", err);
    }
    process.exit(1);
  });
};

process.on("unhandledRejection", (err) => {
  console.error("Unhandled Rejection:", err);
});

process.on("uncaughtException", (err) => {
  console.error("Uncaught Exception:", err);
  process.exit(1);
});

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// Routes
app.use("/api/portfolio", portfolioRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({ success: true, message: "Portfolio Generator API is running" });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: "Route not found" });
});

// Error handler (must be last)
app.use(errorHandler);

// Start server after middleware and route registration
startServer();
