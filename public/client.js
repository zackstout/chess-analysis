
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
      // Handles click of the "Get Next Moves" button:
      getNext: function() {
        console.log(this.next_in);

        $.ajax({
          type: "GET",
          url: "/allLines"
        })
        .then((res) => {

          var start = this.next_in;
          var start_array = this.next_in.split(" ");

          var all_with_start = [];
          var relevant_moves;

          res.forEach(d => {
            var moves_array = d.moves.split(" ");
            relevant_moves = moves_array.slice(0, start_array.length);

            if (relevant_moves.join(" ") == start) {
              all_with_start.push(d.moves);
            }

          });

          var next_moves;
          var i=1;

          // Eh, seems to be working...:
          while (i < 10) {
            next_moves = all_with_start.filter(s => {
              return s.split(" ").length === relevant_moves.length + i;
            });

            if (next_moves.length > 0) {
              break;
            } else {
              i++;
            }
          }

          // var next_moves = all_with_start.filter(s => {
          //   return s.split(" ").length === relevant_moves.length + 1;
          // });
          //
          // // hideous -- needs to be a While loop (with some exit condition, like 10):
          // if (next_moves.length === 0) {
          //   next_moves = all_with_start.filter(s => {
          //     return s.split(" ").length === relevant_moves.length + 2;
          //   });
          // }

          console.log(next_moves);

          // Funny, it actually *needs* to be an arrow function to preserve reference of 'this':
          this.next_out = next_moves;
        });

      }
    }
  });

});







// chessin
