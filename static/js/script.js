$(document).ready(function(){
    //animated scroll
    //buttons
    let navBtn = $('.nav-item');
    let mainBtn = $('.main-btn');

    //areas
    let slider = $('#mainSlider');
    let about = $('#about-area');
    let team = $('#team-area');

    let scrollTo = '';

    $(navBtn).click(function() {
        //"ifs" to redirect to the area
        let btnId = $(this).attr('id');

        if (btnId == 'about-menu'){
            scrollTo = about;
        } else if (btnId == 'team-menu'){
            scrollTo = team;
        } else if (btnId == 'home-menu'){
            scrollTo = slider;
        }

        //animation
        $([document.documentElement, document.body]).animate({
            scrollTop: $(scrollTo).offset().top - 70
        }, 1000)
    });

    $(mainBtn).click(function() {
        //same explanation of the above
        let mainId = $(this).attr('id');

        if (mainId == 'project-slide'){
            scrollTo = about;
        }

        $([document.documentElement, document.body]).animate({
            scrollTop: $(scrollTo).offset().top - 70
        }, 1000)
    });

});