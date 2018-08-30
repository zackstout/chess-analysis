
// Huh...so how do we do this with Vue?
$(document).ready(function() {
  console.log('hi hi');


  // Next steps:
  // - get name of opening if possible
  // - show number of games played with this line


  var next_in = new Vue({
    el: '#next-input',
    data: {
      next_in: 'e4 e5 Nf3',
      next_out: [],
      one_move_opens: [],
      next_line_out: [],
      opening_name: '',
      opening_moves: ''
    },
    methods: {
      mouseOver: function(line) {
        // console.log(line);
        $.ajax({
          type: "GET",
          url: "/openingName/" + line.line.split(' ').join('_')
        })
        .then(data => {
          // console.log(data);
          if (data.length) {
            this.opening_name = data[0].name;
            this.opening_moves = data[0].moves;
          }
        });
      },

      handleClick: function(line) {
        // console.log(line);
        // this.next_in = line.moves; // for byOpening
        this.next_in = line.line; // for byGame
        this.getNextLineByGame();
      },

      // Currently not in use:
      getNextLine: function() {
        $.ajax({
          type: "GET",
          url: "/nextMoves/" + this.next_in.split(' ').join('_')
        })
        .then(res => {
          var total_games = res.reduce(function(t, n) {
            return t + n.games.length;
          }, 0);

          res.forEach(r => r.percentPlayed = r.games.length / total_games);

          this.next_line_out = res;
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
          console.log(res);

          result_obj = {};

          res.forEach(r => {
            const moves_arr = r.moves.split(' ');
            const relevant_move = moves_arr[len];

            if (relevant_move in result_obj) {
              // result_obj[relevant_move] = {};
              result_obj[relevant_move].count ++;
              if (r.victory_status == 'mate' || r.victory_status == 'resign') {
                if (r.winner == 'white') result_obj[relevant_move].white_win ++;
                else if (r.winner == 'black') result_obj[relevant_move].black_win ++;
              } else if (r.victory_status == 'draw') {
                result_obj[relevant_move].draw ++;
              }

            } else {
              result_obj[relevant_move] = {};
              result_obj[relevant_move].count = 1;
              result_obj[relevant_move].white_win = 0;
              result_obj[relevant_move].black_win = 0;
              result_obj[relevant_move].draw = 0;
            }
          });

          // console.log(result_obj);

          var all_results = [];
          var total_games = res.length;

          for (let key in result_obj) {
            line = this.next_in + ' ' + key;
            percentPlayed = result_obj[key].count / total_games;
            all_results.push({
              line: line,
              percentPlayed: percentPlayed,
              whiteWin: result_obj[key].white_win,
              blackWin: result_obj[key].black_win,
              draw: result_obj[key].draw,
              // total_games: total_games,
            });
          }

          all_results.total_games = total_games;

          this.next_line_out = all_results.sort((a, b) => {
            return b.percentPlayed - a.percentPlayed;
          });
          this.next_line_out.toMove = len % 2 === 0 ? 'White' : 'Black';

        });
      },

    }
  });

});







// chessin
