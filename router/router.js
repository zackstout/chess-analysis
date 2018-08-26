
var express = require('express');
var router = express.Router();
var fs = require('fs');
var csv = require('fast-csv');
var mongoose = require('mongoose');
var db = require('../models');

// ========================================================================================================================

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

// generateDB();

// ========================================================================================================================

// What?! There are exactly 4000 unique openings?!
router.get('/allLines', (req, res) => {
  db.Opening.find({})
  .then(data => {
    res.send(data);
  })
  .catch(err => {
    res.sendStatus(501);
  });
});

module.exports = router;
