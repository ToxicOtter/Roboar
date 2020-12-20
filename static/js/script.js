$(document).ready(function(){
    var temperatureData = [];
    // atualize div
    $(function() {
        setTime();
        function setTime() {
            $.ajax({
                type: "GET",
                url: "https://cors-anywhere.herokuapp.com/http://roboaranalytics.pythonanywhere.com/data/Temperature",
                dataType: 'json',
                success: function(data) {
                    temperatureData = Object.entries(data);
                    actualize(temperatureData);
                }
            });
            function actualize(tempperatureData){
                var otherstring = Math.floor(Math.random() * 10);
                setTimeout(setTime, 3000);
                $('#data1').html(String(temperatureData[0][1][1]));
                $('#data2').html(otherstring);
            };
        }
    });

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