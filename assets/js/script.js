// (function($){
$(document).ready(function(){
  // $(function() { //on DOM ready
  // HEADER SIZE
  var screenHeight = $(window).height();
  var navHeight = $('#navigation').height();
  var headHeight = (screenHeight - navHeight);
  $("header").css({height: headHeight});
  // TRANSITION SIZE
  $(".img-transition").css({height: screenHeight*0.8})
  // NAVIGATION
  $("#navigation").find("li").on("click", "a", function () {
    $('.navbar-collapse').collapse('hide');
    var target = $(this).attr('href');
    $('html, body').stop().animate({scrollTop: ($(target).offset().top)-navHeight}, 1000 );
  })
      // SIMPLY SCROLL
        $(".scroller").simplyScroll();

      // SLIDER PARALLAX
        $('#da-slider').cslider({
					bgincrement	: 0
				});

        // INSTAFEED
        var userFeed = new Instafeed({
          get: 'user',
          userId : '6921109790',
          resolution : 'standard_resolution',
          accessToken : '6921109790.1677ed0.7ad1c946a4b74af5bf14e5575f1052e8',
          sortBy : 'most-recent',
          //template : '<li><img src="{{image}}" alt="{{caption}}" class="img-fluid"/></li>'
          template : '<div class="carousel-item text-center">'+
                        '<a target="_blank" href="{{link}}">'+
                        '<img class="img-fluid" src="{{image}}"/>'+
                        '<p>{{caption}}</p>'+
                      '</a></div>',
          after : function () {$('#instafeed > div:nth-child(1)').addClass('active');}
        });
        userFeed.run();

        // MULTILANGUE
        $('#eng').click(function(){
          $('.fr').addClass('d-none');
          $('.eng').removeClass('d-none');
        })
        $('#fr').click(function(){
          $('.eng').addClass('d-none');
          $('.fr').removeClass('d-none');
        })

  });
// })(jQuery);
