$(function() {

  // lazy video load

  var videos = $('.lineup-video'),
      docViewBottom = $(window).scrollTop() + $(window).height();

  videos.each(function() {
    this.id = $(this).data('video');
    this.template = '<iframe width="620" height="349" src="http://www.youtube.com/embed/' + this.id + '?showinfo=0" frameborder="0" allowfullscreen></iframe>';
    this.loaded = false;
    this.elemTop = $(this).offset().top;

    this.load = function() {
      if (this.elemTop <= docViewBottom && this.loaded === false) {
        $(this).html(this.template);
        this.loaded = true;
      }
    };

    this.load();
  });

  $(window).scroll(function() {
    docViewBottom = $(window).scrollTop() + $(window).height();

    videos.each(function() {
      this.load();
    });
  });

  // information section tabs

  var infoTabs = function(tab) {
    var target = $(tab).attr('href');

    $('.information-tab, .information-nav a').removeClass('active');
    $(tab).addClass('active');
    $(target).addClass('active');
  };

  $('.information-nav a').click(function(e) {

    infoTabs(this);
    e.preventDefault();

  });

  var url = document.location.toString(),
      hashes = $('.information-nav a').map(function() {
        return $(this).attr('href');
      });

  if (url.match('#')) {

    var hash = '#' + url.split('#')[1];

    for (var i = 0; i < hashes.length; i++) {
      if (hash === hashes[i]) {
        document.location.href = "#information";
        infoTabs($('a[href=' + hash + ']'));
      }
    }

  }

  // add anchor links for all section headers

  Array.prototype.slice.call(document.querySelectorAll('h2[id]')).forEach(function(h2) {
    var a = document.createElement('a');
    a.href = '#' + h2.id;
    a.className = 'sct-anchor';
    h2.appendChild(a);
  });

  $(document).ready(function () {

    function getTweets() {
      $(".content_tweets").miniTwitter({
        query: "#cascadiajs OR @cascadiajs OR cascadiajs.com OR github.com/cascadiajs",
        limit: 10
      });
    }

    // populate tweets imperatively
    getTweets();

    // timer to update tweets every 10 seconds
    setInterval(function(){ getTweets(); }, 10000);

    function GithubFollowers() {
      this.resetFollowers = function() {
        $('.followers').clear();
      };

      this.appendFollowers = function(skip, take) {
        $.ajax({
          // note: updated to show 100, but still should do random paging -th
          url: 'https://api.github.com/repos/cascadiajs/cascadiajs.github.com/stargazers?page=' + Math.max(Math.ceil(skip/take), 1).toString() + '&per_page=' + take.toString(),
          dataType: 'jsonp',
          success: function(stargazers) {
            $.ajax({
              url: 'https://api.github.com/repos/cascadiajs/cascadiajs.github.com/forks?page=' + Math.max(Math.ceil(skip/take), 1).toString() + '&per_page=' + take.toString(),
              dataType: 'jsonp',
              success: function(forkers) {
                var followerInfos = {};

                _(stargazers.data).map(function(i) {
                  followerInfos[i.login] = i;
                });
                _(forkers.data).map(function(i) {
                  if (i && i.owner) {
                    followerInfos[i.owner.login] = i.owner;
                  }
                });
                followerInfos = _(followerInfos).shuffle();
                var template =
                    "<a class='github-user' target='_blank' githubid='<%=login%>' href='http://github.com/<%=login%>'>" +
                    "<img src='<%=avatar_url%>)' class='github-user-thumb'>" +
                    "</a>";
                var t = _(followerInfos)
                    .map(function(i) {
                      return _(template).template(i);
                    })
                    .join('');

                $('.followers').append(t);
              }
            });
          }
        });
      };
    }

    var github = new GithubFollowers();
    github.appendFollowers(0, 100);
  });

});