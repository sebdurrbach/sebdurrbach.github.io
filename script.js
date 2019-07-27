$(function(){

  /***** VARIABLES *****/

  let count = 1, opacity = 1, angle, currentSection, scrollLimit, scrollTo, scrollSpeed, isScrolling, isResizing;

  let skills = {
		"html" : 80,
		"css" : 80,
		"bootstrap" : 80,
		"sass" : 60,
		"javascript" : 70,
		"jquery" : 80,
		"angular" : 70,
		"react" : 20,
    "node" : 70,
    "electron" : 30,
		"ionic" : 20,
		"php" : 70,
		"sql" : 70,
    "silex" : 70,
    "graphql" : 30,
		"github" : 70,
		"travis" : 30,
		"wordpress" : 80,
		"opquast" : 91.5,
		"photoshop" : 40,
		"indesign" : 50,
    "illustrator" : 20
  };

  let menuList = $('nav').find('a[href^="#"]');
  let sectionList = menuList.map(function(){
    let section = $($(this).attr('href'));
    if (section.length) {
      return section;
    }
  });

  let skillsList = $('#skills-board').find('h3');

  $('#randomNumberOne').text(Math.floor(Math.random() * 10));
  $('#randomNumberTwo').text(Math.floor(Math.random() * 10));

  let formReply = $('#formReply');
  let formNumberOne = Number($('#randomNumberOne').html());
  let formNumberTwo = Number($('#randomNumberTwo').html());
  let formResult = formNumberOne + formNumberTwo;

  $('.field input, .field textarea').map(function(){
    let placeholder = $(this).attr('placeholder');
    $(this).data('placeholder', placeholder);
  })

  /****** FUNCTIONS ******/

  function pulse() {
    if ($(window).scrollTop()) {
      $('#photo a').removeClass('pulse');
    } else {
      setTimeout(function(){
        $('#photo a').addClass('pulse');
      }, 2000);
    }
  }

  function menuAnimation() {
    count +=1;
    opacity = count % 2;
    $('nav ul').toggleClass('showing');
    if (opacity === 0) {
      $('#menu-icon-one').css({'left': 'calc(100% - 150px)', opacity: '0'});
      $('#menu-icon-two').delay(100).queue(function(){
        $(this).css({'left': 'calc(100% + 100px)', opacity: '0'}).dequeue();
      });
      $('#menu-icon-three').delay(200).queue(function(){
        $(this).css({'left': 'calc(100% - 150px)', opacity: '0'}).dequeue();
      });
      $('.icon-fill').delay(200).queue(function(){
        $(this).css({'width': '100%', 'opacity': '1'}).dequeue();
      });
      $('nav a').each(function(i){
        $(this).delay(100 * i).queue(function(){
          $(this).addClass('a-reveal').dequeue();
        });
      });
      $('.menu-icon').removeClass('menu-icon-slim');
      $('#home').removeClass('home-slim');
    } else {
      $('#menu-icon-one').css({'left': 'calc(100% - 50px)', opacity: '1'});
      $('#menu-icon-two').css({'left': 'calc(100% - 50px)', opacity: '1'});
      $('#menu-icon-three').css({'left': 'calc(100% - 50px)', opacity: '1'});
      $('.icon-fill').css({'width': '0%', 'opacity': '0'});
      $('nav a').removeClass('a-reveal');
      if ($(window).scrollTop()) {
        $('.menu-icon').addClass('menu-icon-slim');
        $('#home').addClass('home-slim');
      }
    }
  }

  function navOpac() {
    if($(window).scrollTop()) {
      $('#me').addClass('me-scroll');
      $('.menu-icon').addClass('opac');
      $('#home').addClass('home-white');
      $('#menu').addClass('menu-slim opac');
      $('nav a').addClass('a-white');
      $('.menu-icon div:not(#menu-icon-four, #menu-icon-five)').css('background', '#fff');
      if (!$('nav ul').hasClass('showing')) {
        $('.menu-icon').addClass('menu-icon-slim');
        $('#home').addClass('home-slim');
      } else {
        if (!$('.menu-icon').is(':visible')) {
          $('#home').addClass('home-slim');
        }
      }
    } else {
      $('#me').removeClass('me-scroll');
      $('.menu-icon div:not(#menu-icon-four, #menu-icon-five)').css('background', '#000');
      $('.menu-icon').removeClass('opac');
      $('#home').removeClass('home-white');
      $('#menu').removeClass('opac menu-slim');
      if (!$('nav ul').hasClass('showing')) {
        $('.menu-icon').removeClass('menu-icon-slim');
        $('#home').removeClass('home-slim');
      } else {
        if (!$('.menu-icon').is(':visible')) {
          $('#home').removeClass('home-slim');
        }
      }
      $('nav a').removeClass('a-white');
    }
  }

  function menuCursor() {
    let scrollSection = sectionList.map(function(){
      if ($(this)[0].id === 'bio') {
        scrollLimit = $(this).offset().top - $('#me').height();
      } else {
        scrollLimit = $(this).offset().top;
      }
      if (scrollLimit < $(window).scrollTop() + ($(window).height() / 3)) {
        return this;
      }
    });
    currentSection = scrollSection[scrollSection.length - 1];
    $('nav li a').removeClass('active').filter('[href="#' + currentSection[0].id + '"]').addClass('active');
  }

  function linkedinAngle() {
    angle = Math.atan(50 / $(window).width()) * 180 / Math.PI;
    $('#linkedin span').css('transform', 'rotate(-'+angle+'deg)');
  }

  function getSkills() {
    console.log(1);
    if ($('nav a[href="#skills"]').hasClass('active')) {
      console.log(2);
      for (key in skills) {
        $this = $('#skills h3:contains("'+key+'")').closest('.skill');
        $this.find('.full').css(
          'width', skills[key]+'%'
        );
        $this.find('.percent').text(skills[key]+'%').fadeIn(1000);
      }
    } else {
      $('.full').width(0);
      $('.percent').fadeOut('slow');
    }
  }

  function randomNumbers() {

  }

  function formValidation() {
    let requiredField = $('form').find('[placeholder*="*"]');
    let err = false;
    for (let i = 0; i < requiredField.length; i++) {
      let input = requiredField[i].value.trim();
      if (input == '') {
        requiredField[i].className = 'input-unvalid';
        err = true;
      } else {
        requiredField[i].className = '';
      }
    }

    if (!err) {
      $.ajax({
        url: 'form.php',
        method: 'POST',
        data: $('form').serialize()
      }).done(function(data){
        if (data == 1) {
          $('.form-response p').removeClass('form-error').html('Votre message a bien été envoyé.');
          $('.form-response').fadeIn('slow');
        }
      })
    } else {
      $('.form-response p').addClass('form-error').html('Merci de remplir les champs obligatoires.');
      $('.form-response').fadeIn('slow');
    }
  }

  /****** CLICK EVENT ******/

  $("header a").click(function(e) {
    e.preventDefault();
    scrollTo = $(this).attr('href');
    $('nav a').removeClass('active').filter('[href="' + scrollTo + '"]').addClass('active');
    if ($('nav ul').hasClass('showing')) {
      menuAnimation();
    }
    if (scrollTo === '#bio') {
      scrollTo = $(scrollTo).offset().top - $('#me').innerHeight() - 40;
    } else {
      scrollTo = $(scrollTo).offset().top - 39;
    }
    if ($(window).width() < 500) {
      scrollSpeed = 0.3 * Math.abs(currentSection.offset().top - scrollTo);
    } else if ($(window).width() < 900) {
      scrollSpeed = 0.35 * Math.abs(currentSection.offset().top - scrollTo);
    } else {
      scrollSpeed = 0.4 * Math.abs(currentSection.offset().top - scrollTo);
    }
    scrollSpeed += 500;
    $('html,body').animate({
      scrollTop: scrollTo
    }, scrollSpeed);
  });

  $('nav ul').on('click', function(){
    if ($('nav ul').hasClass('showing')) {
      menuAnimation();
    }
  });

  $('.menu-icon').on('click', function(event){
    if (!event.detail || event.detail==1) {
      menuAnimation();
    }
  });

  $('.pic-item').on('click', function() {
    if (!$(this).find('.pic-content').hasClass('pic-content-clic')) {
      $('.pic-item').find('.pic-background').removeClass('pic-background-clic');
      $('.pic-item').find('.pic-content').removeClass('pic-content-clic');
      $('.pic-item').find('h3').removeClass('h3-clic');
      $(this).find('.pic-background').addClass('pic-background-clic');
      $(this).find('.pic-content').addClass('pic-content-clic');
      $(this).find('h3').addClass('h3-clic');
    } else {
      $(this).find('.pic-background').removeClass('pic-background-clic');
      $(this).find('.pic-content').removeClass('pic-content-clic');
      $(this).find('h3').removeClass('h3-clic');
    }
  });

  /****** OTHER EVENTS ******/

  $('.menu-icon').hover(function(){
    $('#menu-icon-two, #menu-icon-three').css('width', '40');
  }, function(){
    $('#menu-icon-two, #menu-icon-three').css('width', '');
  });

  $(window).on('scroll', function(){
    navOpac();
    clearTimeout(isScrolling);
    isScrolling = setTimeout(function() {
      menuCursor();
      getSkills();
      pulse();
    }, 100);
  });

  $(window).on('resize', function(){
    clearTimeout(isResizing);
    isResizing = setTimeout(function(){
      if ($('#menu').hasClass('opac') && $('nav ul').hasClass('showing')) {
        if ($('.menu-icon').is(':visible')) {
          $('#home').removeClass('home-slim');
        } else {
          $('#home').addClass('home-slim');
        }
      }
    }, 200);
    linkedinAngle();
  });

  $('#simpleForm').on('submit', function(e){
    e.preventDefault();
    let formAnswer = Number($('#formAnswer').val());
    formReply.fadeOut("fast", function() {
      if (formAnswer == formResult) {
        formReply.html('<p style="color: #00A078;">Vous pouvez envoyer votre mail à sebastien.durrbach@gmail.com<p>');
      } else {
        formReply.html('<p style="color: #FF5037;">Votre réponse est incorrecte.<p><p><a href="/#contact" title="Refaire le test"></a></p>')
      }
    });

    formReply.fadeIn();
  });

  $('.field input, .field textarea').focus(function(){
    $(this).attr('placeholder', '');
    $(this).parent().addClass('field-rotate').find('label').addClass('label-focus');
  });

  $('.field input, .field textarea').blur(function(){
    let $parent = $(this).parent();
    $parent.removeClass('field-rotate');
    $parent.find('label').removeClass('label-focus');
    let placeholder = $(this).data('placeholder');
    if ($(this).val().trim() == '') {
      $parent.find('label').removeClass('label-focus');
      setTimeout(function(){
        $parent.find('input, textarea').attr('placeholder', placeholder);
      }, 100);
    } else {
      $(this).removeClass('input-unvalid');
    }
  });

  $('#fullForm').on('submit', function(e){
    e.preventDefault();
    formValidation();
  });

  navOpac();
  menuCursor();
  linkedinAngle();
  getSkills();
  pulse();
  randomNumbers();

});

