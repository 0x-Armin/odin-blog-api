const Post = require("../models/post");
const Comment = require("../models/comment");

const async = require("async");
const { body, validationResult } = require("express-validator");

// Display list of all Posts
exports.post_list = function (req, res, next) {
  Post.find({ isPublished: true })
    .sort({ date: -1 })
    .then((list_post) => {
      res.json(list_post);
    })
    .catch((err) => {
      return next(err);
    });
};

// Display specific post
exports.post_detail = (req, res, next) => {
  async.parallel(
    {
      async post() {
        try {
          const post = await Post.findById(req.params.id);
          return post;
        } catch (err) {
          return err;
        }
      },
      async comments() {
        try {
          const comments = await Comment.find({ post: req.params.id }).sort({
            date: -1,
          });
          return comments;
        } catch (err) {
          return err;
        }
      },
    },
    (err, results) => {
      if (err) return next(err);
      if (results.post == null) {
        const err = new Error("Post not found");
        err.status = 404;
        return next(err);
      }
      const specificPost = {
        post: results.post,
        comments: results.comments,
      };
      res.json(specificPost);
    }
  );
};
