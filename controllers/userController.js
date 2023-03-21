const passport = require("../passport");
const jwt = require('jsonwebtoken');

const User = require("../models/user");

exports.user_signup = function (req, res, next) {
  const user = req.body;
  if (user == null) {
    res.status(500).send("Received empty user");
    throw new Error("Data is null");
  }

  const newUser = new User({
    email: user.email,
    password: user.password,
  });

  // save newUser to mongoose
  newUser
    .save()
    .then((savedUser) => {
      console.log("User saved to database:", savedUser);
      res.status(200).send("User saved to database.");
    })
    .catch((err) => {
      console.error("Error saving user:", err);
      res.status(500).send("Error saving user.");
    });
};

exports.user_login = [
  (req, res, next) => {
    passport.authenticate("local", { session: false }, (err, user, info) => {
      if (err) {
        return next(err);
      }
      if (!user) {
        return res.status(401).json({ message: "Invalid email or password" });
      }
      req.user = user;
      next();
    })(req, res, next);
  },
  (req, res) => {
    const token = jwt.sign({ userId: req.user.id }, "secret_key");
    res.json({ token });
  },
];