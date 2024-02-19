const mongoose = require("mongoose");

const checkListItemSchema = new mongoose.Schema({
  task: {
    type: String,
  },
  status: {
    type: String,
    enum: ["done", "not"],
  },
});

module.exports = checkListItemSchema;
