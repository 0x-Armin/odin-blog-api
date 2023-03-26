const jwt = require("jsonwebtoken");

exports.authenticateToken = function (req, res, next) {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
}
