var DroppyBox = $('<div class="box" style="z-index:1999; top:100%;"></div>');
$(function () {
    $("body").append(DroppyBox);
});
////////////////////////// notification /////////////////////////////////
$(document).on("click", ".menu_icon", function (e) {
    var selected = $(this);
    // //alert(selected.attr('class'));
    var x = e.pageX,
            y = e.pageY;
    size = $(window).width();
    x -= 150;
    // //alert(x);
//    if (size - x < 300) {
//        x -= 200;
//    }
    DroppyBox.empty();
    DroppyBox.hide();
    if (selected.hasClass('messages')) {


        $.get("http://192.168.0.102/medslat/dash/history", function (data) {
            var new_data = JSON.parse(data);


            $.each(new_data, function (id, ob) {
                DroppyBox.append(H_load_chat(ob));
            });

        });


//        for (var i = 0; i < 10; i++) {
//            DroppyBox.append('<div class="user_row" style="margin-left: 0px;"><div class="dp"></div><div class="sender">Dr. Hammed Wahill: ' + i + '</div><div class="message hidden-xs">Howdy: ' + i + '</div></div>')
//        }
    }
    if (selected.hasClass('notification')) {//notification
        for (var i = 0; i < 10; i++) {
            DroppyBox.append('<div class="user_row" style="margin-left: 0px;"><div class="dp"></div><div class="sender">Dr. Hammed Wahill: ' + i + '</div><div class="message hidden-xs">Howdy: ' + i + '</div></div>')
        }
    }
    DroppyBox.css({
        "width": "300px",
        "top": '60px',
        "left": (x) + 'px'
    });
    DroppyBox.slideDown("slow");
});


function H_load_chat(data) {
    var html = '<div class="chat-element">  \n\
                  <div class="col-md-2 nopad">\n\
                     <a href="#" class="pull-left img-responsive sender-img">   \n\
                      <img alt="image" onError="this.src=\'http://192.168.0.102/medslat/public/images/user_icon.png\'"; class="img-thumbnail" src="http://192.168.0.102/medmedslat/' + data.profile_pix + '">\n\
                     </a>                  \n\
                 </div>                 \n\
                 <div class="col-md-8 nopad chat-text">  \n\
                 <span>' + data.fullname + '</span>                \n\
                     <p class="m-b-xs  bg-light-blue bubble-chat" style="  background-color: rgba(255,255,255,.3);"> ' + data.message + '</p>  \n\
                 </div>                \n\
                 <div class="col-md-2 nopad">  \n\
                 <div class="col-md-12 msg-reeader nopad ">   \n\
                <small class="text-time">' + data.msg_date + '</small>         \n\
                <div class=" text-navy circle-border">1</div>    \n\
                 </div>                                           \n\
                <pola class="medid" id="' + data.UID + '">               \n\
                  </pola>                 \n\
            </div>     \n\
                          </div>';
    return html;
}

$(document).on('mouseleave', '.box', function () {
    ////alert(1);
    $('.box').fadeOut();
});
///////////////////////////// message /////////////////////////

//////////////////// user ////////////////////////
$(document).on("click", ".dp", function (e) {
    var x = e.pageX,
            y = e.pageY;
    size = $(window).width();
    x -= 80;
    var profile = '<div class="user_row" style="margin-left: 0px;"><div class="dp"></div><div class="sender">Profile</div></div>';
    var user = '<div class="user_row" style="margin-left: 0px;"><div class="dp"></div><div class="sender">Settings</div></div>';
    var out = '<div class="user_row" style="margin-left: 0px;"><div class="dp"></div><div class="sender">Log Out</div></div>';

    DroppyBox.empty();
    DroppyBox.hide();
    DroppyBox.append(profile);
    DroppyBox.append(user);
    DroppyBox.append(out);

    DroppyBox.css({
        "width": "180px",
        "top": '60px',
        "left": (x) + 'px'
    });
    DroppyBox.slideDown("slow");
});