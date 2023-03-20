const mongoose = require("mongoose");
const { DateTime } = require("luxon");

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

PostSchema.virtual("date_formatted").get(function() {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
})

PostSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Post", PostSchema);
