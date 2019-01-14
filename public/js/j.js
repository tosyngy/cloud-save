//var DroppyBox = $('<div class="box" style="z-index:1999; top:100%;"></div>');
//$(function () {
//    $("body").append(DroppyBox);
//});
//////////////////////////// notification /////////////////////////////////
//$(document).on("click", ".menu_icon", function (e) {
//    var selected = $(this);
//    // //alert(selected.attr('class'));
//    var x = e.pageX,
//            y = e.pageY;
//    size = $(window).width();
//    x -= 150;
//    // //alert(x);
////    if (size - x < 300) {
////        x -= 200;
////    }
//    DroppyBox.empty();
//    DroppyBox.hide();
//    if (selected.hasClass('messages')) {
//
//
//        $.get("http://192.168.0.102/medslat/dash/msgHistory", function (data) {
//            var new_data = JSON.parse(data);
//
//
//                $.each(new_data, function (id, ob) {
//                    DroppyBox.append(H_load_chat(ob));
//                });
//
//        });
//
//
////        for (var i = 0; i < 10; i++) {
////            DroppyBox.append('<div class="user_row" style="margin-left: 0px;"><div class="dp"></div><div class="sender">Dr. Hammed Wahill: ' + i + '</div><div class="message hidden-xs">Howdy: ' + i + '</div></div>')
////        }
//    }
//    if (selected.hasClass('notification')) {//notification
//        $.get("http://192.168.0.102/medslat/header/xhrgetNotification", function (data) {
//            var new_data = JSON.parse(data);
//            if (new_data.length > 0) {
//
//                $.each(new_data, function (id, ob) {
////                //alert(JSON.stringify(ob));
//                    DroppyBox.append(H_load_noft(ob));
//                });
//            }
//            else {
//                DroppyBox.append("No Notification Recieved");
//            }
//        });
//    }
//
//    DroppyBox.css({
//        "width": "300px",
//        "top": '60px',
//        "left": (x) + 'px'
//    });
//    DroppyBox.slideDown("slow");
//});
//
//function H_load_chat(data) {
//    var html = '<div class="chat-element">  \n\
//                  <div class="col-md-2 nopad">\n\
//                     <a href="#" class="pull-left img-responsive sender-img">   \n\
//                      <img alt="image" onError="this.src=\'http://192.168.0.102/medslat/public/images/user_icon.png\'"; class="img-thumbnail" src="http://192.168.0.102/medmedslat/' + data.profile_pix + '">\n\
//                     </a> \n\
//                 </div>                 \n\
//                 <div class="col-md-8 nopad chat-text">  \n\
//                 <span>' + data.fullname + '</span>                \n\
//                     <p class="m-b-xs  bg-light-blue bubble-chat" style="  background-color: rgba(255,255,255,.3);"> ' + data.message + '</p>  \n\
//                 </div>                \n\
//                 <div class="col-md-2 nopad">  \n\
//                 <div class="col-md-12 msg-reeader nopad ">   \n\
//                <small class="text-time">' + data.msg_date + '</small><br/><small class="text-time">' + data.msg_time + '</small>         \n\ ';
//    if (data.msgCounter > 0) {
//        html += '<div class=" text-navy circle-border">' + data.msgCounter + '</div>    \n\ ';
//    }
//
//    html += '</div>                                           \n\
//                <pola class="medid" id="' + data.UID + '">               \n\
//                  </pola>                 \n\
//                  <polb class="medid" id="' + data.fullname + '">               \n\
//                  </polb>                 \n\
//                <polc class="medid" id="' + data.specialty + '">               \n\
//            </div>     \n\
//            <pold class="medid" id="' + data.state + '">               \n\
//                  </pold>                 \n\
//                          </div>';
//    return html;
//}
//
//function H_load_noft(data) {
//    var html = '<div class="chat-eleme nt notification_item"  style="padding:5px" tpNtqrFctn="' + data.type + '" cdQlvnt="' + data.id_code + '">  \n\
//                  <div class="col-md-12 nopad">';
////                     <a href="#" class="pull-left img-responsive sender-img">   \n\
////                      <img alt="image" onError="this.src=\'http://192.168.0.102/medslat/public/images/user_icon.png\'"; class="img-thumbnail" src="http://192.168.0.102/medmedslat/' + data.profile_pix + '">\n\
////                     </a>                  \n\
////                 </div>                 \n\
//    html += ' <div class="col-md-8 nopad" style="margin-top:2px; color:darkcyan; font-weight:bold; font-size:13px;" >  \n\
//                 <span>' + data.notification_msg + '</span>                \n\
//                      \n\
//                 </div>                \n\
//                 <div class="col-md-4 nopad" style="float:right;">  \n\
//                 <div class="col-md-12 msg-reeader nopad" style="margin-top:2px;"  >   \n\
//                <small class="text-time" style="margin-top:5px; color:red;">' + data.not_date + '</small><br/><small class="text-time"  style="margin-top:5px; color:red;">' + data.not_time + '</small>         \n\        \n\
//                    \n\
//                 </div>                                           \n\
//                <pola class="medid" id="' + data.UID + '">               \n\
//                  </pola>                 \n\
//            </div>     \n\
//                          </div>';
//    return html;
//}
//
//http://192.168.0.102/medslat/dash/history
//
//        $(document).on('mouseleave', '.box', function () {
//    $('.box').fadeOut();
//});
/////////////////////////////// message /////////////////////////
////
////////////////////// user ////////////////////////
//$(document).on("click", ".user_row_h .dp", function (e) {
//    var x = e.pageX,
//            y = e.pageY;
//    size = $(window).width();
//    x -= 80;
//    var profile = '<div class="user_row" style="margin-left: 0px;"><div class="dp"></div><div class="me">Profile</div></div>';
//    //var out='<div class="user_row" style="margin-left: 0px;"><div class="signout">Logout</div></div>';
//    var out = '<a href="http://192.168.0.102/medslat/index/logout"><div class="signout user_row" style="margin-left: 0px;">Logout</div><a>';
//
//    DroppyBox.empty();
//    DroppyBox.hide();
//    DroppyBox.append(profile);
//    DroppyBox.append(out);
//    //DroppyBox.append(out);
//
//    DroppyBox.css({
//        "width": "180px",
//        "top": '50px',
//        "left": (x) + 'px'
//    });
//    DroppyBox.slideDown("slow");
//});
////$(document).on("click", ".signout", function (e) {
////    $.post("http://192.168.0.102/medslat/index/logout");
////    location.reload();
////});