const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Task = require("../models/task");
// ========================Create-Task=====================================
router.post("/create-task", isLoggedIn, async (req, res, next) => {
  try {
    const { title, priority, dueDate, status, checklist } = req.body;
    const adminId = req.adminId;
    await Task.create({ adminId, title, priority, dueDate, status, checklist });
    res.status(200).json({
      status: "OK",
      message: "Task Created",
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});

module.exports = router;
