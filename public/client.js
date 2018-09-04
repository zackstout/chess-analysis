
// Huh...so how do we do this with Vue?
$(document).ready(function() {

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
        this.next_in = line.line; // for byGame
        this.getNextLineByGame();
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
          var result_obj = makeResultObj(res, len);
          // console.log(result_obj);

          var all_results = [];
          var total_games = res.length;

          // Generate the all_results array:
          for (let key in result_obj) {
            line = this.next_in + ' ' + key;
            percentPlayed = result_obj[key].count / total_games;
            all_results.push({
              line: line,
              percentPlayed: percentPlayed,
              whiteWin: result_obj[key].white_win,
              blackWin: result_obj[key].black_win,
              draw: result_obj[key].draw,
              total: result_obj[key].white_win + result_obj[key].black_win + result_obj[key].draw,
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



function makeResultObj(res, len) {
  result_obj = {};

  // Generate the result_obj:
  res.forEach(r => {
    const moves_arr = r.moves.split(' ');
    const relevant_move = moves_arr[len];

    if (relevant_move in result_obj) {
      // result_obj[relevant_move] = {};
      result_obj[relevant_move].count ++;
      if (r.victory_status == 'mate' || r.victory_status == 'resign' || r.victory_status == 'outoftime') {
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

  return result_obj;
}



// chessin
