require("dotenv").config();
const express = require("express");
const path = require("path");
const connectToDb = require("./src/config/database");

// Import backend API routes
const app = require("./src/app");

// Connect to MongoDB
connectToDb();

// Serve React frontend (Vite build folder)
app.use(express.static(path.join(__dirname, "../Frontend/dist"))); // adjust path if needed

// Fallback for React Router (works on Node 24+)
app.use((req, res, next) => {
  res.sendFile(path.join(__dirname, "../Frontend/dist/index.html"));
});

// Dynamic port for Render or local
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});