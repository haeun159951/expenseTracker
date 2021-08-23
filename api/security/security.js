const jwt = require("jsonwebtoken");
const cryto = require("crypto");
require("dotenv").config();

const generate_salt = () => {
  return cryto.randomBytes(64).toString("hex");
};

const generate_hash = (password, salt) => {
  return cryto.createHmac("sha512", salt).update(password).digest("hex");
};

const generate_token = (payload) => {
  return jwt.sign(payload, process.env.JWT_SECRET);
};

const verify_token = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (exception) {
    return null;
  }
};

module.exports = {
  generate_salt,
  generate_hash,
  generate_token,
  verify_token,
};
