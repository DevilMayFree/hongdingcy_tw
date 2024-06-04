// ====================
// sliderTo something
// ====================
function sliderTo(target){
    if (target.length) {
        $('html, body').animate({
            scrollTop: target.offset().top
        }, 800);
        return false;
    }
}