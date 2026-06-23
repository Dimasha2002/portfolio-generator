const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const connectDB = async ({ retries = 3, backoffMs = 2000 } = {}) => {
  const uri = process.env.MONGO_URI;
  if (!uri) {
    console.error("Error: MONGO_URI is not defined in environment variables.");
    process.exit(1);
  }

  for (let attempt = 1; attempt <= retries; attempt++) {
    try {
      const conn = await mongoose.connect(uri);
      console.log(`MongoDB Connected: ${conn.connection.host}`);
      return conn;
    } catch (error) {
      const msg = error.message || String(error);
      // Detect common Atlas network/access issues
      if (msg.includes("Could not connect to any servers in your MongoDB Atlas cluster") || msg.toLowerCase().includes("whitelist")) {
        console.error("MongoDB connection error: Could not connect to the Atlas cluster.");
        console.error("Common causes: IP address not whitelisted, cluster paused, or network restrictions.");
        console.error("If you're using MongoDB Atlas, add your current IP (or 0.0.0.0/0 for testing) under Network Access:");
        console.error("https://www.mongodb.com/docs/atlas/security-whitelist/");
        console.error(`Original error: ${msg}`);
        // No point retrying if it's an access/whitelist issue; break out.
        break;
      }

      console.error(`MongoDB connection attempt ${attempt} failed: ${msg}`);
      if (attempt < retries) {
        const delay = backoffMs * attempt;
        console.log(`Retrying in ${delay}ms... (${attempt + 1}/${retries})`);
        await wait(delay);
      } else {
        console.error("All MongoDB connection attempts failed.");
      }
    }
  }

  // If we reach here, connection failed
  process.exit(1);
};

module.exports = connectDB;
