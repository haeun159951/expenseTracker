const mongoose = require('mongoose');
let Schema = mongoose.Schema;

let userSchema = Schema({
  username: {
    type: String,
    unique: true,
  },
  email: {
    type: String,
  },
  password_salt: String,
  password_hash: String,
});

const userModel = mongoose.model('User', userSchema);

module.exports = { userModel };
