// server.js
const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const cookieParser = require("cookie-parser");
const authRoutes = require("./routes/authRoutes");
const issueRoutes = require("./routes/issueRoutes");
const connectDB = require("./db/db");

dotenv.config();
const app = express();

// Middleware
app.use(cors({
  origin: "https://civicfix-hilv.onrender.com",
  credentials: true, // Allow cookies to be sent with requests
}));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/issues", issueRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, async () => {
  await connectDB();
  console.log(`Server running on port ${PORT}`);
});
