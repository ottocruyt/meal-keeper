const jwt = require("jsonwebtoken");
const config = require("config");

module.exports = function (req, res, next) {
  // next in middleware calls the next function
  // get token from header
  const token = req.header("x-auth-token");
  // check if not token
  if (!token) {
    res.status(401).json({ msg: "no token, authorization denied" });
  } else {
    try {
      const decoded = jwt.verify(token, config.get("jwtSecret"));
      req.user = decoded.user;
      next();
    } catch (error) {
      res.status(401).json({ msg: "Token not valid" });
    }
  }
};
