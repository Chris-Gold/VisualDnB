$(document).ready(function(){
    // NOMBRE D'OR ratio
  // var posTeam = $('#gallery').offset().top;
  // var posFooter = $('#contact').offset().top;
  // var screenWidth = $(window).width();
  // var fnlHeight = posFooter-posTeam;
  // var ratio = screenWidth/fnlHeight;
  // console.log(ratio);
  // console.log(posFooter);

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

  // SUPRESSION CLASS GLDBOX POUR MOBILE
    var screenWidth = $(window).width();
    if (screenWidth <= 750){
      $('*').removeClass('gldBox');
    }

  // MULTILANGUE
    $('#eng').click(function(){
      $('.fr').addClass('d-none');
      $('.eng').removeClass('d-none');
    })
    $('#fr').click(function(){
      $('.eng').addClass('d-none');
      $('.fr').removeClass('d-none');
    })

  // SCROLL ZOOM
    $(window).on('scroll', function(){
      var posGen = window.scrollY,
          scrn = $(window).height(),
          posTrans1 = $('#trans1').position().top,
          posTrans2 = $('#trans2').position().top,
          posTrans3 = $('#trans3').position().top;

      // TRANSITION 1
      if (posGen <= (posTrans1 + scrn)){
        $('#trans1').stop().animate({'background-size':+100+(posGen-(posTrans1-scrn))*0.0125+'%'}, 20);
      }
      // TRANSITION 2
      if (posGen >= (posTrans2 - scrn) && posGen <= (posTrans2 + scrn)){
        $('#trans2').stop().animate({'background-size':+125-(posGen-(posTrans2-scrn))*0.0125+'%'}, 20);
      }
      // TRANSITION 3
      if (posGen >= (posTrans3 - scrn) && posGen <= (posTrans3 + scrn)){
        $('#trans3').stop().animate({'background-size':+100+(posGen-(posTrans3-scrn))*0.0125+'%'}, 20);
      }
    })


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
      template: '<div>'+
                  '<a href={{link}}>'+
                  '<img class="img-fluid feed" src="{{image}}" alt="slider image"/>'+
                  '<p class="text-center text-truncate">{{caption}}</p>'+
                  '</a></div>',
      after: function(){
        $('#instafeed').slick({
          infinite: true,
          slidesToShow: 3,
          slidesToScroll: 3,
          adaptiveHeight: true
        });
      }
    });
    userFeed.run();

  // GOLDEN BOX class
    var gldWidth = $('.gldBox').width();
    $('.gldBox').css({"width" : "100%", "height" : gldWidth*0.33});

  // PROGRAMME AVEC Carousel Slick
  if (window.matchMedia("(max-width: 950px)").matches) {
    $('#bookedLogos').slick({
      adaptiveHeight: false,
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 5
    });
    $('#bookedLogos img').removeAttr('style');
  } else {
  $('#bookedLogos').slick({
    adaptiveHeight: false,
    infinite: true,
    slidesToShow: 5,
    slidesToScroll: 5
  });
  $('#bookedLogos img').removeAttr('style');
  }


// SHOWROOM
    // LOGOS
    $('#firstLogos').slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5
    });
    $('#firstLogos img').each(function(i){
      var logo = $(this);
      logo.attr('num', i).attr('id', 'logo'+i);
      logo.click(function(){
        $('#firstLogos .active').removeClass('active');
        logo.addClass('active');
        $('#focusLogo .display').hide().attr('src',this.src).fadeIn();
        setTimeout(function(){
          $('.showLogo').removeAttr('data-target');
        }, 1000);
      });
    });
    $('#logo0').addClass('active');
    $('#focusLogo .display').hide().attr('src',$('#logo0').attr('src')).fadeIn();
    $('#focusLogo .next').click(function(){
      var logoNext = $('#firstLogos .active');
      var idNext = Number(logoNext.attr('num'))+1;
      var last = $('#firstLogos').children().length;
      if(idNext == last){
        $('#focusLogo .next').attr('disabled');
      }else{
          var srcn = $('#logo'+idNext).attr('src');
          $('#firstLogos .active').removeClass('active');
          $('#logo'+idNext).addClass('active');
          $('#focusLogo .display').hide().attr('src', srcn).fadeIn();
        }
    });
    $('#focusLogo .prev').click(function(){
      var logoNext = $('#firstLogos .active');
      var idNext = Number(logoNext.attr('num'))-1;
      if(idNext == "-1"){
        $('#focusLogo .prev').attr('disabled');
      }else{
          var srcn = $('#logo'+idNext).attr('src');
          $('#firstLogos .active').removeClass('active');
          $('#logo'+idNext).addClass('active');
          $('#focusLogo .display').hide().attr('src', srcn).fadeIn();
        }
    });

    // CLIP AUDIO React
    $('#firstAud').slick({
      infinite: true,
      slidesToShow: 3,
      slidesToScroll: 3
    });
    $('#firstAud a').each(function(i){
      var aud = $(this);
      aud.attr('num', i).attr('id', 'aud'+i);
      aud.click(function(e){
        e.preventDefault();
        $('#firstAud .active').removeClass('active');
        aud.addClass('active');
        $('#focusAud .display').hide().attr('src', this.href).fadeIn();
        setTimeout(function(){
          $('.showAud').removeAttr('data-target');
        }, 1000);
      });
    });
    // $('#aud0').addClass('active');
    // $('#fnlFocusAud .display').hide().attr('src', $('#aud0').attr('href')).fadeIn();
    $('#focusAud .next').click(function(e){
      e.preventDefault();
      var audNext = $('#firstAud .active');
      var idNext = Number(audNext.attr('num'))+1;
      var last = $('#firstAud a').length;
      if(idNext == last){
        $('#focusAud .next').attr('disabled');
      }else{
          var srcNext = $('#aud'+idNext).attr('href');
          $('#firstAud .active').removeClass('active');
          $('#aud'+idNext).addClass('active');
          $('#focusAud .display').hide().attr('src', srcNext).fadeIn();
        }
    });
    $('#focusAud .prev').click(function(e){
      e.preventDefault();
      var audPrev = $('#firstAud .active');
      var idPrev = Number(audPrev.attr('num'))-1;
      if(idPrev == "-1"){
        $('#focusAud .prev').attr('disabled');
      }else{
          var srcPrev = $('#aud'+idPrev).attr('href');
          $('#firstAud .active').removeClass('active');
          $('#aud'+idPrev).addClass('active');
          $('#focusAud .display').hide().attr('src', srcPrev).fadeIn();
        }
    });
    $('#reduceAud').click(function(e){
      e.preventDefault();
      $('#focusAud').addClass('collapsing').removeClass('collapse show');
      $('#firstAud a').attr('data-target',"#focusAud");
    })
    // BUMPER
    $('#firstBumper').slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5
    });
    $('#firstBumper img').each(function(i){
      var bumper = $(this);
      bumper.attr('num', i).attr('id', 'bumper'+i);
      bumper.click(function(){
        $('#firstBumper .active').removeClass('active');
        bumper.addClass('active');
        $('#focusBumper .display').hide().attr('src',this.src).fadeIn();
        setTimeout(function(){
          $('.showBumper').removeAttr('data-target');
        }, 1000);
      });
    });
    $('#bumper0').addClass('active');
    $('#focusBumper.display').hide().attr('src',$('#bumper0').attr('src')).fadeIn();
    $('#focusBumper .next').click(function(){
      var bumperNext = $('#firstBumper .active');
      var idNext = Number(bumperNext.attr('num'))+1;
      var last = $('#firstBumper').children().length;
      if(idNext == last){
        $('#focusBumper .next').attr('disabled');
      }else{
          var srcn = $('#bumper'+idNext).attr('src');
          $('#firstBumper .active').removeClass('active');
          $('#bumper'+idNext).addClass('active');
          $('#focusBumper .display').hide().attr('src', srcn).fadeIn();
        }
    });
    $('#focusBumper .prev').click(function(){
        var bumperNext = $('#firstBumper .active');
        var idNext = Number(bumperNext.attr('num'))-1;
        if(idNext == "-1"){
          $('#focusBumper .prev').attr('disabled');
        }else{
            var srcn = $('#bumper'+idNext).attr('src');
            $('#firstBumper .active').removeClass('active');
            $('#bumper'+idNext).addClass('active');
            $('#focusBumper .display').hide().attr('src', srcn).fadeIn();
          }
      });

    // CLIP VJing
    $('#firstVJ').slick({
      infinite: true,
      slidesToShow: 5,
      slidesToScroll: 5
    });
    $('#firstVJ img').each(function(i){
      var vj = $(this);
      vj.attr('num', i).attr('id', 'vj'+i);
      vj.click(function(){
        $('#firstVJ .active').removeClass('active');
        vj.addClass('active');
        $('#focusVJ .display').hide().attr('src',this.src).fadeIn();
        setTimeout(function(){
          $('.showVJ').removeAttr('data-target');
        }, 1000);
      });
    });
    $('#vj0').addClass('active');
    $('#focusVJ.display').hide().attr('src',$('#vj0').attr('src')).fadeIn();
    $('#focusVJ .next').click(function(){
      var vjNext = $('#firstVJ .active');
      var idNext = Number(vjNext.attr('num'))+1;
      var last = $('#firstVJ').children().length;
      if(idNext == last){
        $('#focusVJ .next').attr('disabled');
      }else{
          var srcn = $('#vj'+idNext).attr('src');
          $('#firstVJ .active').removeClass('active');
          $('#vj'+idNext).addClass('active');
          $('#focusVJ .display').hide().attr('src', srcn).fadeIn();
        }
    });
    $('#focusVJ .prev').click(function(){
      var vjNext = $('#firstVJ .active');
      var idNext = Number(vjNext.attr('num'))-1;
      if(idNext == "-1"){
        $('#focusVJ .prev').attr('disabled');
      }else{
          var srcn = $('#vj'+idNext).attr('src');
          $('#firstVJ .active').removeClass('active');
          $('#vj'+idNext).addClass('active');
          $('#focusVJ .display').hide().attr('src', srcn).fadeIn();
        }
    });

  // Fonction destiné à compléter le sujet du mail à envoyer.
    let buttons = document.querySelectorAll('.inputButton');

  // BOUTONS CONTACT
    let subject = document.querySelector('#subject');
    for (let i = 0; i < buttons.length; i++){
      buttons[i].addEventListener('click', function(){
        console.log(buttons[i].value);
        subject.value += buttons[i].value + " ";
      })
    }

  // ARTICLE MODAL
    $(".hover-shadow").click(function(){
      var location = $(this).attr('src');
      console.log(location);
      $("#modalFocus").attr("src", location);
    })

    // VIMEO IFRAME + BUTTONS
      var vimeo = new Vimeo.Player('topVid');
      $('#vimPlay').on('click', function(){
        vimeo.play();
      })
      $('#vimPause').on('click', function(){
        vimeo.pause();
      })
      $('#vimMute').on('click', function(){
        vimeo.setVolume(0);
      })
      $('#vimUnmute').on('click', function(){
        vimeo.setVolume(1);
      })
      $('#pause').children().click(function(){
        $('#pause button').toggle();
      })
      $('#mute').children().click(function(){
        $('#mute button').toggle();
      })

      // VIMEO SHOWROOM
      // $('#firstAud a').click(function(e){
      //   e.preventDefault();
      //
      //   $('#fnlFocusAud').attr("src", $(this).attr("href"));
      // })
});
// })(jQuery);
