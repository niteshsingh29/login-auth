const jwt = require("jsonwebtoken");
const env = require("dotenv").config();

const verifyToken = (req, res, next) => {
  const token = req.headers["token-access"];
  // console.log("middleware token", token);

  if (!token) {
    return res.status(401).send("sorry we can't proceed without token");
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_KEY);
    console.log("decoded", decoded);
    // req.addproduct = decoded;
  } catch (err) {
    console.log("err", err);
    return res.status(401).send("sorry token has been expired");
  }
  return next();
};

module.exports = verifyToken;
