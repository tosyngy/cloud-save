var mech_id = -1; // Wasiu Modifier 25-06-2015
var is_consulting_name = "";
var form_id = "";
//Wasiu's Scripting Dont Touch or else for Good
$(function () {

    loadshots();
    /* Search */
    $(document).on("keyup", ".srchdoc", function () {
        var srch = $(".srchdoc").val();
        var fltr = "specialty";//$("#srchflt").val();
        $.post(URL + "dash/loaddocs", {src: srch, flt: fltr}, function (resa) {
            var obj = JSON.parse(resa);
            $(".doc-list").empty();
            $.each(obj, function (key, data) {
                $(".doc-list").append(displaydocs(data));
            });
            if (obj.length === 0 || srch.length === 0) {
                $(".doc-list").empty();
                $(".doc-list").append("<div id='doclist'>No Match Found</div>");
            }
        });
    });

    $(document).on("keyup", "#srchflt", function () {

        var srch = $("#srch").val();
        var fltr = $("#srchflt").val();
        $.post(URL + "dash/loaddocs", {src: srch, flt: fltr}, function (resa) {
            var obj = JSON.parse(resa);
            $("#loaddoc").empty();
            $.each(obj, function (key, data) {
                $("#loaddoc").append(displaydocs(data));
            });
            if (obj.length === 0 || srch.length === 0) {
                $("#loaddoc").empty();
                $("#loaddoc").append("<div id='doclist'>No Match Found</div>");
            }
        });
    });
    /* End Search */
    $(document).on("click", ".doclist", function () {

        var id = $(this).children('.subdata').find("polo").attr('id');
        var uname = $(this).children('.subdata').find("polo").attr('rel_un');


        //    Wasiu Modified 21-06-2015 Replace   
        $(".consult_doc").attr('id', id);
        $(".consult_doc").attr('rel_un', uname);
        $.post(URL + "dash/loaddocs", {gprof: id}, function (resa) {
            var obj = JSON.parse(resa);
            $.each(obj, function (key, data) {
                $(".name_profile_page").text(data.firstname + " " + data.lastname);
                $(".location_profile_page").text(data.speciailty);
                $(".phone_profile").text(data.data.mobile + ' ' + data.landline + ' ' + data.officeMobile);
                $(".gender_profile").text(data.genda);
                $(".address_profile").text(data.homeAddress);
                $(".state_profile").text(data.state);
                $(".country_profile").text(data.country);
            });
        });
    });
//    End Wasiu Modified 21-06-2015
    $(document).on('click', '.consult_doc', function (e) {

        current_chatting = $(".consult_doc").attr('id');
        is_consulting_name = $(".consult_doc").attr('rel_un');
        $(".c-status").html("<div>You are trying to consult a doctor that charge $10 for consultation \n\n\
                the equivalent will be charge in your wallet, do you which to continue? <span class='yes_consult'><a href=''>YES</a></span> <span class='no_consult'><a href=''>NO</a></span></div>");

    });

    $(document).on('click', '.no_consult', function (e) {
        e.preventDefault();
        $(".c-status").empty();
    });



});

//My Modifier 25-06-2015
$(".btnsy").click(function () {
    if ($(".insy").val() === '') {
    } else {
        $(".propsy").append('<spam class="sy_spm">' + $(".insy").val() + ',</spam>');
        $(".insy").val('');
    }
});
$("#symptoms").click(function () {
    if ($(".insy").val() === '') {
    } else {
        $(".propsy").append('<spam class="sy_spm">' + $("#symptoms").val() + ',</spam>&nbsp;');
        $(".insy").val('');
    }
});
$(document).on("click", ".fillfrm", function () {

    var num_arry = $(this).attr("sym_num").split("_");
    form_id = num_arry[1];
    var url = URL + "symtoms/xhrverify/";
    $.post(url, {id_sym: num_arry[1]}, function (res) {


        if (res === "active") {
            $(".mysymp1").show();
            $(".propsy").empty();
            $("#symptoms").empty();

            $.post(URL + "dash/loaddocs", {sym: 'sy'}, function (res) {
                var obj = JSON.parse(res);
                $.each(obj, function (key, data) {
                    $("#symptoms").append('<option value="' + data.name + '">');
                });
            });
        } else {
            //alert("The request has expired");
        }




    });


});
$(".savesy").click(function () {
    var cnf = confirm('Is that all the symptoms?');
    if (cnf === true) {
        $(".mysymp1").hide();
        //alert($(".propsy").text());
        $.post(URL + "symtoms/xhrupdatesym", {doc_id: current_chatting, pant_id: sender, pantsym: $(".propsy").text(), id_sym: form_id}, function (res) {
            //alert("akin-> " + res);
            var out = {
                message: "formres_" + form_id,
                user1id: sender,
                user1un: sender_name,
                user2id: current_chatting,
                //user2un: reciever,
                status: 0,
                time: ""
            };
            console.log("sending resym" + form_id);
            iosocket.emit("resypm", out);
            console.log("sent resym" + out);
        });
    } else {
    }
});
$(".mysymp1").hide();
//End My Modifier 25-06-2015


function newCHat() {

    is_chatting.push(current_chatting);
    var html = '<div class="single-list sin-list " id="sng_' + current_chatting + '"> \n\
                   <div class="single-list-other-img">\n\
                   <img src=URL+"views/header/imgs/hospital2.png" class="other-img-logo" height="40" width="40"> \n\
                   </div>                                        \n\
                   <div class="single-list-other-details">\n\
                   <span class="single-list-other-name">' + is_consulting_name + '</span><br>\n\
                   <span class="other-address">Hello Doctor! I will like to...</span>  \n\
                   </div>                                    </div>';
    return html;
}


//Modified 2

$(document).on("click", ".chttrg", function () {
    var patientid = $(this).children().children(".imag-txt").find("pola").attr('id');
    //alert(patientid);
});
$(document).on("click", ".imag", function () {
    var patientid = $(this).parent().children(".imag-txt").find("pola").attr('id');
    //alert(patientid);
});
// End Modified 2

function loadshots() {

    $.post("http://192.168.0.102/medslat/dash/loaddocs", {fgodoc: 'hj'}, function (res) {

        var obj = JSON.parse(res);
        $(".other-wrappers").empty();
        $.each(obj, function (key, data) {

            $(".other-wrappers").append(firstshot(data));

        });
        if (obj.length === 0) {
            $(".other-wrappers").empty();
            $(".other-wrappers").append("<div id='doclist'>No Match Found</div>");
        }
    });
}

function firstshot(obj) {
    var html =  "<div class='other-list' id='doc'>" +
            "<div class='other-element'>" +
            "<div class='col-md-3 col-sm-3 col-xs-3 nopad'>" +
            "<a href='#' class='pull-left img-responsive sender-img'>" +
            " <img alt='image'  onerror="+'"'+"this.src='http://192.168.0.102/medslat/public/images/user_icon.png'"+'"'+"  class='img-circle' src='http://192.168.0.102/medmedslat/" + obj.profilepix + "'>" +
            "  </a>  " +
            "  </div>" +
            " <div class='col-md-9 nopad chat-text'>" +
            "<div class='col-md-12 nopad'> <span>"
            + obj.firstname + ' ' + obj.lastname +
            "</span>" +
            "</div>" +
            "<div class='col-md-6 nopad'>" +
            " <p class='m-b-xs  bubble-chat'>" + obj.state + "</p> " +
            " </div>" +
            "<div class='col-md-6 nopad'>" +
            "<button class='view-p'>view profile</button>" +
            " </div>" +
            " <pola class='medid' id="+obj.uid+">" +
            "</pola>" +
            "  </div>" +
            "  </div>" +
            "</div>";

    return html;
}
function load_default_doc() {
    $.post(URL + "dash/loaddocs", {godoc: 'hh'}, function (res) {
        var obj = JSON.parse(res);
        $("#loaddoc").empty();
        $.each(obj, function (key, data) {
            $("#loaddoc").append(displaydocs(data));
        });
        if (obj.length === 0) {
            $("#loaddoc").empty();
            $("#loaddoc").append("<div id='doclist'>No Match Found</div>");
        }
    });
}

function displaydocs(obj) {
    var html = "<div class='doclist'>" +
            "<div id='pict'>" +
            "<img   onerror='this.src=&quot;http://192.168.0.102/medslat/public/images/user_icon.png&quot;'  src='http://192.168.0.102/medslat/public/images/People-Doctor-Male-icon.png' class='img-responsive img-circle imgpic' id=''/>" +
            "</div>" +
            "<div class='subdata'><polo rel_un ='" + obj.username + "' id='" + obj.uid + "'/>" +
            "<h5 class='stretch'>" + obj.firstname + " " + obj.lastname + ", <br/>" + obj.street + " " + obj.state + " " + obj.country + ",<br/> " + obj.specialty + "</h5>" +
            "</div>" +
            "</div><div class='well-sm'></div>";
   
    return html;
}
//Modified 2

//function loadhist() {
//    $.post(URL+"dash/loaddocs", {empt: 'emp'}, function (res) {
//        var obj = JSON.parse(res);
////       //alert(res);
//        $(".cht-body").empty();
//        $.each(obj, function (key, data) {
//            $(".cht-body").append(loadcht(data));
//        });
//        if (obj.length === 0) {
//            $(".cht-body").empty();
//            $(".cht-body").append("<div id='doclist'>No Match Found</div>");
//        }
//    });
//}
//function load_chat(name,msg,type,uid,time){
//       var   html ="<div class='chat-element'>"+
//                        "<a href='#' class='pull-left'><img alt='image' class='img-circle' src='http://192.168.0.102/medslat/views/header/imgs/prof.png'>"+
//                        "</a> <div class='media-body '> <pola class='medid' id='" + uid + "'/></div></a><small class='pull-right text-navy'>1m ago</small>"+
//                            "<strong>" + name +"</strong><p class='m-b-xs  bg-light-blue bubble-chat' style='  background-color: rgba(255,255,255,.3);'> " + msg
//                           + "<small class='text-muted'>"+time+"</small></p>  </div>";
//                   return html;
//}
//
//function loadcht(obj) {
//    var html = "";
//    return  load_chat(obj.fullname ,obj.message,"patient", obj.UID,obj.time  )
//    
////    if (obj.state === 2 || obj.state === '2') {
////    
//////        var html = "<li class='cht-pat chttrg dropdown'>" +
//////                "<a class='dropdown-toggle' data-toggle='dropdown' href='#'><div class='imag'>" +
//////                "<img class=' img-circle mmgg' src='http://192.168.0.102/medslat/views/header/imgs/prof.png'/>" +
//////                "</div>" +
//////                "<div class='imag-txt'><span class='text-success'>&clubs;</span>" +  +
//////               
//////                "<ul class='dropdown-menu showul'>" +
//////                "<li class='profpic'><img class=' img-circle' src='http://192.168.0.102/medslat/views/header/imgs/prof.png'/></li>" +
//////                "<li><b>Name:</b><br/> " +  + "</li>" +
//////                "<li><b>Genotype:<b/> " + obj.genotype + "</li>" +
//////                "<li><b>Blood Group:</b> " + obj.bloodgroup + "</li>" +
//////                "<li><b>Location:<b/> " + obj.location + "</li>" +
//////                "<li><b>Last Message:</b> " ++ "</li>" +
//////                "</ul>" +
//////                "</li>";
////    } else if (obj.state === 1 || obj.state === '1') {
//////        var html = "<li class='cht-doc chttrg dropdown'>" +
//////                "<a class='dropdown-toggle' data-toggle='dropdown' href='#'><div class='imag'>" +
//////                "<img class=' img-circle mmgg' src='http://192.168.0.102/medslat/views/header/imgs/prof.png'/>" +
//////                "</div>" +
//////                "<div class='imag-txt'><span class='text-success'>&clubs;</span>" + obj.Uname +
//////                "<pola class='medid' id='" ++ "'/></div></a>" +
//////                "<ul class='dropdown-menu showul'>" +
//////                "<li class='profpic'><img class=' img-circle' src='http://192.168.0.102/medslat/views/header/imgs/prof.png'/></li>" +
//////                "<li><b>Name:</b><br/> " + obj.fullname + "</li>" +
//////                "<li><b>Specialty:<b/> " + obj.specialty + "</li>" +
//////                "<li><b>Location:<b/> " + obj.location + "</li>" +
//////                "<li><b>Last Message:</b> " + obj.message + "</li>" +
//////                "</ul>" +
//////                "</li>";
////           html ="<div class='chat-element'>"+
////                        "<a href='#' class='pull-left'><img alt='image' class='img-circle' src='http://192.168.0.102/medslat/views/header/imgs/prof.png'>"+
////                        "</a> <div class='media-body '> <small class='pull-right text-navy'>1m ago</small>"+
////                            "<strong>" + obj.Uname +"</strong><p class='m-b-xs bg-voilet'> " + obj.message
////                           + "<small class='text-muted'>Today 4:21 pm - 12.06.2014</small> </p> </div> </div>";
////    } else if (obj.state === 6 || obj.state === '6') {
////    html ="<div class='chat-element right'><a href='#' class='pull-right'> <img alt='image' class='img-circle' src='http://192.168.0.102/medslat/public/img/9.jpg'>"+
////                       " </a><div class='media-body text-right '><small class='pull-left'>5m ago</small> <strong>" + obj.Uname +"</strong>  <p class='m-b-xs bg-voilet'>"+
////                                obj.message +"  <small class='text-muted'>Today 4:21 pm - 12.06.2014</small></p>  </div></div>";
//////        var html = "<li class='cht-nrs chttrg dropdown'>" +
//////                "<a class='dropdown-toggle' data-toggle='dropdown' href='#'><div class='imag'>" +
//////                "<img class=' img-circle mmgg' src='http://192.168.0.102/medslat/views/header/imgs/prof.png'/>" +
//////                "</div>" +
//////                "<div class='imag-txt'><span class='text-success'>&clubs;</span>" + obj.Uname +
//////                "<pola class='medid' id='" + obj.UID + "'/></div></a>" +
//////                "<ul class='dropdown-menu showul'>" +
//////                "<li class='profpic'><img class=' img-circle' src='http://192.168.0.102/medslat/views/header/imgs/prof.png'/></li>" +
//////                "<li><b>Name:</b><br/> " + obj.fullname + "</li>" +
//////                "<li><b>Specialty:<b/> " + obj.specialty + "</li>" +
//////                "<li><b>Location:<b/> " + obj.location + "</li>" +
//////                "<li><b>Last Message:</b> " + obj.message + "</li>" +
//////                "</ul>" +
//////                "</li>";
////    }
////    return html;
//}
//// Wasiu Modified 21-06-2015
function  getchtprof(input) {
    $.post(URL + "dash/loaddocs", {gprof: input}, function (resa) {
        var obj = JSON.parse(resa);
        $.each(obj, function (key, data) {
            var behave = data.mestate;
            var back_state = data.userstate;
            $('.dp_profile_page').attr('src', 'http://192.168.0.102/medmedslat/' + data.profilepix);
            if (back_state === 1) {
                $(".name_profile_page_left").text(data.firstname + " " + data.lastname);
                $(".phone_profile_left").text(data.mobile + ' ' + data.landline + ' ' + data.officeMobile);
                $(".gender_profile_left").text(data.genda);
                $(".address_profile_left").text(data.homeAddress);
                $(".state_profile_left").text(data.state);
                $(".country_profile_left").text(data.country);
                $(".city_profile_left").text(data.city);
                $(".email_profile_left").text(data.email);
                $(".blood_profile_left").text(data.bloodgroup);
                $(".genotype_profile_left").text(data.genotype);
                if (behave === 2) {
                    $(".occupation_profile_left").text(data.occupation);
                } else if (behave === 1) {
                    $(".occupation_profile_left").text('Doctor (' + data.speciality + ')');
                } else if (behave === 6) {
                    $(".occupation_profile_left").text('Nurse (' + data.speciality + ')');
                }
            } else if (back_state === 2) {
                $(".name_profile_page_left").text(data.firstname + " " + data.lastname);
                $(".phone_profile_left").text(data.mobile + ' ' + data.landline + ' ' + data.officeMobile);
                $(".gender_profile_left").text(data.genda);
                $(".address_profile_left").text(data.homeAddress);
                $(".state_profile_left").text(data.state);
                $(".country_profile_left").text(data.country);
                $(".city_profile_left").text(data.city);
                $(".email_profile_left").text(data.email);
                $(".location_profile_page_left").text(data.speciality);
            } else if (back_state === 6) {
                //alert('waiting for nurse table');
            }
        });

    });
}
//End  Wasiu Modified 21-06-2015
// End Modified 2
//End of Wasiu's Scripting


$(function () {
//triprofile 
    $('.triconsult').click(function (e) {
        $("#consltShow").modal("show");
        $("#ProfShow").modal("hide");
        $("#WallShow").modal("hide");
        e.preventDefault();
    });
    $('.triprofile').click(function (e) {
        $("#ProfShow").modal("show");
        $("#consltShow").modal("hide");
        $("#WallShow").modal("hide");
        e.preventDefault();
    });
    $('.triwallet').click(function (e) {
        $("#WallShow").modal("show");
        $("#ProfShow").modal("hide");
        $("#consltShow").modal("hide");
        e.preventDefault();
    });
});

//(function () {
//
//    // store the slider in a local variable
//    var $window = $(window), flexslider;
//
//    // tiny helper function to add breakpoints
//    function getGridSize() {
//        return (window.innerWidth < 300) ? 2 : (window.innerWidth < 450) ? 3 : 5;
//    }
//
//    $(function () {
//        //SyntaxHighlighter.all();
//    });
//
//    $window.load(function () {
//
//    });
//
////    $window.load(function() {
////        $('.flexslider.test').flexslider({
////            direction: "horizontal",
////            slideshow: false,
////            animation: "slide",
////            animationSpeed: 400,
////            animationLoop: false,
////            itemWidth: 300,
////            itemMargin: 5,
////            minItems: getGridSize(), // use function to pull in initial value
////            maxItems: getGridSize() // use function to pull in initial value
////
////        });
////    });
//
//
//    // check grid size on resize event
//    $window.resize(function () {
//        var gridSize = getGridSize();
//
//        flexslider.vars.minItems = gridSize;
//        flexslider.vars.maxItems = gridSize;
//    });
//}());



$(document).on('click', '.consult-right', function () {

    $(this).removeClass("col-md-3").addClass("col-md-9").siblings().addClass("col-md-3");

});
$(document).on('click', '.consult-left', function () {
    $(this).removeClass("col-md-3").addClass("col-md-9").siblings().addClass("col-md-3");
});
$(document).on('click', '.single-list', function (e) {
    var id_arr = ($(this).attr("id")).split("_");
    current_chatting = id_arr[1];
    cur_con_code = $(this).find('concode').text();
    mech_id = current_chatting;// My Modifier 25-06-2015
    getchtprof(current_chatting);// Wasiu Modified 21-06-2015
    loadchat();//this is the method that load the chat
});


//vicsoft Script start here ..

$(function () {
    // //alert("ghgfhdfgh")
    $('.nurfrombydateref').datepicker({dateFormat: 'dd.mm.yy'});
    $('.nurtobydateref').datepicker({dateFormat: 'dd.mm.yy'});
});

$('#nurselectbydate').click(function (e) {
    e.preventDefault();
    if ($('.nurfrombydateref').val() == "" || $('.nurtobydateref').val() == "") {
        //alert("please select date ");
        return;
    }

    conDate = $('.nurfrombydateref').val() + '_' + $('.nurtobydateref').val();
    var url3 = 'http://192.168.0.102/medslat/dash/refrence_historys/' + $('.nurfrombydateref').val() + '_' + $('.nurtobydateref').val();
    $.get(url3, function (data) {

        var new_data = JSON.parse(data);
        $('.nurrefrencetbody').empty();
        if (new_data == "") {

            $('.nurrefrencetbody').append(emptysearch());
        }
        else {
            $.each(new_data, function (id, ob) {
                $('.nurrefrencetbody').append(nurformFrHis(ob));
            });
        }

    });
});

$(document).on('click', ".no_loadvouch", function (e) {
    e.preventDefault();
    $(".fund-voucher-notice").text("");
    $(".funding-reps").html();

});
$(document).on('click', ".testProf", function (e) {

    e.preventDefault();
    $("div[rel_div=3]").trigger("click");

});
$(document).on('click', ".testWallet", function (e) {

    e.preventDefault();
    $("div[rel_div=4]").trigger("click");

});
$(document).on('click', ".testRef", function (e) {

    e.preventDefault();
    $("div[rel_div=2]").trigger("click");

});
function nurformFrHis(ob) {

    var html = " <tr id='pat_" + ob.refCode + "_" + ob.patient_id + "'>\n\
                      <td>" + ob.doctor_id + "</td>\n\
                      <td >" + ob.patient_id + "</td>\n\
                      <td>" + ob.refCode + "</td> \n\
                      <td>" + ob.Purpose + "</td>  \n\
                      <td>" + ob.date + "</td> \n\
                      <td>" + ob.time + "</td>     \n\
                      <td>" + ob.status + "</td>     \n\
                   </tr>";
    return html;
}
function patInfo(ob) {
    // //alert(ob.firstname);
    $(".name_profile_page").text(ob.firstname + "    " + ob.lastname);
    $(".phone_profile").text(ob.mobile + " Tel: " + ob.mobile);
    $(".email_profile").text(ob.email);
    $(".gender_profile").text(ob.genda);
    $(".occupation_profile").text(ob.occupation);
    $(".address_profile").text(ob.homeAddress);
    $(".city_profile").text(ob.city);
    $(".state_profile").text(ob.state);
    $(".country_profile").text(ob.country);
    $(".blood_profile").text(ob.bloodgroup);
    $(".genotype_profile").text(ob.genotype);

    $("div[rel_div=1]").trigger("click");
}

$(document).on("click", "[id^=pat_]", function () {

    var value1 = $(this).attr("id");
    var urlch = 'http://192.168.0.102/medslat/dash/getPatInfo/' + value1;
    $.get(urlch, function (data) {

        var new_data = JSON.parse(data);
        $.each(new_data, function (id, ob) {

            patInfo(ob);
        });
    });
});
//vicsoft Script ends here ..


//by akisoft for doctor tool box

$(document).on("click", '.tool-btn', function (e) {
    $('.doct-tool-box').css({
        display: 'block'
    });
});
$(document).on("click", '.doct-t-i-close', function (e) {
    $('.doct-tool-box').css({
        display: 'none'
    });
});
$(document).on("click", '.respon-to-sym', function (e) {

});
$(document).on("click", '.medical-report-head-close', function (e) {
    $('.medical-report').css({
        display: 'none'
    });
});
$(document).on("click", '.med-report', function (e) {
    var url2 = URL + "symtoms/xhrgetConCode";
    $.post(url2, {doc_id: sender, pant_id: current_chatting}, function (e) {
        if (e === "empty") {
            //alert("You cannot update medical Record becuase you are not consulting");
            return;
        } else {

        }
    });
    $('.medical-report').css({
        display: 'block'
    });

});
$(document).on("click", '.cobo-ref-head-close', function (e) {
    $('.cobo-ref').css({
        display: 'none'
    });
});
$(document).on("click", '.medical-ref', function (e) {
    $('.cobo-ref').css({
        display: 'block'
    });
    var url = URL + "map/showrefmap";
    $.get(url, function (data) {
        $('.cobo-ref-main-wrap').empty();
        $('.cobo-ref-main-wrap').append(data);
    });
});
$(document).on("click", '.ask-sym', function (e) {
    //check to see if they are in consulting
    var con_code;
    var url2 = URL + "symtoms/xhrgetConCode";
    $.post(url2, {doc_id: sender, pant_id: current_chatting}, function (e) {
        if (e === "empty") {
            //alert("You cannot send a form because you are not consulting");
            return;
        } else {
            //check to see if there is pending requests checkExiting
            var url = URL + "symtoms/xhrcheckExiting";
            con_code = e;
            $.post(url, {doc_id: sender, pant_id: current_chatting, con_code: con_code}, function (e) {

                if (e === "yes") {
                    //alert("there is a pending Symptoms request");
                } else {
                    var out = {
                        message: "form_" + e,
                        user1id: sender,
                        user1un: sender_name,
                        user2id: current_chatting,
                        //user2un: reciever,
                        status: 0,
                        time: ""
                    };
                    iosocket.emit("askym", out);
                }
            });
        }
    });





});

//end by aksoft


//for the map
// starrt here man
//var map, directionsService, directionsDisplay,
//        autoSrc, autoDest, pinA, pinB,
//        markerA = new google.maps.MarkerImage('m1.png',
//                new google.maps.Size(24, 27),
//                new google.maps.Point(0, 0),
//                new google.maps.Point(12, 27)),
//        markerB = new google.maps.MarkerImage('m2.png',
//                new google.maps.Size(24, 28),
//                new google.maps.Point(0, 0),
//                new google.maps.Point(12, 28));
//
//
//var rendererOptions = {
//    map: map,
//    suppressMarkers: false
//
//
//}
//
//var directionsService = new google.maps.DirectionsService();
//var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);
//
//var map = new google.maps.Map(document.getElementById('mappix'), {
//    zoom: 7,
////                mapTypeId: google.maps.MapTypeId.ROADMAP
//    mapTypeId: google.maps.MapTypeId.DRIVING
//
//});
//directionsDisplay.setMap(map);
////     directionsDisplay.setPanel(document.getElementById('panel'));
//
//
//
//var request = {
//    origin: 'ikorodu lagos state',
//    destination: 'sango ota ogun state',
//    travelMode: google.maps.DirectionsTravelMode.DRIVING,
////                 unitSystem: google.maps.UnitSystem.METRIC
//};
//directionsService.route(request, function (response, status) {
//    if (status == google.maps.DirectionsStatus.OK) {
//
//        directionsDisplay.setDirections(response);
//
//        var _route = response.routes[0].legs[0];
//
//        pinA = new google.maps.Marker({position: _route.start_location, map: map, icon: markerA}),
//                pinB = new google.maps.Marker({position: _route.end_location, map: map, icon: markerB});
//    }
//});


//end the map



