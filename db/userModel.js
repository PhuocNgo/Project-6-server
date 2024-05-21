const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  first_name: { type: String },
  last_name: { type: String },
  login_name: { type: String },
  password: { type: String },
  is_login: { type: Boolean },
  confirmPassword: { type: String },
  location: { type: String },
  description: { type: String },
  occupation: { type: String },
});

module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);
