
// <!--vicsoft start editing here-->
$(function() {
    $.post("http://192.168.0.102/medslat/refModule/getlastRef", function(result) {
        var obj = JSON.parse(result);
        if (obj.length > 0) {
            $.each(obj, function(id, result) {
               // alert("result  "+result);
                if (id === 0) {
                    $(".refs-name").text(result.patname + "  " + result.patlastname);
                    $(".down-info").text("  From: Dr. " + result.docname + "  " + result.doclastname);
                    $(".profpix").attr("src", "http://192.168.0.102/medmedslat/" + result.profpix);
                    $(".profpix").attr("onError", "http://192.168.0.102/medslat/public/images/user_icon.png");
                }
                else {
                    $(".profpix").attr("src", "http://192.168.0.102/medmedslat/" + result.profpix);
                }
            });
        }
        else {
            $(".btm-ref").empty();
            $(".btm-ref").text("No Referer");
            $(".top-ref").empty();
            $(".top-ref").text("No Referer");
//            $(".down-info").text("No Referer");
//            $(".profpix").attr("src", "http://192.168.0.102/medslat/public/images/user_icon.png");
            //$(".profpix").attr("onError", "http://192.168.0.102/medslat/public/images/user_icon.png");
        }
    });
});
//$(document).on("click", '.chat_with_cons', function() {
//    alert("chat with");
//    current_chatting = $(this).find("pola").attr("id");
//    $("div[rel_div=1]").tab1($("div[rel_div=1]").siblings());
//    $("div[rel_div=1]").find(".cht-head").show();
//
//});
$(document).on("click", '.refer_cons', function() {
    searchtype = '2a';
    var mainother = "http://192.168.0.102/medslat/otherModule/mainother/" + '2a';
    $.get(mainother, function(data) {
        $('.main-top-over .down').empty();
        $('.main-top-over').css({display: 'block'});
        $('.main-top-over .down').append(data);
        getallpractisioners("medical doctors");

//       
    });

})
$(document).on("click", '.closeme', function() {
    $(this).parent().css("display", "none");
    ;
//   tests.css( "display", "none" );
//    alert(tests);
})
$(document).on("click", '.lok-user-prof', function() {
    var mainprofile = "http://192.168.0.102/medslat/profileModule/mainprofile/" + $("#user_id").val() + "/" + 1;
    $.get(mainprofile, function(data) {
            $('.main-top-over .down').empty();
            $('.main-top-over').css({display: 'block'});
            $('.main-top-over .down').append(data);
    });

})






//<!--vicsoft editing ends here-->
