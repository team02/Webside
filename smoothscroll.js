$(document).ready(function(){

  $('#ss').click(function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop: '1000px'}, 800);
  });

  $('#ss2').click(function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop: '600px'}, 800);
  });

  $('#ss3').click(function(e){
    e.preventDefault();
    $('html, body').animate({scrollTop: '10px'}, 800);
  });


});
