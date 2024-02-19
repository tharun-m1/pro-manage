const express = require("express");
const router = express.Router();
const isLoggedIn = require("../middleware/isLoggedIn");
const Task = require("../models/task");
const erroHandler = require("../utils/errorHandler");
const errorHandler = require("../utils/errorHandler");
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
// =======================================================================
// =============================All-tasks=================================
router.get("/all-tasks", isLoggedIn, async (req, res, next) => {
  try {
    const adminId = req.adminId;
    const data = await Task.find({ adminId: adminId.toString() });
    res.status(200).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
// ======================================================================
// ================================= show task ==========================
router.get("/task/:taskId", isLoggedIn, async (req, res, next) => {
  try {
    const adminId = req.adminId;
    const { taskId } = req.params;
    const query = {
      $and: [{ adminId: { $eq: adminId } }, { _id: { $eq: taskId } }],
    };
    const data = await Task.findOne(query);
    if (!data) {
      return next(erroHandler(404, "Task Not Found."));
    }
    res.status(200).json({
      status: "OK",
      data: data,
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
// =====================================================================
// ==============================delete task============================
router.delete("/delete/:taskId", isLoggedIn, async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const adminId = req.adminId;
    const query = {
      $and: [{ adminId: { $eq: adminId } }, { _id: { $eq: taskId } }],
    };
    const task = await Task.findOneAndDelete(query);
    if (!task) {
      return next(errorHandler(404, "Task Not Found."));
    }
    res.status(200).json({
      status: "OK",
      message: "Task Deleted",
    });
  } catch (err) {
    console.log(err);
    next(err);
  }
});
// ==================================================================
// =========================Update task==============================
router.put("/update/:taskId", isLoggedIn, async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const adminId = req.adminId;
    const { title, priority, dueDate, status, checklist } = req.body;
    const query = {
      $and: [{ adminId: { $eq: adminId } }, { _id: { $eq: taskId } }],
    };
    const updatedTask = await Task.findOneAndUpdate(
      query,
      {
        title,
        priority,
        dueDate,
        status,
        checklist,
      },
      { new: true }
    );
    if (!updatedTask) {
      return next(errorHandler(404, "Task Not found."));
    }
    res.status(200).json({
      status: "OK",
      message: "Task Updated.",
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
// ========================================================================
// ======================Change status of task=============================
router.patch("/change-status/:taskId", isLoggedIn, async (req, res, next) => {
  try {
    const { taskId } = req.params;
    const adminId = req.adminId;
    const { status } = req.body;
    const query = {
      $and: [{ adminId: { $eq: adminId } }, { _id: { $eq: taskId } }],
    };
    const task = await Task.findOne(query);
    if (!task) return next(errorHandler(404, "Task Not found."));

    task.status = status;
    await task.save();
    res.status(200).json({
      status: "OK",
      message: "Task status updated",
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
// ==========================================================================

// =================Change status of checklist item task status==============
router.patch("/mark/:taskId/:itemId", isLoggedIn, async (req, res, next) => {
  try {
    const { taskId, itemId } = req.params;
    const adminId = req.adminId;
    const { status } = req.body;
    const query = {
      $and: [{ adminId: { $eq: adminId } }, { _id: { $eq: taskId } }],
    };
    const task = await Task.findOne(query);
    if (!task) return next(errorHandler(404, "Task Not found."));
    const checklistItem = task.checklist.find(
      (el) => el._id.toString() === itemId
    );
    if (!checklistItem) {
      return next(errorHandler(404, "Checklist item not found."));
    }
    checklistItem.status = status;
    await task.save();
    res.status(200).json({
      status: "OK",
      message: "Item marked",
    });
  } catch (err) {
    console.log(err.message);
    next(err);
  }
});
// ==========================================================================
module.exports = router;
