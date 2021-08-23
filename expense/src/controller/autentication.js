const { Router } = require('express');
const authRouter = Router();
const { userModel } = require('../model/userSchema');
const validator = require('validator');

const {
  generateSalt,
  hashThePwd,
  generateToken,
} = require('../security/security');

authRouter.post('/sign-up', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;
  if (username === undefined || username === '') {
    res.status(400).json({ message: 'username is required' });
  } else if (password === undefined || password === '') {
    res.status(400).json({ message: 'password is required' });
  } else if (email === undefined || email === '') {
    res.status(400).json({ error: 'email is required' });
  } else if (!validator.isEmail(email)) {
    res.status(400).json({ message: 'Invalid email' });
  } else if (!validator.isStrongPassword(password)) {
    res.status(400).json({ message: 'Password is not strong ' });
  } else {
    const userExists = await userModel.findOne({
      username,
    });
    const emailExists = await userModel.findOne({
      email,
    });
    if (!userExists && !emailExists) {
      const password_salt = generateSalt();
      const password_hash = hashThePwd(password, password_salt);

      const user = new userModel({
        username: username,
        password_salt: password_salt,
        password_hash: password_hash,
        email: email,
      });
      await user.save();
      res.status(200).json({ user });
    } else {
      res.status(400).json({ message: 'user is already exist' });
    }
  }
});

authRouter.post('/sign-in', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  if (username === undefined || username === '') {
    res.status(400).json({ message: 'username is required' });
  } else if (password === undefined || password === '') {
    res.status(400).json({ message: 'password is required' });
  } else {
    const isUser = await userModel.findOne({ username }).exec();

    if (!isUser) {
      res.status(401).json({ message: 'user not found' });
    } else {
      const password_hash = hashThePwd(password, isUser.password_salt);

      if (password_hash === isUser.password_hash) {
        const payload = {
          _id: userModel._id,
        };

        const token = generateToken(payload);
        res.status(200).json({ token });
      } else {
        res.status(401).json({ message: 'unauthorized' });
      }
    }
  }
});

module.exports = { authRouter };
