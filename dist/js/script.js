
$(document).ready(function(){
  $('.carousel__inner').slick({
        speed: 1000,
        prevArrow: '<button type="button" class="slick-prev"> <img src="icons/left_arrow.png"> </button>',
        nextArrow: '<button type="button" class="slick-next"> <img src="icons/right_arrow.png"> </button>',
        autoplay: true,
        autoplaySpeed: 2000,
        responsive: [
            {
              breakpoint: 900,
              settings: {
                dots:false,
                dotsClass: 'dots',
                arrows: false,
                slidesToShow: 1
              }
            }]
  });
  $('ul.catalog-tabs').on('click', 'li:not(.catalog-tabs__tab_active)', function() {
      $(this)
        .addClass('catalog-tabs__tab_active').siblings().removeClass('catalog-tabs__tab_active')
        .closest('div.container').find('div.catalog-content').removeClass('catalog-content_active').eq($(this).index()).addClass('catalog-content_active');
  });

  function toggleSlide(item) {
      $(item).each(function(i){
        $(this).on('click', function(e){
          e.preventDefault();
          $('.catalog-content__card').eq(i).toggleClass('catalog-content__card_active');
          $('.catalog-content__list').eq(i).toggleClass('catalog-content__list_active');
        });
      });
  };

  toggleSlide('.catalog-content__link');
  toggleSlide('.catalog-content__back');

  $('[data-modal=consultation]').on('click', function(){
      $('.overlay, #consultation').fadeIn();
  });

  $('.modal__close').on('click', function(){
      $('.overlay, #consultation, #order').fadeOut();
  });

  $('.button_mini').each(function(i){
      $(this).on('click', function(){
        $('.overlay, #order').fadeIn();
        $('#order .modal__description').text($('.catalog-content__subheader').eq(i).text());
      });
  });


  function validateForm (form) {
    $(form).validate({
      rules: {
          // simple rule, converted to {required:true}
          name: "required",
          // compound rule
          email: {
            required: true,
            email: true
          }
      },

      messages: {
        name: "Пожалуйста, введите Ваше имя",
        email: {
          required: "Пожалуйста, введите Ваш email",
          email: "Пожалуйста, введите корректный email"
        },
        phone: "Пожалуйста, введите Ваш номер телефона"
      }
    });  
  };

  validateForm ('#consultation .feed-form');
  validateForm ('#order .feed-form');
  validateForm ('#on-page');

  $('input[name=phone]').mask("+7 (999) 999-99-99");

  $('form').submit(function(e){
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function(){
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, .modal_mini').fadeIn();

      $('form').trigger('reset');
    });
    return false;
  });

  $(window).scroll(function() {
      if($(this).scrollTop() > 1200) {
        $('.pageup').fadeIn();
      } else {
        $('.pageup').fadeOut();
      }
  });

  $("a[href='#up']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  new WOW().init();
    
});
