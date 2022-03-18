$(document).ready(function() {

  $("#twiit-text").keydown(function(){
    $("#counter").text(this.value.length+1);
  });

});

