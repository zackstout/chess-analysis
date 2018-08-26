console.log('yo');

$(document).ready(function() {
  console.log('hi hi');

  $.ajax({
    type: "GET",
    url: "/allLines",
    success: function(data) {
      console.log(data);
    }
  });
});
