const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config();

const connectDB = require("./config/db");
const userRoutes = require("./routes/userRoutes");
const authRoutes = require("./routes/authRoutes");
const eventRoutes = require("./routes/eventRoutes");
const adminRoutes = require("./routes/adminRoutes");
const bookMarkRoutes = require("./routes/bookMarkRoutes");
const chatRoutes = require("./routes/chatRoutes");

const app = express();

// middleware
app.use(cors({
  origin: "http://localhost:5173", // ⚠️ will fix below
  credentials: true
}));

app.use(express.json());
app.use(cookieParser());

// DB connect
connectDB();

// routes
app.use("/api/auth", authRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/users", userRoutes);
app.use("/api/admin", adminRoutes);
app.use("/uploads", express.static("uploads"));
app.use("/api/bookmarks", bookMarkRoutes);
app.use("/api", chatRoutes);

// ❌ REMOVE app.listen
// ✅ EXPORT instead
module.exports = app;