const mongoose = require("mongoose");

const toDoSchema = new mongoose.Schema({
  toDo: {
    type: String,
    required: true,
  },
  date: {
    type: Date, 
  },
  priority: {
    type: Number, // New field for priority
    required: true,
  },
});

module.exports = mongoose.model("ToDo", toDoSchema);
