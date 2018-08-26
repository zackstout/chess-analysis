
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OpeningSchema = new Schema({
  moves: {
    type: String,
    // It's really going to be this simple:
    // and it's fast too:
    unique: true,
  },
  name: String,
  eco: String,
  // unsure about these:
  history: [],
  future: []
});

module.exports = mongoose.model("Opening", OpeningSchema);
