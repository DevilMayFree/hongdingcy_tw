let awardData = [];

function makeRequest(url){
    var request = new XMLHttpRequest();
    request.onload = function() {
        var response = JSON.parse(this.responseText);
        if(request.status >= 200 && request.status < 400){
            awardData = response;
            console.log('awardData', awardData);
            fillYear(awardData);
            fillAward(awardData[0]);

            $('#award .year_item').on('click', function(){
                $(this).addClass('active').siblings().removeClass('active');
                for(let i=0; i<awardData.length; i++){
                    if($(this).data('year') == awardData[i].year){
                        fillAward(awardData[i]);
                    }
                }
                // fillAward(awardData[0]);
            });
        }
    }
    request.open('GET', url, true);
    request.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    request.send();
}

function fillYear(data){
    let str = '';
    for(let i=0; i<data.length; i++){
        str+=`
            <div class="year_item swiper-slide" data-year="${data[i].year}">
                <h5 class="txt-medium">
                    <span>
                        ${data[i].year}
                    </span>
                </h5>
            </div>
        `
    }
    $('#award .year .swiper-wrapper').html(str);
    $('#award .year .year_item').eq(0).addClass('active');

    var award = new Swiper('#award .swiper-container', {
        loop: false,
        freeMode: true,
        slidesPerView: 3.5,
        spaceBetween: 0,
        allowTouchMove: true,
        autoplay: false,
        breakpoints:{
            1200:{
                slidesPerView: 10,
            },
            1023:{
                slidesPerView: 8,
            },
            768:{
                slidesPerView: 6,
            },
            600:{
                slidesPerView: 5,
            },
            450:{
                slidesPerView: 4.5,
            },
            375:{
                slidesPerView: 3.5,
            }
        },
        navigation: {
            nextEl: '#award .to_right',
            prevEl: '#award .to_left',
        },
    });
}

function fillAward(data){
    let str = '';
    for(let i=0; i<data.awards.length; i++){
        str+=`
            <div class="award_item">
                <h5 class="txt-medium h5-27">${data.awards[i].fundName}</h5>
                <h6>${data.awards[i].award}</h6>
                <br>
                <h6>${data.awards[i].awardInfo}</h6>
            </div>
        `
    }
    $('#award .award_box').html(str);
}


makeRequest("json/award.json");


// var award = new Swiper('#award .swiper-container', {
//     loop: false,
//     freeMode: true,
//     slidesPerView: 8,
//     spaceBetween: 0,
//     allowTouchMove: true,
//     autoplay: false,
//     breakpoints:{
//         1023:{
//             slidesPerView: 7,
//         },
//         768:{
//             slidesPerView: 6,
//         },
//         600:{
//             slidesPerView: 5,
//         },
//         450:{
//             slidesPerView: 4.5,
//         },
//         375:{
//             slidesPerView: 3.5,
//         }
//     }
// });


// $('#award .year_item').on('click', function(){
//     $(this).addClass('active').siblings().removeClass('active');
// });