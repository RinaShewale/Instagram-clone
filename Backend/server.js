require("dotenv").config();
const express = require("express");
const path = require("path");
const connectToDb = require("./src/config/database");

// Import your backend app (API routes)
const app = require("./src/routes/app");

// Connect to MongoDB
connectToDb();

// Serve frontend build (after Vite build)
app.use(express.static(path.join(__dirname, "../Frontend/dist"))); // Vite builds to dist

// API routes are already in your app.js
// e.g., app.use("/api/auth", authRouter) inside app.js

// Fallback for React Router
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

// Dynamic port for Render or local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});