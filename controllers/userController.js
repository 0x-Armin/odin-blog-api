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
      console.error("Error saving user:", error);
      res.status(500).send("Error saving user.");
    });
};
