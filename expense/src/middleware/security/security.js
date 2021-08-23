const jwt = require('jsonwebtoken');
require('dotenv').config();

const isAuthenticated = (req, res, next) => {
  const authorization = req.headers['authorization'];
  if (authorization === undefined) {
    res.status(401).send({ message: 'Unauthorized' });
  } else {
    const token = authorization.split(' ')[1];
    try {
      const claims = jwt.verify(token, process.env.JWT_SECRET);
      req.claims = claims;
      next();
    } catch (exception) {
      res.status(401).json({ message: 'Invalid access token' });
    }
  }
};

module.exports = { isAuthenticated };
