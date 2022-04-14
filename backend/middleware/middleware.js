const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.body.token || req.headers["token-access"];

  if (!token) {
    return res.status(403).send("sorry we can't proceed without token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    req.Register = decoded;
  } catch (err) {
    return res.status(401).send("Invalid token");
  }
  return next();
};

module.exports = verifyToken;
