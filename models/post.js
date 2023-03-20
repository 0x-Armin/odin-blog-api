const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
});

PostSchema.virtual("url").get(function () {
  return `/posts/${this._id}`;
});

module.exports = mongoose.model("Post", PostSchema);
