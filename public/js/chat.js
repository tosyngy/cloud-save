var last_msg_id;
var senderid_;
var is_chatting = [];
var cur_con_code;
var recieverid_;
var doc = $("#receiver").val();
function loadhist() {
    cache_msg = [];
    $.post(URL + "dash/loaddocs", {empt: 'emp'}, function (res) {
        var obj = JSON.parse(res);
        $(".cht-body").empty();
        chatlist = obj;
        $.each(obj, function (key, data) {
            cache_msg[data.UID] = data.message;
            $(".cht-body").append(loadcht(data));
        });
        if (obj.length === 0) {
            $(".cht-body").empty();
            $(".cht-body").append("<div style='padding: 30px;' id='no_msg'><img  src='http://192.168.0.102/medslat/public/images/no_messages.png'></div>");
        }
    });
}
$(document).on('keyup', '.chat-search-txt', function () {
    if ($(".chat-search-txt").val() !== "") {
        var counter = 0;
        var newarr = [];
        $.each(chatlist, function (key, data) {
            if (data.fullname.toLowerCase().indexOf($(".chat-search-txt").val().toLowerCase()) > -1) {
                newarr[counter] = data;
                counter++;
            }
        });
        $(".lf-search_result").empty();
        if (newarr.length < 1) {
            $(".lf-search_result").append("No Macth found");
        }
        $.each(newarr, function (id, ob) {
            $(".lf-search_result").append(load_side_his(ob));
        });
    } else {
        $(".lf-search_result").empty();
        $.each(chatlist, function (id, ob) {
            $(".lf-search_result").append(load_side_his(ob));
        });
    }

});
function load_side_his(data) {
    var html;
    var img = '<img alt="image" onError="this.src=\'http://192.168.0.102/medslat/public/images/user_icon.png\'"; ' +
            'class="img-circle"style="padding: 0px;" src="http://192.168.0.102/medmedslat/' + data.profile_pix + '">';
    html = "<div class='user_row se-re col-xs-12'>" +
            "<div class='se-re-dp dp'>" + img + "</div>" +
            "<div class='name'>" + data.fullname + "</div>" +
            "<div class='message' id='msg_cnt2_" + data.UID + " col-xs-12'>" + data.message + "</div>" +
            "<div class='col-md-2 nopad'>" +
            "<pola class='medid' id='" + data.UID + "'></pola>" +
            "<polb class='medid' id='" + data.fullname + "'></polb>" +
            "<polc class='medid' id='" + data.speciality + "'></polc>" +
            "<pold class='medid' id='" + data.state + "'></pold></div>" +
            "</div>";
    return html;
}
function load_chat(data) {
    var html = "<div class='chat-element'>" +
            "<div class='col-md-2 nopad'>" +
            "<a href='#' class='pull-left img-responsive sender-img'>" +
            "<img alt='image' onError='this.src=\"http://192.168.0.102/medslat/public/images/user_icon.png\"'   " +
            "class='img-circle' src='http://192.168.0.102/medmedslat/" + data.profile_pix + "'>" +
            "</a> " +
            "</div>" +
            "<div class='col-md-10'>" +
            "<div class='col-md-12 nopad chat-text'>" +
            "<div class='col-md-9 nopad'>" +
            "<span>" + data.fullname + "</span>" +
            " </div>" +
            "<div class='col-md-3 nopad'>" +
            "<div class='text-time float-right nopad text-right'>" + data.msg_date + "</div>" +
            "</div>" +
            "</div>" +
            "<div class='col-md-12 nopad pad-top'>" +
            "<div class='col-md-12 msg-reeader nopad '>" +
            "<div class='col-md-11 nopad inline-word'>" +
            "<span class='m-b-xs  bubble-chat ' id='msg_cnt_" + data.UID + "'>" + data.message + "</span>" +
            "</div>" +
            "<div class='col-md-1 nopad'>" +
            "<div class=' text-navy circle-border float-right' id='ou_msg_" + data.UID + "'>1</div>" +
            "</div>" +
            "</div> " +
            " </div>" +
            "<pola class='medid' id='" + data.UID + "'> " +
            "</pola> " +
            "<polb class='medid' id='" + data.fullname + "'>" +
            "</polb>" +
            "<polc class='medid' id='" + data.speciality + "'>" +
            "</polc>  " +
            "<pold class='medid' id=" + data.state + "> " +
            "</pold> " +
            "</div>";
    return html;
}

function loadcht(obj) {
    return  load_chat(obj);
}

//side chat changer;
$(document).on('click', ".se-re", function () {

    var person = $(this).find("pola").attr("id");
    var person_name = $(this).find("polb").attr("id");
    var person_sp = $(this).find("polc").attr("id");
    var person_state = $(this).find("pold").attr("id");
    var dp = $(this).find(".se-re-dp img").attr("src");
    current_chat_pic = dp;
    current_chatting = person;
    current_chat_fn = person_name;
    current_chat_sp = person_sp;
    current_chat_state = person_state;
    isconsulting();
    loadchat();
    loadchatDetails();

});
function chathistory() {
    var counter = 0;
    $.get("http://192.168.0.102/medslat/dash/history/", function (data) {
        var new_data = JSON.parse(data);
        $.each(new_data, function (id, ob) {
            if (counter === 0) {
                counter + 1;
            }
            $(".consult-list").append(chatHistryHtml(ob));
        });
    });
}
function getfirschat(data) {
    var sender = data.user1id;
    if ($("#user_id").val() !== data.user2id) {
        sender = data.user2id;
    }
    return sender;
}

function chatHistryHtml(data) {
    var sender = data.user1id;
    if ($("#user_id").val() !== data.user2id) {
        sender = data.user2id;
    }
    is_chatting.push(sender);
    var html = '<div class="single-list sin-list " id="sng_' + sender + '">' +
            '<div style="display: none;"><concode>' + data.con_code + '</concode> </div>' +
            '<div class="single-list-other-img">' +
            '<img onError="this.src=\'http://192.168.0.102/medslat/public/images/user_icon.png\'"; ' +
            'src="http://192.168.0.102/medmedslat/' + data.profile_pix + '" class="other-img-logo" height="40" width="40">' +
            '</div>' +
            '<div class="single-list-other-details">' +
            '<span class="single-list-other-name">' + data.Uname + '</span><br>' +
            '<span class="other-address">' + data.message + '</span>' +
            '</div>' +
            '</div>';
    return html;
}

function loadchat(recp) {
    $(".chat_msg").empty();
    var sender;
    var reciever;
    var history;
    var me;
    sender = $("#user_id").val();//"tosyngy";//;
    reciever = current_chatting;//recp;//"chichi";//$("#receiver").val();

    $.post("http://192.168.0.102/medslat/messages/xhrloadPrevMsg", {user1id: sender, user2id: reciever}, function (resp) {
        history = resp; //response from url post 
        console.log(history);
        console.log("sender id=" + sender);
        console.log("reciever=" + reciever);
        if (history.lenght === 0) {
            return;
        }
        var lupus = JSON.parse(history);

        if (lupus.lenght === 0) {
            alert(lupus.length);
            appendmsg(lupus, sender, reciever);
        } else {
            appendmsg(lupus, sender, reciever);
        }

    });
    $('#chat_msg').scrollTop($('#chat_msg')[0].scrollHeight);
    $('#chat_msg').scrollTop($('#chat_msg')[0].scrollHeight);
    infinityChat();
    $(document).ready(function () {
        $('#chat_msg').scrollTop($('#chat_msg')[0].scrollHeight);
    });
}
function loadchatDetails() {
    $(".mydp-img").attr("src", $(".user_row_h img").attr("src"));
    $(".dp-big-name").text(current_chat_fn);
    $(".dp-big-sp").text(current_chat_sp);
    $(".dp-big-img").attr("src", current_chat_pic);
    $(".rating").remove();
    $(".dp-big-sp").remove();

    if (current_chat_state === 1 || current_chat_state === 6) {

        $.get("http://192.168.0.102/medslat/rating/xhrgetrating/" + current_chatting, function (data) {

            $(".dp-b-de .user-status").before('<div class="profession dp-big-sp" style="font-weight: bold;">' + current_chat_sp + '</div>' + data);
        });
    }
    $.get("http://192.168.0.102/medslat/dash/msgHistory", function (data) {
        var new_data = JSON.parse(data);
        $(".lf-search_result").empty();
        $.each(new_data, function (id, ob) {
            $(".lf-search_result").append(load_side_his(ob));
        });
    });
}
function isconsulting() {

    if ($('#user_st').val() === '1') {
        if (current_chatting) {
            $.get("http://192.168.0.102/medslat/chatModule/isconsulting/" + current_chatting, function (data) {

                if (data !== "no") {
                    $('.tool_cont_').remove();
                    $('.bottom_left').prepend(data);
                } else {
                    $('.tool_cont_').remove();
                }
            }); 
        } 

    } else {

    }
}
$("#video").click(function (e) {
    e.preventDefault();
    //alert("video call");
    $.post("http://192.168.0.102/medslat/messages/video", {receiver: doc, r_uid: $("#receiver_id").val(), vid_type: "sender"}, function (resp) {
        $('#app_').empty();
        $('#app_').append(resp);
        $('#app_').fadeIn("slow");
    });
});
function appendmsg(lupus, sender, reciever) {
    var time1 = new Date();
    var goh = time1.getFullYear() + "-" + "0" + (time1.getMonth() + 1) + "-" + time1.getDate();
    var last = lupus[0]['msg_date'];
    var ispaeen = 0;
    $.each(lupus, function (senderidlast, data) {
        last_msg_id = data.id;
        var me = "me";
        var you = "you";
        var user1 = data.user1id;
        var user2 = data.user2id;
        if (ispaeen !== 0) {
            if (last !== data.msg_date) {
                console.log(last + ">>><<<" + goh);
                if (goh === last) {
                    var string = "Today";
                    $('#chat_msg').prepend($('<div class="one_in" form_val="gdgdf">             <div style="text-align: center;" class="">                 <div class="bubble bubble-text">                     <div class="message-text" style="">                         <div class="msg_date" dir="auto">' + string + '</div>                     </div> <div class="message-out-meta-data"></div></div></div>         </div>'));
                } else {
                    $('#chat_msg').prepend($('<div class="one_in" form_val="gdgdf">             <div style="text-align: center;" class="">                 <div class="bubble bubble-text">                     <div class="message-text" style="">                         <div class="msg_date" dir="auto">' + last + '</div></div> <div class="message-out-meta-data"> </div>                </div>             </div>         </div>'));
                }
                last = data.msg_date;
            }
        }
        ispaeen = 1;
        var desArry = data.msg_time.split(":");
        console.log("na my spling be this ooo =" + desArry[1]);
        var gettotime = desArry[0];
        var gettotime1 = desArry[1];
        console.log("getting  my spling this is it = " + gettotime + ":" + gettotime1);
        var gettotimeans = gettotime + ":" + gettotime1;
        console.log("intinnnntg<><><><>< " + gettotimeans);
        if (me == user1 || you == user2) {//checking for where to place the message

            if (data.message.indexOf("form_") >= 0) {
                $('#chat_msg').prepend($('<div class="msg_row outgoing  col-xs-12"  form_val="' + data.message + '"><div class="message col-xs-9 col-xs-offset-3"><div class="msg_txt  col-xs-12 bg-light-green ">        <span class="selectable-text emojitext" dir="auto" >' + "Form Sent " + '</span>               </div><div class="msg_status">12:24</div></div></div>'));
            } else {
                $('#chat_msg').prepend($(' <div class="msg_row outgoing col-xs-12"><div class="message col-xs-9 col-xs-offset-3"><div class="msg_txt col-xs-12 bg-light-green">' + data.message + '</div><div class="msg_status">' + gettotimeans + '</div></div></div>'));
            }
            // code to be executed if condition is true
        }
        else {
            if (data.message.indexOf("form_") >= 0) {
                $('#chat_msg').prepend($(' <div class="msg_row incomming col-xs-12 " sym_num="' + data.message + '"><div class="message col-xs-8 col-xs-offset-3"><div class="msg_txt col-xs-12 bg-blue"><div class="msg-attach"><div class="msg-attach-img"><img style="height: 30px; width: 30px;" src="http://192.168.0.102/medslat/public/images/attach.png"></div><div class="msg-attach-name" >              <div class="respon-to-sym"> <span class="ask-sym-pat-icon"><img class="give-sym" src="http://192.168.0.102/medslat/public/images/ask-sym.png" alt=""/> </sapn> <span class="selectable-text emojitext" dir="auto" >' + 'Please Click here to tell me how you are feeling' + '</span>  </div>                   </div></div></div><div class="msg_status">12:12</div></div></div></div>'
                        ));
            } else {
                $('#chat_msg').prepend($('<div class="msg_row incomming col-xs-12 "><div class="message  col-xs-8 col-xs-offset-3"><div class="msg_txt col-xs-12 bg-blue">' + data.message + '</div><div class="msg_status">' + gettotimeans + '</div></div></div>'));

            }


        }



    });
}
function randomString() {
    var strChars = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz';
    var strRandomstring = '';
    for (var intCounterForLoop = 0; intCounterForLoop < 12; intCounterForLoop++) {
        var rnum = Math.floor(Math.random() * strChars.length);
        strRandomstring += strChars.substring(rnum, rnum + 1);
    }
    return strRandomstring;
}
$(document).on("click", ".control", function () {
    $(this).siblings().removeClass("current");
    $(this).addClass("current");
});
//inifinty 
var loading = false;
function infinityChat() {
    $('#chat_msg').scroll(function () {
        var sender = $("#user_id").val();//"tosyngy";//;
        var reciever = current_chatting;//"chichi";//$("#receiver").val();
        var curscroll = $(this).scrollTop();
        var maxscroll = $(this)[0].scrollHeight - $(this).height();
        if ((curscroll <= ((0.1 * maxscroll))) && loading == false) {
            loading = true;
            $('#chat_msg').prepend('<div id="loading">loading...</div>');
            $.post("http://192.168.0.102/medslat/messages/xhrloadMorePrevMsg", {user1id: sender, user2id: reciever, last_msg_id: last_msg_id}, function (resp) {
                var new_data = JSON.parse(resp);
                if (new_data.length === 0) {
                    $('#loading').remove();
                    loading = true;
                    $('#chat_msg').prepend('<div id="loading">no more</div>');
                } else {
                    var history = resp;
                    var lupus = JSON.parse(history);

                    if (lupus.length !== 0) {

                        appendmsg(lupus, sender, reciever);
                    }

                    $('#chat_msg').scrollTop($('#chat_msg')[0].scrollHeight - (0.7 * $('#chat_msg')[0].scrollHeight));
                    loading = false;
                    $("#loading").remove();
                }
            });
        }
    });
}

