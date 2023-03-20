var express = require('express');
var router = express.Router();

const post_controller = require("../controllers/postController");

// GET list of all posts
router.get('/', post_controller.post_list);

// GET specific post
router.get('/:id', post_controller.post_detail);

router.post('/:id', (req, res) => {
  return res.send('POST/CREATE HTTP method on new post');
});

router.put('/:id', (req, res) => {
  return res.send(`PUT/UPDATE HTTP method on existing post: ${req.params.id}`);
});

router.delete('/:id', (req, res) => {
  return res.send('DELETE HTTP method on existing post');
});

module.exports = router;