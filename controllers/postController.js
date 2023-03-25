const Post = require("../models/post");
const Comment = require("../models/comment");

const async = require("async");
const { body, validationResult } = require("express-validator");

// Display list of all published Posts
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

// Display list of all Posts (published/unpublished)
exports.post_list_admin = function (req, res, next) {
  Post.find()
    .select('title date isPublished')
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

// Toggle isPublished status of given post and return updated list of posts
exports.toggle_publish_post = (req, res, next) => {
  Post.findById(req.params.id)
    .then((post) => {
      post.isPublished = !post.isPublished;
      return post.save();
    })
    .then(() => {
      return Post.find()
              .select('title date isPublished')
              .sort({ date: -1 })
    })
    .then((posts) => {
      res.json(posts)
    })
    .catch((err) => {
      next(err);
    });
}