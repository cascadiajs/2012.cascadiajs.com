$('.information-nav a').click(function(e) {
  var target = $(this).attr('href');

  $('.information-tab, .information-nav a').removeClass('active');
  $(target).addClass('active');
  $(this).addClass('active');

  e.preventDefault();
});