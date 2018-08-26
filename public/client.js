console.log('yo');

$(document).ready(function() {
  console.log('hi hi');

  $.ajax({
    type: "GET",
    url: "/allLines",
    success: function(data) {
      // console.log(data);

      var start = "e4 e5 Nf3";
      var counter = 0;
      var all_with_start = [];

      data.forEach(d => {
        var moves_array = d.moves.split(" ");
        var relevant_moves = moves_array.slice(0, 3);

        if (relevant_moves.join(" ") == start) {
          counter++;
          all_with_start.push(d.moves);
        }


        // Yeah, we do have dupes in there...
        // if (d.moves == start) {
        //   counter++;
        //   all_with_start.push(d.moves)
        // }
      });
      console.log(counter, all_with_start);
    }
  });
});
