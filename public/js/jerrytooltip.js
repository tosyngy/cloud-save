/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


$(document).on('mouseover', ".toool", function () {
    console.log($(this).attr("class"));
    var content = $(this).attr("dip");
    tool_tip_content(content, $(this), "");
});
$(document).on('mouseout', ".toool", function () {
    $(this).children(".tip").remove();
});
function tool_tip_content(content, cls, disp) {
    console.log(content);
    var data = "<div class='tip " + disp + " col-sm-12 col-md-12'>" + content + "</div>";
    $(cls).children(".tip").remove();
    $(cls).prepend(data);
//    //alert(cls);
    $(document).on('click', cls, function () {
//        //alert(cls);
        $(cls).children(".tip").remove();
    });
}
