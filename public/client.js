
// Huh...so how do we do this with Vue?
$(document).ready(function() {
  console.log('hi hi');

  var next_in = new Vue({
    el: '#next-input',
    data: {
      next_in: 'e4 e5 Nf3',
      next_out: [],
      one_move_opens: [],
      next_line_out: []
    },
    methods: {
      handleClick: function(line) {
        console.log(line);
        // this.next_in = line.moves;
        this.next_in = line.line;
        this.getNextLineByGame();
        // console.log(JSON.stringify(String(ev.target)));
        // console.log(ev.target.toString().slice(ev.target.toString().indexOf('>'), ev.target.toString().indexOf('|') + 3));
      },

      getNextLine: function() {
        console.log(this.next_in);
        $.ajax({
          type: "GET",
          url: "/nextMoves/" + this.next_in.split(' ').join('_')
        })
        .then(res => {
          // console.log(res);

          var total_games = res.reduce(function(t, n) {
            // console.log(n.games.length);
            return t + n.games.length;
          }, 0);

          // console.log(total_games);
          res.forEach(r => r.percentPlayed = r.games.length / total_games);

          this.next_line_out = res;

          // console.log(res);


        });
      },

      getNextLineByGame: function() {
        console.log(this.next_in);
        const len = this.next_in.split(' ').length;
        $.ajax({
          type: "GET",
          url: "/nextMovesByGame/" + this.next_in.split(' ').join('_')
        })
        .then(res => {
          // console.log(res);

          result_obj = {};

          res.forEach(r => {
            const moves_arr = r.moves.split(' ');
            const relevant_move = moves_arr[len];

            if (relevant_move in result_obj) {
              result_obj[relevant_move] ++;
            } else {
              result_obj[relevant_move] = 1;
            }
          });

          console.log(result_obj);

          var all_results = [];
          var total_games = res.length;

          for (let key in result_obj) {
            line = this.next_in + ' ' + key;
            percentPlayed = result_obj[key] / total_games;
            all_results.push({line: line, percentPlayed: percentPlayed});
          }



          // console.log(total_games);
          // res.forEach(r => r.percentPlayed = r.games.length / total_games);

          this.next_line_out = all_results;

          // console.log(res);


        });
      },

    }
  });

});







// chessin
