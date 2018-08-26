
var express = require('express');
var router = express.Router();
var fs = require('fs');
var csv = require('fast-csv');
var mongoose = require('mongoose');
var db = require('../models');

// ========================================================================================================================

function generateFullDB() {
  var stream = fs.createReadStream('games.csv');
  var csvStream = csv()
  .on("data", function(data){
    var rated = data[1];
    var num_turns = data[4];
    var winner = data[6];
    var victory_status = data[5];
    var white_rating = data[9];
    var black_rating = data[11];
    var moves = data[12];
    // var opening = 0;
    // rated, num_turns, winner, victory_status, white_rating, black_rating, moves, opening
    db.Opening.find({ name: data[14] })
    .then(function(res) {
      console.log("res is ...", res[0]._id);

      db.Game.create({
        rated: rated == 'TRUE' ? true : false,
        num_turns: parseInt(num_turns), // parseInt unneeded
        winner: winner,
        victory_status: victory_status,
        white_rating: white_rating,
        black_rating: black_rating,
        moves: moves,
        // opening: res[0]._id
      })
      .then(function(result) {
        console.log(result);
        return db.Opening.findOneAndUpdate({ _id: res[0]._id }, { $push: { games: result._id } }, { new: true });

      })
      .catch(function(error) {
        console.log(error.message);
      });

    })
    .catch(function(err) {
      console.log(err.message);
    });
  })
  .on("end", function(){
    console.log("done");
  });

  stream.pipe(csvStream);

}




function generateDB() {
  console.log('generating db...');
  var stream = fs.createReadStream('games.csv'); // Huh, is this directing from the root?
  var csvStream = csv()
  // This fires for every row in the csv:
  .on("data", function(data){

    var moves_array = data[12].split(" ");
    var opening_length = data[15];
    var opening_array = moves_array.slice(0, opening_length);
    var opening_text = opening_array.join(" ");

    var opening_name = data[14];
    var opening_eco = data[13];

    // Create the Line (after checking whether already exists) document:
    db.Opening.find({ moves: opening_text })
    .then(res => {
      console.log(res);

      if (res.length === 0) {
        db.Opening.create({
          moves: opening_text,
          name: opening_name,
          eco: opening_eco
        })
        .then(line => {
          console.log(line);
        })
        .catch(err => {
          console.log(err.message);
        });
      }
    })
    .catch(error => {
      console.log(error.message);
    });

  })
  .on("end", function(){
    console.log("done");
  });

  stream.pipe(csvStream);
}

// generateFullDB();

// ========================================================================================================================

// What?! There are exactly 4000 unique openings?! -- ...No
router.get('/allLines', (req, res) => {
  db.Opening.find({})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.sendStatus(501);
  });
});


router.get('/allLinesWithOpening/:opening', (req, res) => {
  console.log('hitting with ', req.params.opening);
  db.Opening.findById(req.params.opening)
  .populate('games')
  .exec((err, data) => {
    if (err) res.sendStatus(501);
    else res.send(data);
  });
  // .catch(err => {
  //   res.sendStatus(501);
  // });
});


module.exports = router;
