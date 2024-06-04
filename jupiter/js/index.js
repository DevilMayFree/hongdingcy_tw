var kv = new Swiper('#kv', {
    loop: true,
    slidesPerView : 1,
    spaceBetween : 0,
    allowTouchMove: true,
    pagination: {
        el: '#kv .swiper-pagination',
    },
});

var insights = new Swiper('#insights .itembox', {
    loop: true,
    slidesPerView : 1.5,
    spaceBetween : 20,
    allowTouchMove: true,
    breakpoints: {
        550:{
            slidesPerView : 2.5,
            spaceBetween: 20,
        },
        800:{
            slidesPerView : 3,
            spaceBetween: 20,
        }
    },
    navigation: {
        nextEl: '#insights .to_right',
        prevEl: '#insights .to_left',
    },
});

var service = new Swiper('#service .itembox', {
    loop: true,
    slidesPerView : 1.5,
    spaceBetween : 20,
    allowTouchMove: true,
    breakpoints: {
        450:{
            slidesPerView : 1.5,
            spaceBetween: 20,
        },
        500:{
            slidesPerView : 2.5,
            spaceBetween: 20,
        },
        768:{
            slidesPerView : 3.5,
            spaceBetween: 20,
        },
        1024:{
            slidesPerView : 4,
            spaceBetween: 20,
        }
    },
    navigation: {
        nextEl: '#service .to_right',
        prevEl: '#service .to_left',
    },
});