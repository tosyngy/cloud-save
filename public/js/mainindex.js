//script for the work
var lab = 'laboratories';
var hos = 'hospitals';
var doc = 'medical doctors';
var nur = 'nurses';
var phar = 'pharmaceuticals';
var title = $('.filter_title_text');
var filter = $('.prof');
var urls;
var text;
var filchild = filter.siblings();
var current_doc;
var conOrHire;

// Aplha 30-07-15
var suglat, suglong;

var pixTemp;
var attached = false, media_type = "", media_link = "";
var picked = false;
var newpic;
//   remove_loading();
$(".waiting_boy").css({"display": "none"});
$(function () {
    function show_loading() {
        $(".waiting_boy").css({"display": "inline"});
    }

    $(document).on('change', "#expert_type", function () {
        searchAll(0);
    });
    $(document).on('change', '.speciality_value.spec', function () {
        $("#expert_type").focus();
        $("#expert_type").select();
        var options = $('#specialul')[0].options;
        var val = $(this).val();
        for (var i = 0; i < options.length; i++) {
            if (options[i].value === val) {
                $("#expert_type").trigger("change");
                break;
            }
        }
    });
    $(document).on('click', ".ent_where #scre", function () {
        searchAll(0);
    });
    $(document).on('click', ".online-search_icon", function () {
        $(".dummyother").trigger("click");
        $("#srh_input_pm").text($.trim($("#srh_input_pm").text()));
        searchAll($.trim($("#srh_input_pm").text()));
    });
    $(document).on('keyup', ".srh_input_pm, #speciality", function (e) {
//        if (e.keyCode === 13) {
        $(".dummyother").trigger("click");
        $(this).text($.trim($(this).text()));
        var a = $(this).text();
        if (!a || a.length === 0) {
            $(this).val($.trim($(this).val()));
            a = $.trim($(this).val());
        } else {
            $(".srh_input_pm").val(a);
            $(".srh_input_pm").focus();
            $(".srh_input_pm").select();
        }
        searchAll(a);
        e.preventDefault();
        return;
//        }

    });
    function searchAll(thum) {

        var spec = $("#speciality.spec").val();
        var prof = $("#expert_type").val();
        var loc = "-";
        if ($(".ent_where .autocomplete").hasClass("set")) {
            loc = address_comp["long"] + " " + address_comp["lat"];
        } else {
            loc = google_addr["long"] + " " + google_addr["lat"];
        }
        if (thum === 0) {
            $.post("http://192.168.0.102/medslat/otherModule/generalSearch", {spec: spec, prof: prof, loc: loc}, function (resp) {
                var data = JSON.parse(resp);
                load_results(data, id);
            });
        } else {
            $.post("http://192.168.0.102/medslat/otherModule/generalSearch", {spec: "", prof: "", loc: loc, srh: thum}, function (resp) {
                var data = JSON.parse(resp);
                load_results(data, id);
            });
        }


    }

    function remove_loading() {
        $(".waiting_boy").css({"display": "none"});
    }
//    med_alert("");
    function med_alert(f) {
////            alert("s")
//        
        var appender = "<div class='aler_wrps innerala'>" + f + "</div>";
        $("body").append(appender);
        setTimeout(function () {
            $(".aler_wrps").fadeOut("slow");
        }, 1000);
//     $('body').remove(appender); 
    }
    title.text(doc.toLowerCase());
//    constant_load();

    $(document).on("change", ".pricerange2_value", function () {
        getfeerange();
    })
    function getfeerange() {
        alert("yes yes ");
    }
    $(".price").click(function () {

        $(".price_content").slideDown("slow");
    })
//    $(document).on("click",".speciality_value")( function(){
//              alert("selected")  
//     })
    $(".price2").click(function () {

        $(".price2content").slideDown("slow");
    })
    $(document).on("click", ".prise > li", function () {
        var value = $(this).text();
        $(".pricerange_value").text(value);
        $(".price_content").slideUp("slow");
    });
    $(".main-search-result").mouseover(function () {
        $(".price_content").slideUp("slow")
        $(".price2content").slideUp("slow");
        $(".speciality_content").slideUp("slow");
    });
    $("#Div4").mouseover(function () {
        $(".price_content").slideUp("slow")
        $(".speciality_content").slideUp("slow");
    });
    $("#Div3").mouseover(function () {
        $(".price_content").slideUp("slow")
        $(".price2content").slideUp("slow");
    });
    $("#Div").mouseover(function () {
        $(".price_content").slideUp("slow")
        $(".price2content").slideUp("slow");
        $(".speciality_content").slideUp("slow");
    });
    $("#Div5").mouseover(function () {
        $(".price2content").slideUp("slow");
        $(".speciality_content").slideUp("slow");
    });
    $(document).on("click", ".consult-main", function () {
        current_doc = $(this).find("pola").attr("id");

    });

    $(document).on("click", "#consult", function () {
        conOrHire = $('#consult').text();

        $('.not-body').empty();
        $('.try_consult .response .confirm').remove();
        $('.not-body').append('<div>You are about to consult with a doctor that charges <b>' + $(this).find("cp").attr("id") + ' ' + $(this).find("cc").attr("id") + '</b>' +
                'and avaliable from 12:00-16:00 (GMT), the equivalent will be charge on your account.' +
                'You are advice to review the Doctor before consult. Please click on' +
                'Comfirm to Consult or Cancel to go back</div>');

        $('.try_consult .response').prepend('<button class="confirm" style="width: 100px; ">Comfirm</button>');
        $('.try_consult').css({display: 'block'});
    });
//    $(document).on("click", "#hire_btn", function() {
//        alert("about to start conversation");
//        
//    });
    $(document).on("click", ".try_consult .cancel", function () {
        $('.try_consult').css({display: 'none'});
    });
    $(document).on('click', '.try_consult .confirm', function (e) {
        $('.not-body').empty();
        $('.try_consult .response .confirm').remove();
        $('.not-body').append('proccessing....');
        var url3 = URL + "consult/getConsultFee/" + current_doc + "_" + "ConsultNow";
        $.post(url3, function (e) {
            $('.not-body').empty();
            $('.not-body').append(e);
        });
    });
    text = "";


    var id;
    $(document).on("click", "#hire_btn", function (e) {
        id = $(this).find('pola').attr('id');
//        alert(id+"jfkjhh")
        console.log(id)
        $.post("http://192.168.0.102/medslat/conversation/startConversation", function (data) {
            $('.main-top-over .down').empty();
            $('.main-top-over').css({display: 'block'});
            $('.main-top-over .down').append(data);
        });
    });
    $(document).on("click", ".but-send", function (e) {
//        alert("click")
//        med_alert("khdfgfhjhmfhffk")
//        alert(id+"popo");
        var mess = $(".write").text().trim();
        if (mess === "" || mess === "Say Something" || mess === "reply...") {
//            alert("empty")
            med_alert("FIELD CAN NOT BE EMPTY")
        }
        else {
//                alert(mess);

            console.log(id)
            $.post("http://192.168.0.102/medslat/conversation/send_conversation", {
                id: id,
                mess: mess,
                media_type: media_type,
                media_link: media_link
            },
            function (data) {
//            alert(data);
                if (data === "") {
                    med_alert("MESSAGE SENT SUCCESSFULLY");
                    $(".write").text("");
//                     $(".btn-close").trigger("click");
                }
                else {
                    med_alert("AN ERROR OCCURE WHILE TRYING TO SEND YOUR MESSAGE")
                }
                attached = false, media_type = "", pixTemp = "";
                media_link = "";
            });

        }

    });
    $(document).on("click", ".attach_file", function (e) {
//        alert("d");
        if (attached) {
            return;
        }

//                alert("hollauu");
        var allowed = "image/jpeg,image/jpg,image/png,image/gif";
        $('.pick_new_file').trigger('click').change(function () {
            if (this.files && this.files[0]) {
                fileMan = new FileReader();
                fileMan.readAsDataURL(this.files[0]);
                fileMan.onload = function (e) {
// newpic
                    pixTemp = e.target.result;
                    fileType = pixTemp.substring(5, pixTemp.indexOf(";"));
                    newpic = pixTemp.replace(/^data:image\/(png|jpg|jpeg|gif|bmp);base64,/, "");
                    if (allowed.indexOf(fileType) < 0) {
                        alert(' The File Type You Chose Is Not Supported!\nPlease Select A Valid Image File');
                    } else {
//                        show_loading();

                        attached = true;
                        media_type = "image";
                        show_loading();

                        $.post('http://192.168.0.102/medslat/conversation/savefile', {
                            media_type: media_type,
                            media_data: newpic
                        },
                        function (resp) {
//                            alert(resp)
                            var r = JSON.parse(resp);
                            if (r.status === "success") {
                                media_link = r.link;
//                                alert(media_link);
                                remove_loading();
                            } else {
                                alert("file Upload Failed");
                            }

                        });
                    }
                };
            }
        });
    })


//    End Alpha Replace
    function getbyspecialist(text, speclst) {

        $.post("http://192.168.0.102/medslat/otherModule/getdoctoraddres", {
        },
                function (r) {
                    Addr_2_Cord(r, function () {
                        mylong = address_comp.long;
                        mylat = address_comp.lat;

                    });

                    if (text === lab) {
                        urls = "http://192.168.0.102/medslat/otherModule/getnearestlab";
                    }
                    else if (text === hos) {
                        urls = "http://192.168.0.102/medslat/otherModule/getnearesthosp";
                    }
                    else if (text === doc) {
                        urls = "http://192.168.0.102/medslat/otherModule/getnearestdocs";
                    }
                    else if (text === nur) {
//                        alert("test " + text + "   specialist " + speclst);
                        urls = "http://192.168.0.102/medslat/otherModule/getnearestnurs";
                    }
                    else if (text === phar) {
                        urls = "http://192.168.0.102/medslat/otherModule/getnearestpharm";
                    }
                    $.post(urls, {
                        spct: speclst,
                        lat: mylat,
                        log: mylong
                    },
                    function (reslt) {
//                        
                        var result = JSON.parse(reslt);
//                        alert("result   is   " + result);
                        load_results(result, text);
                    });
                });
    }
    $(document).on('click', '.thum-wrapper', function () {
        current_doc = $(this).find('pola').attr('id');
        var mainprofile = URL + "profileModule/mainprofile/" + $(this).find('pola').attr('id') + "/1";
        $.get(mainprofile, function (data) {
            $('.search_profile').empty();
            $('.search_display').css({display: 'none'});
            $('.search_review').css({display: 'none'});
            $('.search_profile').css({display: 'block'});
            $('.search_profile').append(data);
        });
    });
//                                    Aplha 30-07-15
    function constant_load() {
        $('.specialul').empty();
        $('.price2ul').empty();
        $.post("http://192.168.0.102/medslat/otherModule/const_load", {constval: 'spec'}, function (result) {
            var obj = JSON.parse(result);
            $('#specialul').empty();
            $.each(obj, function (key, data) {
                $('#specialul').append('<option value"' + data.spe_name + '">' + data.spe_name + '</option>');
            });
        });
        $.post("http://192.168.0.102/medslat/otherModule/const_load", {constval: 'cost'}, function (result) {
            var obj1 = JSON.parse(result);
            $('#price2ul').empty();
            $('#price2ul').append('<option value="Price Range">Price Range</option>');
            $.each(obj1, function (key, data) {
                $('#price2ul').append('<option value="$' + data.min_range + '-$' + data.max_range + '">$' + data.min_range + '-$' + data.max_range + '</option>');
            });
        });
    }

//                          End Alpha 30-07-15

    $(document).on("click", ".other-list", function () {
        getdefaultdoc(doc.toLowerCase());
        constant_load();
//        alert("pp");
    });

    $(document).on('click', '.nopad-right', function () {
        constant_load();
    });

    function  getdefaultdoc(text) {
        $.post("http://192.168.0.102/medslat/otherModule/getdoctoraddres", {
        },
                function (r) {
                    Addr_2_Cord(r, function () {
                        mylong = address_comp.long;
                        mylat = address_comp.lat;
//                        alert("lat erg " + address_comp.lat + " log" + address_comp.long);
                    })
                    urls = "http://192.168.0.102/medslat/otherModule/getnearestdocs";
                    $.post(urls, {
                        lat: mylat,
                        log: mylong
                    },
                    function (res) {

                        var result = JSON.parse(res);

                        load_results(result, text);
                    });
                });
    }
    refer_doc();
});
function getallpractisioners(text) {
    $(".speciality_value").empty();
    $.post("http://192.168.0.102/medslat/otherModule/getdoctoraddres", {
    },
            function (r) {
                Addr_2_Cord(r, function () {
                    mylong = address_comp.long;
                    mylat = address_comp.lat;
                });
                if (text === lab) {
                    urls = "http://192.168.0.102/medslat/otherModule/getnearestlab";
                }
                else if (text === hos) {
                    urls = "http://192.168.0.102/medslat/otherModule/getnearesthosp";
                }
                else if (text === doc) {
                    urls = "http://192.168.0.102/medslat/otherModule/getnearestdocs";
                }
                else if (text === nur) {
//                    alert("")
                    urls = "http://192.168.0.102/medslat/otherModule/getnearestnurs";
                }
                else if (text === phar) {
                    urls = "http://192.168.0.102/medslat/otherModule/getnearestpharm";
                }

                $.post(urls, {
                    lat: mylat,
                    log: mylong
                },
                function (res) {
                    var result = JSON.parse(res);
                    load_results(result, text);
                });
            });
}
//Alpha Codes
function load_results(result, text) {
    if (result.length === 0) {
//        if (text !== 1) {
        var his_row = "No Match Found";
        $(".main-search-result").empty();
        $(".main-search-result").append(his_row);
//        }
    } else {
        var my_hist = "";
        var keer = [];
        $.each(result, function (id, result) {
            if ($.inArray(result.uid, keer) === -1) {
                var search_filter = "";
                var hire;
                if (searchtype === "1") {
//                  console.log(result);
                    if (result.user_state === "1") {
                        search_filter = "<div class='col-xs-3 nopad'>" +
                                "<div class='ava_desc'>" +
                                "<div class='ava'>Available: " + " " + "<i class='usr_ava_start'>" + result.consult_from + "</i>&nbsp;to&nbsp;<i class='usr_ava_end'>" + result.consult_to + " " + result.consult_Time_Zone + "</i></div>" +
                                "<div class='usr_earn'>Consultation Fee: <i class='usr_price'>" + result.consult_price + " " + result.con_cur + "</i></div>" +
                                "</div>" +
                                "<div class='action_btn'>" + "<button type='button' id ='consult' class='btn-info btn-sm consult-main' style='border-radius: 0px;'>Consult Now <cp id='" + result.consult_price + "'></cp><cc id='" + result.con_cur + "'></cc><pola id='" + result.uid + "'></pola></button>";
                    }else{
                         search_filter ="<div class='col-xs-3 nopad'>" +
                                "<div class='ava_desc'>" ;
                    }
//                    search_filter = "<button type='button' id ='consult' class='btn-info btn-sm consult-main' style='border-radius: 0px;'>Consult Now <cp id='" + result.consult_price + "'></cp><cc id='" + result.con_cur + "'></cc><pola id='" + result.uid + "'></pola></button><button type='button' id ='hire_btn' class='btn-primary btn-sm' style='border-radius: 0px;'>Hire Now<cp id='" + result.consult_price + "'></cp><cc id='" + result.con_cur + "'></cc><pola id='" + result.uid + "'></pola></button>";
                    if (result.is_hire_avi === "0") {

                        hire = "<div class='not_available'><div>AM AVAILABLE FOR HIRE CONTACT ME FIRST</div> <div><button type='button' id ='hire_btn' class='btn-primary btn-sm' style='border-radius: 0px;'>Start Coversation<pola id='" + result.uid + "'></pola></button></div></div>";
                    }
                    else if (result.is_hire_avi === "1") {
                        hire = "<div class='not_available'>NOT AVAILABLE FOR HIRE CURRENTLY</div>";
                    }

                }
                else if (searchtype === "2") {
                    search_filter = "<button type='button' id ='consult' class=' btn-info btn-sm' style='border-radius: 0px;'>Consult <cp id='" + result.consult_price + "'></cp><cc id='" + result.con_cur + "'></cc></button>";
                }

                else if (searchtype === "2a") {

                    search_filter = "<button type='button' class='btn-info btn-sm ref2me' style='border-radius: 0px;'>Refer to me</button>";
                }
                var his_row = "<div class='col-xs-12  ref_row nopad'>" +
                        "<div class='col-xs-1 nopad res'>" +
                        "<a><img alt='image'  onerror=" + '"' + "this.src='http://192.168.0.102/medslat/public/images/user_icon.png'" + '"' + "  class='' src='http://192.168.0.102/medmedslat/" + result.profilepix + "'></a>" +
                        "</div>" +
                        "<div class='col-xs-5 nopad pad-left res'>" +
                        "<div class=''>" +
                        "<div class='ent_name'>" + result.firstname + " " + result.lastname + " <span class='ent_rating'><i class='entrate'>" + result.rating + "</i></span></div>" +
                        "<div class='ent_specialty inline-word' data-toggle='tooltip' title=''  data-placement='top'  data-original-title='" + result.speciality + " lives in " + result.state + "  " + result.addCountry + "'>" + result.speciality + " lives in " +
                        "<span class='ent_loc'>" + result.state + ", " + result.addCountry + "</span> </div>" +
                        "<div class='ent_rev'><a class='usr_rev'>Read Reviews</a></div>" +
                        "<div class='ent_online_time'>Last time online:<i class='time_online'>" + result.last_time + "; " + result.last_date + "</i></div>" +
                        "<pola class='medid' id='" + result.uid + "'></pola>" +
                        "</div>" +
                        "</div>" +
                        search_filter +
                        "</div>" +
                        "</div>" +
                        "<div class='col-xs-3 nopad'>" +
                        "<div class='action_btn'>" +
                        hire +
                        "</div>" +
                        "</div>" +
                        "</div>";
                my_hist += his_row;
//                                  End  Aplha 30-07-15
                keer.push(result.username);
            }
        });
        $(".main-search-result").empty();
        $(".main-search-result").append(my_hist);
    }
}
function refer_doc() {
    var pat_id = null;
    $(document).on('click', '.refer_cons', function () {
        pat_id = $(this).parent().children().find('pola').attr('id');
//        alert(pat_id)
    });
    $(document).on('click', '.ref2me', function () {
        var doc_to_ref = $(this).parent().parent().parent().children().children().find('pola').attr('id');
        $.post('http://192.168.0.102/medslat/otherModule/referdoc', {doc_ref: doc_to_ref, pad_refed: pat_id}, function (result) {
            alert(result);
        });

    });
}
// End Alpha Code


