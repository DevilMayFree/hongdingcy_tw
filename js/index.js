// ====================
// kv Swiper
// ====================
var kv = new Swiper("#kv .kv_box", {
  loop: true,
  slidesPerView: 1,
  spaceBetween: 0,
  allowTouchMove: true,
  autoplay: {
    delay: 3700,
    disableOnInteraction: false,
  },
  pagination: {
    el: "#kv .kv_box .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: "#kv .kv_box .to_right",
    prevEl: "#kv .kv_box .to_left",
  },
});

// ====================
// scroll_down
// ====================
$("#scroll_down").on("click", function () {
  sliderTo($("#about"));
});

// ====================
// master Swiper
// ====================
var master = new Swiper("#master .master_box", {
  //   loop: true,
  slidesPerView: 2,
  spaceBetween: "6%",
  breakpoints: {
    1024: {
      slidesPerView: 1,
      spaceBetween: 0,
    },
  },
  allowTouchMove: true,
  autoplay: {
    delay: 3700,
    disableOnInteraction: false,
  },
  pagination: {
    el: "#master .swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl: "#master .to_right",
    prevEl: "#master .to_left",
  },
});

// ====================
// area Swiper
// ====================
var area = new Swiper("#area .itembox", {
  loop: true,
  slidesPerView: 3,
  spaceBetween: 30,
  allowTouchMove: true,
  breakpoints: {
    500: {
      slidesPerView: 1,
    },
    680: {
      slidesPerView: 2,
      spaceBetween: 10,
    },
    1024: {
      slidesPerView: 2,
    },
  },
  navigation: {
    nextEl: "#area .control .to_right",
    prevEl: "#area .control .to_left",
  },
});

// ====================
// area Swiper
// ====================
// var area = new Swiper('#contact .itembox', {
//     loop: true,
//     slidesPerView: 3,
//     spaceBetween: 10,
//     direction : 'vertical',
//     allowTouchMove: true,
//     // breakpoints: {
//     //     500:{
//     //         slidesPerView: 1,
//     //     },
//     //     680:{
//     //         slidesPerView: 2,
//     //         spaceBetween: 10,
//     //     },
//     //     1024:{
//     //         slidesPerView: 2,
//     //     }
//     // },
//     // navigation: {
//     //     nextEl: '#area .control .to_right',
//     //     prevEl: '#area .control .to_left',
//     // },
// });

$("#to_top").on("click", function () {
  sliderTo($("#kv"));
});

$("#open_disclosure").on("click", function () {
  $("#disclosure_lightbox").addClass("active");
  $("body").addClass("lock");
});
$("#disclosure_lightbox .close, #disclosure_lightbox .cover").on(
  "click",
  function () {
    $("#disclosure_lightbox").removeClass("active");
    $("body").removeClass("lock");
  }
);

$("#open_copyright").on("click", function () {
  $("#copyright_lightbox").addClass("active");
  $("body").addClass("lock");
});

$("#copyright_lightbox .close, #copyright_lightbox .cover").on(
  "click",
  function () {
    $("#copyright_lightbox").removeClass("active");
    $("body").removeClass("lock");
  }
);

// $('#copyright_lightbox2').addClass('active');
// $("#copyright_lightbox2 .close, #copyright_lightbox2 .cover").on(
//   "click",
//   function () {
//     $("#copyright_lightbox2").removeClass("active");
//     $("body").removeClass("lock");
//   }
// );