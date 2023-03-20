const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  username: { type: String, required: true },
  date: { type: Date, default: Date.now },
  content: { type: String, required: true },
  post: { type: Schema.Types.ObjectId, ref: "Post" },
});

CommentSchema.virtual("date_formatted").get(function() {
  return DateTime.fromJSDate(this.date).toLocaleString(DateTime.DATE_MED);
})

CommentSchema.set('toJSON', { virtuals: true });

module.exports = mongoose.model("Comment", CommentSchema);