
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var GameSchema = new Schema({
  rated: Boolean,
  num_turns: Number,
  victory_status: String,
  winner: String,
  white_rating: Number,
  black_rating: Number,
  moves: String,
  opening: {
    type: Schema.Types.ObjectId,
    ref: 'Opening'
  }
});

module.exports = mongoose.model("Game", GameSchema);
