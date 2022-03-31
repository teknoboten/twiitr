$(document).ready(function() {

  $("#tweet-text").keyup(function() {
    let charLeft = 140 - this.value.length;

    if (charLeft < 1) {
      $("#counter").text(charLeft).addClass("red");
    } else {
      $("#counter").text(charLeft).removeClass("red");
    }
  });
});

