
// <!--vicsoft start editing here-->
$(function () {
    $.post("http://192.168.0.102/medslat/refModule/getlastRef", function (result) {
        var obj = JSON.parse(result);
        if (obj.length > 0) {
            $.each(obj, function (id, result) {
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
$(document).on("click",'.chat_with_cons',function (){
    current_chatting = $(this).find("pola").attr("id");
    $("div[rel_div=1]").tab1($("div[rel_div=1]").siblings());
    $("div[rel_div=1]").find(".cht-head").show();
    
});
$(document).on("click",'.refer_cons',function (){
     var mainother = "http://192.168.0.102/medslat/otherModule/mainother/"+2;
//    //alert(mainother)
     console.log($(this));
    var test =$(this).parent().parent().parent().parent(); 
    
  test.children(".refrer_inside_modal").slideDown();
    $.get(mainother, function(data) {
       test.children(".refrer_inside_modal").empty();
//        test.children(".refrer_inside_modal").append(data); 
var clo = "<div style='color: red; float: right;font-weight: bold; font-size: 16px; cursor: pointer;' class='closeme'>X</div>"
        test.children(".refrer_inside_modal").append(clo); 
//        //alert(test)
        test.children(".refrer_inside_modal").append(data); 
//        $("."+test).find( "refrer_inside_modal" ).css( "background-color", "red" );
        console.log(test);  

//        $(".refrer_inside_modal").append(data); 
//         $('#myModal').modal();
    });
    
})
$(document).on("click",'.closeme',function (){
   $(this).parent().css( "display", "none" );;
//   tests.css( "display", "none" );
//    //alert(tests);
})
//<!--vicsoft editing ends here-->
