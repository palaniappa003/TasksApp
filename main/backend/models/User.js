// models/User.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
  // other user properties as needed
});

const User = mongoose.model("User", userSchema);

module.exports = User;