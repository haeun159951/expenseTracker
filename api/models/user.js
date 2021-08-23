const mongoose = require("mongoose");

const UserSchema = mongoose.Schema({
  username: String,
  email: String,
  password_salt: String,
  password_hash: String,
});

const UserModel = mongoose.model("User", UserSchema);

module.exports = { UserModel };
