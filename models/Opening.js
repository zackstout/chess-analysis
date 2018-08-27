
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
  games: [
  {
    type: Schema.Types.ObjectId,
    ref: "Game"
  }
],
  // unsure about these:
  history: [],
  future: []
});

// Yeah, this seems unneeded:
// SO's suggestion for telling Mongoose we're "serious" about the unique constraint:
// OpeningSchema.index({ moves: 1 }, { unique: true });

module.exports = mongoose.model("Opening", OpeningSchema);
