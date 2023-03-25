var express = require("express");
var router = express.Router();

const post_controller = require("../controllers/postController");
const token_authenticator = require("./tokenAuthenticator");

// GET list of all published posts
router.get("/", post_controller.post_list);

// GET list of all posts (published and unpublished)
router.get(
  "/admin",
  token_authenticator.authenticateToken,
  post_controller.post_list_admin
);

router.put(
  "/:id/togglePublish",
  token_authenticator.authenticateToken,
  post_controller.toggle_publish_post
);

// GET specific post
router.get("/:id", post_controller.post_detail);



router.post("/:id", (req, res) => {
  return res.send("POST/CREATE HTTP method on new post");
});

router.put("/:id", (req, res) => {
  return res.send(`PUT/UPDATE HTTP method on existing post: ${req.params.id}`);
});

router.delete("/:id", (req, res) => {
  return res.send("DELETE HTTP method on existing post");
});

module.exports = router;
