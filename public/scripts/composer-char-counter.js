$(document).ready(function() {

  $("#twiit-text").keydown(function(){
    let count = this.value.length + 1;

    if (count > 140){
      count -= 140;
      count = (0 - count);
      $("#counter").text(count);
      //add css class to change colour
    } else {
      $("#counter").text(this.value.length + 1);
    }
        
  });

});

