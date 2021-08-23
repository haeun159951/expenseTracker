const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const hashThePwd = (password, password_salt) => {
  const passwordHash = crypto
    .createHmac('sha512', password_salt)
    .update(password)
    .digest('hex');

  return passwordHash;
};

const generateSalt = () => {
  const salt = crypto.randomBytes(62).toString('hex');
  return salt;
};

const generateToken = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  return token;
};

module.exports = { hashThePwd, generateSalt, generateToken };
