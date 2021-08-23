const jwt = require("jsonwebtoken");

const isAuthenticated = (req, res, next) => {
  const authorizationHeader = req.headers["authorization"];
  if (authorizationHeader === undefined) {
    res
      .status(401)
      .json({ message: "You are not authorized to access this resource" });
  } else {
    const token = authorizationHeader.split(" ")[1].toString();
    try {
      const claims = jwt.verify(token, process.env.JWT_SECRET);
      req.claims = claims;
      next();
    } catch (exception) {
      res.status(401).json({ message: "Invalid access token" });
    }
  }
};

module.exports = { isAuthenticated };
