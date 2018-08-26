
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OpeningSchema = new Schema({
  moves: String,
  name: String,
  eco: String,
  // unsure about these:
  history: [],
  future: []
});

module.exports = mongoose.model("Opening", OpeningSchema);
