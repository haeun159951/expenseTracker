const { Router } = require("express");
const AuthRouter = Router();
const { UserModel } = require("../models/user");
const { validate } = require("../validators/validate");
const {
  generate_hash,
  generate_token,
  generate_salt,
} = require("../security/security");
const { sign_up_rules } = require("../validators/authentication/sign_up_rules");
const { sign_in_rules } = require("../validators/authentication/sign_in_rules");

AuthRouter.post("/sign-up", sign_up_rules(), validate, async (req, res) => {
  const salt = generate_salt();
  const User = new UserModel({
    username: req.body.username,
    email: req.body.email,
    password_salt: salt,
    password_hash: generate_hash(req.body.password, salt),
  });
  await User.save();
  res.status(200).json({ user: User });
});

AuthRouter.post("/sign-in", sign_in_rules(), validate, async (req, res) => {
  const user = await UserModel.findOne({ username: req.body.username }).exec();
  const password_hash = generate_hash(req.body.password, user.password_salt);
  if (password_hash !== user.password_hash) {
    res.status(401).json({ message: "Invalid credential" });
  } else {
    const payload = {
      _id: user._id,
    };
    const token = generate_token(payload);
    res.status(200).json({ token });
  }
});

module.exports = { AuthRouter };
