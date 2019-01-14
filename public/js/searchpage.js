
$(function () {
    $('.side-nav').on('click', function (e) {
        if ($(this).hasClass("active")) {
            return;
        }

    });
    $('body').on('mouseup', function (e) {
        if ($(window).height() > 460 && $(window).width() > 600) {
            var subject = $(".side-nav");
            if (!$(".side-nav").hasClass("active")) {
                $(".side-nav").animate({"width": "25%", "margin-left": "0", "border-width": "3px"}).addClass("active");
                $(".main-search-result").css({width: '70%'});
                $(".side-nav span[class*=ent] ").show();
                $(".typ").css({"text-align": "left"});
                $('.left_pane').css("display", "block");
                $('.icn').animate({
                    "margin-left": "1%"
                });
            }
        } else {
            $(".side-nav").animate({"width": "25%", "margin-left": "0", "border-width": "3px"}).addClass("active");
            $(".main-search-result").css({width: '70%'});
            $(".side-nav span[class*=ent] ").show();
            $(".typ").css({"text-align": "left"});
            $('.left_pane').css("display", "block");
            $('.icn').animate({
                "margin-left": "1%"
            });
        }

    });

//$(".side-nav").on("mouseleave",function (){
//          $(".side-nav span[class*=ent]").hide();
//            $(".typ").css({"text-align": "center"});
//     
//            $('.side-nav').animate({
//                "width": "8%",  "margin-left": "-2%","border-width":"0"
//            },function(){
//                    $(".main-search-result").css({width: '90%'});
//            }).removeClass("active");
//                 
//});

});
$(document).ready(function () {

    $(document).on('click', '.res', function (e) {
        if ($(e.target).hasClass('res_link')) {
            //alert("yes");
        }
        var person = $(this).find("pola").attr("id");
        current_doc = person;
//        alert("shdgs  " + current_doc)
        var mainprofile = "http://192.168.0.102/medslat/profileModule/mainprofile/" + person + "/" + 1;
        $.get(mainprofile, function (data) {
            $('.other_2 .prof_search').empty();
            $('.other_2 .prof_search').append(data);
            $('.other_2').css({display: 'block'});
            $('.other_1').css({display: 'none'});
        });
    });
  
    $(document).on('click', '.back_searh', function () {
        $('.other_2').css({display: 'none'});
        $('.other_1').css({display: 'block'});
    });



});


