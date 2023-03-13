const mongoose = require("mongoose");
const { DateTime } = require("luxon");

const Schema = mongoose.Schema;

const RecipeSchema = new Schema({
  name: { type: String, maxLength: 100},
  ingredients: [{ type: String, required: true}],
  steps: [{ type: String, required: true}],
  description: { type: String, maxLength: 160},
  notes: { type: String},
  creator: { type: Schema.Types.ObjectId, ref: "User", required: true},
  editedDate: { type: Date, required: true, default: Date.now },
  likes: { type: Number, required: true, default: 0},
})

RecipeSchema.virtual("Date_formated").get(function () {
  return DateTime.fromJSDate(this.editedDate).toLocaleString(DateTime.DATE_MED);
})

RecipeSchema.virtual("url").get(function () {
  return `/${this._id}`;
})
// add photos, comments, date, and links

module.exports = mongoose.model("Recipe", RecipeSchema);