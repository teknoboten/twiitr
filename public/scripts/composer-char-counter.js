$(document).ready(function() {

  $("#twiit-text").keyup(function() {
    let count = this.value.length;

    if (count > 140) {
      count -= 140;
      count = (0 - count);
      $("#counter").text(count).addClass("red");

    } else {
      $("#counter").text(this.value.length).removeClass("red");
    }
  });
});

