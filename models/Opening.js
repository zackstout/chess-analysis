
var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var OpeningSchema = new Schema({
  moves: {
    type: String,
    // It's really going to be this simple:
    unique: true,
    // validate: {
    //   validator: function(v, cb) {
    //     Opening.find({ moves: v }, function(err, data) {
    //       cb(data.length === 0);
    //     });
    //   },
    //   message: "Opening already exists.."
    // }
  },
  name: String,
  eco: String,
  // unsure about these:
  history: [],
  future: []
});

module.exports = mongoose.model("Opening", OpeningSchema);
