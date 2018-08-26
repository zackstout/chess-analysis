
console.log('yo');

nextMoves = [];

function getNextMoves(start) {
  console.log('start is :', start.trim());
  return $.ajax({
    type: "GET",
    url: "/allLines",
    // success: function(data) {
    //
    //   var all_with_start = [];
    //   var moves_array, relevant_moves;
    //
    //   data.forEach(d => {
    //     moves_array = d.moves.split(" ");
    //     relevant_moves = moves_array.slice(0, 3);
    //
    //     if (relevant_moves.join(" ") == start) {
    //       // counter++;
    //       all_with_start.push(d.moves);
    //     }
    //
    //   });
    //
    //   var next_moves = all_with_start.filter(s => {
    //     return s.split(" ").length === relevant_moves.length + 1;
    //   });
    //   console.log(next_moves);
    //
    //   // This doesn't work...:
    //   nextMoves = next_moves;
    // }
  });
}


// Huh...so how do we do this with Vue?
$(document).ready(function() {
  console.log('hi hi');

  var next_in = new Vue({
    el: '#next-input',
    data: {
      next_in: 'e4 e5 Nf3',
      next_out: []
    },
    methods: {
      getNext: function() {
        console.log(this.next_in);
        // console.log(getNextMoves(this.next_in));
        var next = this.next_in;

        getNextMoves(this.next_in).then((res) => {

          // console.log(res);

          var start = next;

          var all_with_start = [];
          var moves_array, relevant_moves;

          res.forEach(d => {
            moves_array = d.moves.split(" ");
            relevant_moves = moves_array.slice(0, 3);

            if (relevant_moves.join(" ") == start) {
              // counter++;
              all_with_start.push(d.moves);
            }

          });

          var next_moves = all_with_start.filter(s => {
            return s.split(" ").length === relevant_moves.length + 1;
          });
          console.log(next_moves);

          // This doesn't work...:
          nextMoves = next_moves;

          // Funny, it actually *needs* to be an arrow function to preserve reference of 'this':
          this.next_out = nextMoves;
        });

      }
    }
  });
  //
  // var next_out = new Vue({
  //   el: '#next-output',
  //   data: {
  //     output: nextMoves
  //   }
  // });


});
