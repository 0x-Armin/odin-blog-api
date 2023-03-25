const jwt = require("jsonwebtoken");

exports.authenticateToken = function (req, res, next) {
  console.log("headers:", req.headers);
  const authHeader = req.headers["authorization"];
  console.log("authHeader", authHeader);
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    console.log("null token");
    return res.sendStatus(401); // Unauthorized
  }

  jwt.verify(token, "secret_key", (err, user) => {
    if (err) return res.sendStatus(403); // Forbidden
    req.user = user;
    next();
  });
}
