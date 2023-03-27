var express = require("express");
var router = express.Router();

const comment_controller = require("../controllers/commentController");
const token_authenticator = require("./tokenAuthenticator");

router.delete(
  "/:id",
  token_authenticator.authenticateToken,
  comment_controller.comment_delete
);

module.exports = router;