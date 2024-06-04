$('header nav .nav-item').on('mouseenter', function(){
  $('.header_cover').removeClass('active');
  $(this)
    .addClass('active')
    .siblings('.nav-item')
    .removeClass('active');

  $('header')
    .find('.subnav-box ' + $(this).data('sub'))
    .addClass('active')
    .siblings()
    .removeClass('active');
});

$('header nav .nav-item').on('click', function(){
  $(this)
    .next('.sub-step2')
    .addClass('active')
    .siblings('.sub-step2')
    .removeClass('active');
});

$('header').on('mouseleave', function(){
  $('header nav .nav-item').removeClass('active');
  $('header .subnav').removeClass('active');
});

$('header .subnav').each(function(){
  let thisSet = $(this);
  thisSet.find('.main_page .link').eq(0).addClass('active');
  thisSet.find('.page_contain').eq(0).addClass('active');

  thisSet.find('.main_page .link').on('click', function(){
    $(this)
      .addClass('active')
      .siblings()
      .removeClass('active');
    
    thisSet
      .find($(this).data('sub'))
      .addClass('active')
      .siblings()
      .removeClass('active');
  });
});


$('header .hamberger').on('click', function(){
  $('header nav').toggleClass('active');
});

$('header .nav-item.search').on('click', function(e){
  if($(window).width() >= 1200){
    e.preventDefault();
    $('header nav .nav-item').removeClass('active');
    $('header .subnav').removeClass('active');
    $('header .subsearch-box .subsearch').toggleClass('active');
  }
});

$('#header_outer').height($('header').height());
$(window).on('scroll', function(){
  if($(window).scrollTop() >= $('#header_outer').offset().top){
    $('header').addClass('fixed');
  } else {
    $('header').removeClass('fixed');
  }
  console.log($(window).scrollTop() , $('#header_outer').offset())
});



$("#search_clear_btn").click(function(){
  $('#s_risk_level').multipleSelect("uncheckAll");
  $('#s_share_type').multipleSelect("uncheckAll");
  $('#s_invest_area').multipleSelect("uncheckAll");
  $('#s_invest_target').multipleSelect("uncheckAll");
  $('#s_interest_type').multipleSelect("uncheckAll");
  $('#s_currency').multipleSelect("uncheckAll");
})
$("#search_btn").click(function(){
  $("#form_search").submit();
})
$('#s_risk_level').multipleSelect();
$('#s_share_type').multipleSelect();
$('#s_invest_area').multipleSelect();
$('#s_invest_target').multipleSelect();
$('#s_interest_type').multipleSelect();
$('#s_currency').multipleSelect();


var marquee = new Swiper('#marquee .swiper-container', {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  allowTouchMove: true,
  autoplay: true,
  speed: 1500,
  delay: 3000,
});

$('#marquee .close').on('click', function(){
  $('#marquee').hide();
  $('.header_outer').height($('header').height());
})



// --- light box ---
var lightboxBtn = $('#light-box_btn'),
lightbox = $('#copyright_light_box'),
overlay = $('#copyright_light_box #overlay'),
boxClose = $('#copyright_light_box .box_close');

lightboxBtn.on('click', function(){
  lightbox.addClass('active');
});
overlay.on('click', function(){
  lightbox.removeClass('active');
});
boxClose.on('click', function(){
  lightbox.removeClass('active');
});