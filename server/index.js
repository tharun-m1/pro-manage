const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const authRoutes = require("./routes/auth");
const taskRoutes = require("./routes/taskRoutes");
const adminRoutes = require("./routes/adminRoutes");

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/health", (req, res) => {
  res.status(200).json({
    serverName: "Pro Manage",
    status: "Active",
  });
});

// ===================== routes ===================================
app.use("/", authRoutes);
app.use("/", taskRoutes);
app.use("/", adminRoutes);
// ====================Error Handler===============================
app.use((err, req, res, next) => {
  const status = err.status || 500;
  const message = err.message || "Internal Server Error";
  return res.status(status).json({
    status,
    message,
  });
});
// ================================================================
app.listen(process.env.PORT, () => {
  mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => {
      console.log(`server running at http://localhost:${process.env.PORT}`);
    })
    .catch((err) => {
      console.log("Connection Error \n", err.message);
    });
});
