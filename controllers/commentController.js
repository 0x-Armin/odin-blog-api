const Comment = require("../models/comment");
const Post = require("../models/post");

exports.comment_delete = async (req, res, next) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) throw new Error("Comment not found");

    const delResult = await comment.deleteOne();
    console.log(delResult);

    const post = await Post.findById(comment.post);
    if (!post) throw new Error("Post not found");

    const comments = await Comment.find({ post: post.id }).sort({
      date: -1,
    });

    const result = {
      post: post,
      comments: comments,
    };

    res.json(result);
  } catch (err) {
    console.error(err);
  }
};
