$(function() {

  // information section tabs

  $('.information-nav a').click(function(e) {
    var target = $(this).attr('href');

    $('.information-tab, .information-nav a').removeClass('active');
    $(target).addClass('active');
    $(this).addClass('active');

    e.preventDefault();
  });

  // add anchor links for all section headers

  Array.prototype.slice.call(document.querySelectorAll('h2[id]')).forEach(function(h2) {
    var a = document.createElement('a');
    a.href = '#' + h2.id;
    a.className = 'sct-anchor';
    h2.appendChild(a);
  });

});