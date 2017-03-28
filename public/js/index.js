/**
 * Created by nobikun1412 on 24-Mar-17.
 */
var isHover = false;
var slideIndex = 0;
var sliderDetail;
var sliderDetailTotal;
var oldIndexOverview;
var slider = $('.bxslider.slider-overview').bxSlider({
    pagerCustom: '#bx-pager',
    startSlide: slideIndex,
    slideMargin: 10,
    pagerType: 'full',
    controls: false,
    onSlideAfter: function($slideElement, oldIndex, newIndex) {
        var liSelected = 'li-img-' + newIndex;
        var $this = $('li.' + liSelected)
        chooseThumbnailImage($this, oldIndex);
    },
    speed: 10
});

slider.goToSlide(slideIndex);
$('ul li').each(function(i) {
    $(this).attr('rel'); // This is your rel value
});

$('.row.first-row').hover(function() {
    if (isHover == false) {
        isHover = true;
        // $('.noted-slider').css('display', 'block');
    } else {
        $('.row.first-row').addClass('hovered');
    }
    return;
});

// $('.row.first-row').click(function() {
//     $('.row.first-row').addClass('hovered');
//     $('.row.first-row').removeClass('hover');
// });

$(function() {
    $("#draggable").draggable({
        axis: 'x',
        scroll: false,
        // slideWidth: 600,
        // adaptiveHeight
        containment: '#bx-pager',
        drag: function() {
            // alert('dasd');
            posX = $(this).position().left;
            posY = $(this).position().top;
            updatePosition(posX, posY);
            // alert('dasd');
        }
    });
});

function updatePosition(posX, posY) {
    var tmp = document.elementFromPoint(posY, posX);
}
$(".img-drop-active").droppable({
    accept: '#draggable',
    axis: 'x',
    containment: '#bx-pager',
    over: function(event, ui) {
        // $('#highlighter').html("You dropped to div ID " + $(this).parent().attr('data-slide-index'));
        // slideIndex = $(this).parent().attr('data-slide-index');
        // slider.goToSlide(slideIndex);
        slideIndex = $(this).parent().attr('data-slide-index');
        $(this).addClass('img-visiting');
        slider.reloadSlider({
            pagerCustom: '#bx-pager',
            startSlide: slideIndex,
            // slideWidth: 100,
            slideMargin: 10,
            controls: false,
            pagerType: 'full',
            onSlideAfter: function($slideElement, oldIndex, newIndex) {
                var liSelected = 'li-img-' + newIndex;
                var $this = $('li.' + liSelected)
                chooseThumbnailImage($this, oldIndex);
            },
            speed: 100
        });
            $('#highlighter').html("slide Index: " + slideIndex);
    // $('#info-1').html("left current: " + posY);
    // $('#info-2').html("left: " + posX);
        // slider.destroySlider();
        // slider = $('.bxslider.slider-overview').bxSlider({
        //     pagerCustom: '#bx-pager',
        //     startSlide: slideIndex,
        //     // slideWidth: 100,
        //     slideMargin: 10,
        //      controls: false, 
        //     pagerType: 'full', 
        //     onSlideAfter: function($slideElement, oldIndex, newIndex) {
        //         var liSelected = 'li-img-' + newIndex;
        //         var $this = $('li.' + liSelected)
        //         chooseSlideImage($this, oldIndex);
        //     },
        //     speed: 10
        // });
    },
    out: function(event, ui) {
        // $(this).parent().attr('class', '');
        $(this).removeClass('img-visiting');
    },
    drop: function() {

        // slideIndex = $(this).parent().attr('data-slide-index');
        // // slider.reloadSlider();
        // slider.destroySlider();
        // slider = $('.bxslider.slider-overview').bxSlider({
        //     pagerCustom: '#bx-pager',
        //     startSlide: slideIndex,
        //     slideMargin: 10,
        //     pagerType: 'full', 
        //     onSlideAfter: function($slideElement, oldIndex, newIndex) {
        //         var liSelected = 'li-img-' + newIndex;
        //         var $this = $('li.' + liSelected)
        //         chooseSlideImage($this, oldIndex);
        //     },
        //     speed: 10
        // });
        // slider.goToSlide(slideIndex);
    }
});
$('ul.thumbnail-list-img li').click(function() {
    var oldIndex = slider.getCurrentSlide();
    chooseThumbnailImage($(this), oldIndex);
});

function chooseThumbnailImage($this, oldIndex) {
    var classTmp = 'img-thumbnail-' + oldIndex;
    var currentIndex = slider.getCurrentSlide();
    $this.find('.img-drop-active').addClass('img-visiting');
    $('img.' + classTmp).parents('.img-drop-active').removeClass('img-visiting');
    var posX = $this.position().left;
    var posY = $('#draggable').position().top;
    if (currentIndex != 0) {
        posX = posX - 12;
    } else posX = posX - 12;
    $('#draggable').animate({
        'top': posY + 'px',
        'left': posX + 'px'
    }, 100, function() {
        //end of animation.. if you want to add some code here
    });
    $('#highlighter').html("left new: " + oldIndex);
    $('#info-1').html("left current: " + posY);
    $('#info-2').html("left: " + posX);
}

// function chooseSlideImage($this, oldIndex) {
//     var classTmp = 'img-thumbnail-' + oldIndex;
//     var currentIndex = slider.getCurrentSlide();
//     $('img.' + classTmp).removeClass('img-visiting');
//     $this.find('img').addClass('img-visiting');
//     var posX = $this.position().left;
//     var posY = $('#draggable').position().top;
//     if (currentIndex != 0) {
//         posX = posX - 12;
//     } else posX = posX - 12;
//     $('#draggable').animate({
//         'top': posY + 'px',
//         'left': posX + 'px'
//     }, 0, function() {
//         //end of animation.. if you want to add some code here
//     });
//     $('#highlighter').html("left new: " + oldIndex);
//     $('#info-1').html("left current: " + posY);
//     $('#info-2').html("left: " + posX);
// }

$('ul.bxslider.slider-overview li .btn-zoom').click(function() {
    var slideOffset = $(this).data('slide-offset');
    oldIndexOverview = slider.getCurrentSlide();
    slider.destroySlider();
    sliderDetail = $('.bxslider.slider-detail').bxSlider({
        startSlide: slideOffset,
        slideMargin: 10,
        controls: false,
        speed: 10,
        //  nextSelector: '.prev-btn',
        // prevSelector: '.next-btn',
        pagerType: 'short',
        onSlideAfter: function($slideElement, oldIndex, newIndex) {
            sliderDetailTotal = sliderDetail.getSlideCount();
            updateIndexSlider(newIndex, sliderDetailTotal);
        },
    });
    $('.row.first-row').hide();
    $('.row.second-row').show();
    sliderDetailTotal = sliderDetail.getSlideCount();
    // $('#box-slide-index').val(slideOffset + 1);
    // $('.total-slide').html('/' + sliderDetailTotal);
    updateIndexSlider(slideOffset, sliderDetailTotal);
    sliderDetail.reloadSlider();
    console.log('Id: ' + slideOffset);
});

$('ul.bxslider.slider-detail li .btn-exit').click(function() {
    slideIndex = $(this).data('slide-index');
    //     var sliderDetail = $('.bxslider.slider-detail').bxSlider({
    //     startSlide: slideOffset,
    //     slideMargin: 10,
    //     speed: 10
    // });
    sliderDetail.destroySlider();
    $('.row.first-row').show();
    $('.row.second-row').hide();
    slider = $('.bxslider.slider-overview').bxSlider({
        pagerCustom: '#bx-pager',
        startSlide: slideIndex,
        // slideWidth: 100,
        slideMargin: 10,
        controls: false,
        pagerType: 'full',
        onSlideAfter: function($slideElement, oldIndex, newIndex) {
            var liSelected = 'li-img-' + newIndex;
            var $this = $('li.' + liSelected)
            chooseThumbnailImage($this, oldIndex);
        },
        speed: 10
    });
    var liSelected = 'li-img-' + slideIndex;
    var $this = $('li.' + liSelected)
    chooseThumbnailImage($this, oldIndexOverview);
    // console.log('Id: ' + slideOffset);
});

function updateIndexSlider(newIndex, totalIndex) {
    newIndex = newIndex + 1;
    $('.box-slide-current').html(newIndex + '/' + totalIndex);
    if (newIndex == 1) {
        $('#slider-prev').addClass('deactive');
        $('#slider-next').removeClass('deactive');
    } else if (newIndex == totalIndex) {
        $('#slider-next').addClass('deactive');
        $('#slider-prev').removeClass('deactive');
    } else {
        $('#slider-prev').removeClass('deactive');
        $('#slider-next').removeClass('deactive');
    }
}

$('.next-btn').click(function() {
    var currentDetail = sliderDetail.getCurrentSlide() + 1;
    if (currentDetail != sliderDetailTotal) {
        sliderDetail.goToNextSlide();
        updateIndexSlider(currentDetail + 1, sliderDetailTotal);
    }
});

$('.prev-btn').click(function() {
    var currentDetail = sliderDetail.getCurrentSlide() + 1;
    if (currentDetail != 1) {
        sliderDetail.goToPrevSlide();
        updateIndexSlider(currentDetail - 1, sliderDetailTotal);
    }
});