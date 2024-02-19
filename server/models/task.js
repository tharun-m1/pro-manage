const mongoose = require("mongoose");
const checkListItemSchema = require("./checkListItemSchema");
const taskSchema = new mongoose.Schema(
  {
    adminId: {
      type: String,
    },
    title: {
      type: String,
      required: true,
    },
    priority: {
      type: String,
      enum: ["hi", "lo", "mod"],
      required: true,
    },
    dueDate: {
      type: String,
    },
    status: {
      type: String,
      enum: ["backlog", "todo", "progress", "done"],
      default: "todo",
    },
    checklist: [checkListItemSchema],
  },
  {
    timestamps: true,
  }
);

const Task = new mongoose.model("Task", taskSchema);
module.exports = Task;
