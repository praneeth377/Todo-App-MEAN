const mongoose = require("mongoose")

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  dueDate: { type: Date, required: true },
  createdDate: { type: Date, default: Date.now },
  isCompleted: { type: Boolean, default: false },
  tags: { type: [String], default: [] },
  completedOn: { type: Date, default: null },
});

const Task = mongoose.model("Task", taskSchema)
module.exports = Task
