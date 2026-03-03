require("dotenv").config();
const express = require("express");
const path = require("path");
const connectToDb = require("./src/config/database");

const app = require("./src/app");

connectToDb();

// Serve React build folder
app.use(express.static(path.join(__dirname, "Frontend/dist")));

// React Router fallback
app.get("*name", (req, res) => {
  res.sendFile(path.join(__dirname, "Frontend/dist/index.html"));
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});