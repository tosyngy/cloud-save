alert("ff")
//           script for edit doctor profile david start here
$(function () {


    $(function () {
        $('#dateofbirth').datepicker({dateFormat: 'dd-mm-yy'});

    });
    $('#closeeeditpatapata').click(function () {
        var toHide = $("#cx");
        var toShow = $(".changer");
//    window.location.reload();


        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
    });
    $('#basic').click(function () {
        var toHide = $(".changer");
        var toShow = $("#cx");

        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
        $("#mytab li:eq(0) a").tab('show');
    });
    $('#generalinfobtndavid').click(function () {
//        $(".changer").hide();
//        $("#cx").show();
        var toHide = $(".changer");
        var toShow = $("#cx");

        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
        $("#mytab li:eq(1) a").tab('show');
    });
    $('#contactinfobtndavid').click(function () {
//        $(".changer").hide();
//        $("#cx").show();
//$(".v").toggle();
        var toHide = $(".changer");
        var toShow = $("#cx");

        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
        $("#mytab li:eq(2) a").tab('show');
    });
    $('#medicalsocietybtn').click(function () {
//        $(".changer").hide();
//        $("#cx").show();
        var toHide = $(".changer");
        var toShow = $("#cx");

        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
        $("#mytab li:eq(3) a").tab('show');
    });
    $('#officeinformationbtn').click(function () {
//        $(".changer").hide();
//        $("#cx").show();
        var toHide = $(".changer");
        var toShow = $("#cx");

        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
        $("#mytab li:eq(4) a").tab('show');
    });
    $('#honorinfobtn').click(function () {
//        $(".changer").hide();
//        $("#cx").show();
        var toHide = $(".changer");
        var toShow = $("#cx");

        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
        $("#mytab li:eq(5) a").tab('show');
    });
    $('#presentationinfobtn').click(function () {
//        $(".changer").hide();
//        $("#cx").show();
        var toHide = $(".changer");
        var toShow = $("#cx");

        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
        $("#mytab li:eq(6) a").tab('show');
    });
    $('#publicationinfobtn').click(function () {
//        $(".changer").hide();
//        $("#cx").show();
        var toHide = $(".changer");
        var toShow = $("#cx");

        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
        $("#mytab li:eq(7) a").tab('show');
    });
    $('#emergencycontactbtn').click(function () {
//        $(".changer").hide();
//        $("#cx").show();
        var toHide = $(".changer");
        var toShow = $("#cx");

        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
        $("#mytab li:eq(8) a").tab('show');
    });
    $('#familynfwdbtn').click(function () {
//        $(".changer").hide();
//        $("#cx").show();
        var toHide = $(".changer");
        var toShow = $("#cx");

        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
        $("#mytab li:eq(9) a").tab('show');
    });
    $('#imagechangerpart').click(function () {
//        $(".changer").hide();
//        $("#cx").show();
        var toHide = $(".changer");
        var toShow = $("#cx");

        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
        $("#mytab li:eq(10) a").tab('show');
    });
    $('#educationalinfobtn').click(function () {
//        $(".changer").hide();
//        $("#cx").show();
        var toHide = $(".changer");
        var toShow = $("#cx");

        toHide.removeClass('flip in').addClass('flip out').hide();
        toShow.removeClass('flip out').addClass('flip in').show();
        $("#mytab li:eq(11) a").tab('show');
    });

//////////////////copy here//////////////////////////////////////
    $(document).on("click", "#prv1", function (event) {

        $("#mytab li:eq(0) a").tab('show');
    });
    $(document).on("click", "#prv2", function (event) {

        $("#mytab li:eq(1) a").tab('show');
    });
    $(document).on("click", "#prv3", function (event) {

        $("#mytab li:eq(2) a").tab('show');
    });
    $(document).on("click", "#prv4", function (event) {

        $("#mytab li:eq(3) a").tab('show');
    });
    $(document).on("click", "#prv5", function (event) {

        $("#mytab li:eq(4) a").tab('show');
    });
    $(document).on("click", "#prv6", function (event) {

        $("#mytab li:eq(5) a").tab('show');
    });
    $(document).on("click", "#prv7", function (event) {

        $("#mytab li:eq(7) a").tab('show');
    });
    $(document).on("click", "#prv8", function (event) {

        $("#mytab li:eq(6) a").tab('show');
    });
    $(document).on("click", "#prv9", function (event) {
//  //alert("9 8")
        $("#mytab li:eq(9) a").tab('show');
    });
    $(document).on("click", "#prv10", function (event) {
//        //alert("10 9")
        $("#mytab li:eq(8) a").tab('show');
    });
    $(document).on("click", "#prv11", function (event) {
//        //alert("10 9")
        $("#mytab li:eq(10) a").tab('show');
    });
    $(document).on("submit", "#personal", function (event) {
        var d = $(this).serialize();
    ////alert(d + "");
        event.preventDefault();

        $.ajax({
            url: "http://192.168.0.102/medslat/profileModule/update_profilenew",
            type: "post",
            data: $(this).serialize(),
            success: function (d) {
//                        //alert(d);
                $("#mytab li:eq(1) a").tab('show');
            }
        });
    });
    $(document).on("submit", "#general", function (event) {
        var d = $(this).serialize();
        //alert(d + "")

        event.preventDefault();

        $.ajax({
            url: "http://192.168.0.102/medslat/profileModule/update_profilenewgene",
            type: "post",
            data: $(this).serialize(),
            success: function (d) {
                //alert(d);
                $("#mytab li:eq(2) a").tab('show');
            }
        });



    });
    $(document).on("submit", "#address", function (event) {
        var d = $(this).serialize();


        event.preventDefault();

        $.ajax({
            url: "http://192.168.0.102/medslat/profileModule/update_profilenewadd",
            type: "post",
            data: $(this).serialize(),
            success: function (d) {
                //alert(d);
                $("#mytab li:eq(3) a").tab('show');
            }
        });



    });

    $(document).on("submit", "#medical", function (event) {
//                var medval = $('#med').val().toUpperCase();
        var top_level_div = document.getElementById('medicalsocietiesdivision');
        var count = top_level_div.getElementsByTagName('div').length;
        var newcounter = count - 1;

        var d = $(this).serialize();
//        //alert(d)
        event.preventDefault();
        $.ajax({
            url: "http://192.168.0.102/medslat/profileModule/update_profilenewmed",
            type: "post",
            data: $(this).serialize() + "&mycounter=" + newcounter,
            success: function (d) {
                //alert(d);
                $("#mytab li:eq(4) a").tab('show');
            }
        });



    });


    $(document).on("submit", "#professional", function (event) {
        var d = $(this).serialize();


        event.preventDefault();

        $.ajax({
            url: "http://192.168.0.102/medslat/profileModule/manage_profilenewpro",
            type: "post",
            data: $(this).serialize(),
            success: function (d) {
                //alert(d);
                $("#mytab li:eq(5) a").tab('show');
            }
        });



    });
/////////

    $(document).on("submit", "#honors", function (event) {

//                var medval = $('#med').val().toUpperCase();
        var top_level_div = document.getElementById('medicalawards');
        var count = top_level_div.getElementsByTagName('div').length;
        var newcounter = count - 1;

        var d = $(this).serialize();
//        //alert(d)
        event.preventDefault();
        $.ajax({
            url: "http://192.168.0.102/medslat/profileModule/manage_profilenewhor",
            type: "post",
            data: $(this).serialize() + "&mycounter=" + newcounter,
            success: function (d) {
                //alert(d);
                $("#mytab li:eq(6) a").tab('show');
            }
        });



    });
/////////

    $(document).on("submit", "#presentations", function (event) {

//                var medval = $('#med').val().toUpperCase();
        var top_level_di = document.getElementById('medicalpresentation');
        var counti = top_level_di.getElementsByTagName('div').length;
        var newcounter = counti - 1;

        var d = $(this).serialize();
//        //alert(d)
        event.preventDefault();
        $.ajax({
            url: "http://192.168.0.102/medslat/profileModule/manage_profilenewpresentation",
            type: "post",
            data: $(this).serialize() + "&mycounter=" + newcounter,
            success: function (d) {
                //alert(d);
                $("#mytab li:eq(7) a").tab('show');
            }
        });



    });

    $(document).on("submit", "#publication", function (event) {

//                var medval = $('#med').val().toUpperCase();
        var top_level_d = document.getElementById('medicalpublications');
        var countin = top_level_d.getElementsByTagName('div').length;
        var newcounter = countin - 1;

        var d = $(this).serialize();
//        //alert(d)
        event.preventDefault();
        $.ajax({
            url: "http://192.168.0.102/medslat/profileModule/manage_profilenewpublication",
            type: "post",
            data: $(this).serialize() + "&mycounter=" + newcounter,
            success: function (d) {
                //alert(d);
                $("#mytab li:eq(8) a").tab('show');
            }
        });



    });
    $(document).on("submit", "#educatioeducationsubmit", function (event) {

//                var medval = $('#med').val().toUpperCase();
        var top_level_ = document.getElementById('medicaleducation');
        var counting = top_level_.getElementsByTagName('div').length;
        var newcounter = counting - 1;

        var d = $(this).serialize();
//        //alert(d)
        event.preventDefault();
        $.ajax({
            url: "http://192.168.0.102/medslat/profileModule/update_profilenewedu",
            type: "post",
            data: $(this).serialize() + "&mycounter=" + newcounter,
            success: function (d) {
//                        //alert(d);
//                        $("#mytab li:eq(8) a").tab('show');
            }
        });



    });

    $(document).on("submit", "#emergency", function (event) {
        var d = $(this).serialize();


        event.preventDefault();

        $.ajax({
            url: "http://192.168.0.102/medslat/profileModule/manage_profilenewemergency",
            type: "post",
            data: $(this).serialize(),
            success: function (d) {
//                        //alert(d);
                $("#mytab li:eq(9) a").tab('show');
            }
        });



    });
    ////////mmm///////
    $(document).on("keyup", ".search_input_messagefamily", function (e) {
//               //alert("mello");
        var search_token = $(".search_input_messagefamily ").val();
//                //alert(search_token);
        if (search_token.length < 1) {
//            //alert("here");
            $(".lupuz").hide();
            $(".lupuz1").show();

        }
        else {
//                    //alert("else")
            $.post("http://192.168.0.102/medslat/profileModule/seachfamilymember",
                    {
                        token: search_token,
                    },
                    function (r) {

//                        //alert(r)

//                   //alert(r);
                        if (r === "No Result For Search") {
                            $(".search-display").empty();
                            $(".search-display").append($("<div class='time_category datestamp'>" + r + "</div>"));
                            return;
                        }
                        var res = JSON.parse(r);
//                        //alert(res)
                        var my_hist = "";
                        $.each(res, function (id, res) {

//                       //alert(res.uid+"l")
                            $(".lupuz1").hide();
                            $(".lupuz").show();

                            var his_row = "<div id='gridcontainer'><div class='col-md-4 mybukzfamily' style='background:linear-gradient(rgba(0, 0, 0, 0.6),rgba(0, 0, 0, 0.6)),url(" + res.pix + ");background-size: cover;'> <div class='image'><img src='" + res.pix + "'></div><div id='griddetails'><div class='name'>" + res.first + "  " + res.last + "</div><input id='userid' value='" + res.uid + "' type='hidden'/><div class='description'>" + res.st + "  " + res.cu + "</div><div class='description1'>" + res.sex + "</div></div><div class='btnedit' style='margin: 12px'><span id='addtofamilybtn'class='yui3-button'fname='" + res.first + "  " + res.last + "' sex='" + res.sex + "' loca='" + res.st + "  " + res.cu + "' uid='" + res.uid + "'>ADD</span></div></div></div>";
// var his_row="<div class='list_item_container' rel='" + res.uid + "'><div rel='" + res.uid + "'class='image'><img src="+res.pix+"></div><div class='labelfamilydavids'>" + res.first + "  " + res.last + "</div><div class='description'>" + res.sex + "</div></div>";
                            my_hist += his_row;
                        });

                        $("#za").empty();
                        $("#za").append(my_hist);

                    });


        }
    });

    $(document).on('click', ".list_item_container", function (st) {
        st.preventDefault();

        var uid = $(this).attr("rel");
//       window.localStorage.setItem("consult_doc",uid);
//        $("body").load("consult.html");
//                //alert("uid"+uid)
        $.post("http://192.168.0.102/medslat/profileModule/singleselect",
                {
                    id: uid,
                },
                function (r) {

//                        //alert(r)

//                   //alert(r);

                    var res = JSON.parse(r);
//                            //alert(res[0].firstname+"mmm")
                    $fullname = res.firstname + "  " + res.lastname;
                    $location = res.city + "  " + res.addCountry;
                    $sex = res.genda;
                    $phone = res.mobile;
                    $pix = res.profilepix;
                    $user = res.uid;
                    //alert($user)
                    $("#secfamily2").remove();
                    var my_hist = "";
                    var his_row = "<div class='mybukzfamily'><div id='imagewrapperfamily'><img src='" + $pix + "' class='dpforfamilylist' alt='img'/></div><div id='mypaddingfamily'><input id='userid' value='" + $user + "' type='hidden'/><div class='form-se'><div id='question'><div class='left-sub-side'>FullName:</div><div id='answer-front' class='fullnamefamily'>" + $fullname + "</div></div><div id='question'><div class='left-sub-side'>Gender:</div><div id='answer-front'class='gendarmifamily'>" + $sex + "</div></div><div id='question'><div class='left-sub-side'>Location:</div><div id='answer-front'class='locationfamilyfamily'>" + $location + "</div></div><div id='question'><div class='left-sub-side'>Mobile:</div><div id='answer-front'class='mobilefonefamily'>" + $phone + "</div></div></div></div><div class='btnedit' style='margin-left: auto;margin-left: 35%;width: 28%;'><span id='addtofamilybtn'class='yui3-button'>Add To List</span></div></div>";
//  <div class='list_item_container' rel='" + res.uid + "'><div rel='" + res.uid + "'class='image'><img src='http://192.168.0.102/myfonebook/v/logged_home/utils/c3.jpg'></div><div class='labelfamilydavids'>" + res.first + "  " + res.last + "</div><div class='description'>" + res.sex + "</div></div>
                    $("#secfamily3").html(his_row);

                });

    });



    $(document).on('click', "#addtofamilybtn", function (st) {
        st.preventDefault();
//      //alert("clic")
//   var name = $(this).attr("fname");
//   var sex = $(this).attr("sex");
//   var location = $(this).attr("loca");
        var userid = $(this).attr("uid");


//       window.localStorage.setItem("consult_doc",uid);
//        $("body").load("consult.html");
//var name = $('#answer-front').val();


        $.post("http://192.168.0.102/medslat/profileModule/manage_profilefamilyandfriend",
                {
//                    name: name,
//                    sex: sex,
//                    location: location,

                    userid: userid,
//                
                },
                function (r) {
                    //alert(r)
                    if (r == "complete") {
                        //alert("you can not add more than 5 user")

                    }
                    else if (r == "memeber added") {
                        //alert("user added")
                    }
                    else if (r == "member already exist") {
                        //alert("the user you are trying to add is already on your list")
                    }


                });

    });

    $(document).on('click', "#removefromfamilybtn", function (st) {


        st.preventDefault();

//      //alert("click");
//   var name = $(this).attr("fname");
//   var sex = $(this).attr("sex");
//   var location = $(this).attr("loca");
        var userid = $(this).attr("uid");
//        //alert(userid+"su")
//         //alert($(this).attr("id"))
        //alert($(this).parent(this).parent().remove());
//       window.localStorage.setItem("consult_doc",uid);
//        $("body").load("consult.html");
//var name = $('#answer-front').val();


        $.post("http://192.168.0.102/medslat/profileModule/manage_profilefamilyandfriendremove",
                {
//                    name: name,
//                    sex: sex,
//                    location: location,

                    userid: userid,
//                
                },
                function (r) {

//                    //alert(r)

//                    //alert($(this).attr("."))
//                    //alert("removed")
                });

    });



////vvv///
//singleselect
    $('.selBanner').click(function (ev) {
        ev.preventDefault();
        var allowed = "image/jpeg,image/jpg,image/png,image/gif";
        $('.input_banner').trigger('click').change(function (e) {
                alert($('#input_banner').val())
//            //alert($('.profile_pix').val())
            if (this.files && this.files[0]) {
                fileMan = new FileReader();
                fileMan.readAsDataURL(this.files[0]);
//                //alert("file")
                fileMan.onload = function (e) {
//                     //alert()
                    pixTemp = e.target.result;
                    fileType = pixTemp.substring(5, pixTemp.indexOf(";"));
                    if (allowed.indexOf(fileType) < 0) {
                        //alert(' The File Type You Chose Is Not Supported!\nPlease Select A Valid Image File');
                    } else {
                        $('.filley').empty();
                        $('.filley').append('<img class="defualeditimage img-thumbnail" src="' + pixTemp + '">')
//                        //alert(pixTemp)
                        var newpic = pixTemp.replace(/^data:image\/(png|jpg|jpeg|gif|bmp);base64,/, "");
                        $('.profile_pix').attr("value", pixTemp);
//                                //alert("diplo" + pixTemp);
//                                //alert("man")
//                                //alert($('.profile_pix').val())

                    }
//                    //alert(pixTemp.indexOf(";"));
//                    $('.profile_pix').val(pixTemp);
                }
            }
        });
    });
    $(document).on("click", "#savepix", function (event) {
        var pix = $('.profile_pix').val();
        var newpic = pix.replace(/^data:image\/(png|jpg|jpeg|gif|bmp);base64,/, "");
        //alert(newpic);

        event.preventDefault();
        $.post("http://192.168.0.102/medslat/profileModule/savefile",
                {
                    pix: newpic
                },
                function (data) {

                    //alert(data);

                })


    });
    $('#medsoc').on('keypress', function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            //alert("med")
            // ajax request
//               //alert("s")
            $(".add__").trigger("click");
        }
    });
    $('#honawrd').on('keypress', function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            //alert("hor")
            // ajax request
//               //alert("s")
            $(".add__").trigger("click");
        }
    });
    $('#presntn').on('keypress', function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            //alert("presev")
            // ajax request
//               //alert("s")
            $(".add__").trigger("click");
        }
    });
    $('#publicatns').on('keypress', function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            //alert("public")
            // ajax request
//               //alert("s")
            $(".add__").trigger("click");
        }
    });

    $('#profaff').on('keypress', function (e) {
        var code = (e.keyCode ? e.keyCode : e.which);
        if (code == 13) {
            e.preventDefault();
            //alert("pro")
            // ajax request
//               //alert("s")
            $(".add__").trigger("click");
        }
    });
    var top_level_div = document.getElementById('medicalsocietiesdivision');
    var countme = top_level_div.getElementsByTagName('div').length;
    $("#addnew").click(function () {
//                //alert(countme)


//            "<input class='medsocialname' placeholder='MEDICAL SOCIETY' name='name"+couter+"'>"
//                $("#medicalsocietiesdivision").append("<input class='medsocialname' placeholder='MEDICAL SOCIETY' name='name"+count+"'>"); 
        $("#medicalsocietiesdivision").append("<div><input class='medsocialname' placeholder='MEDICAL SOCIETY'name='name" + countme + "'><input class='medsocialyearjoin' placeholder='YEAR JOIN' name='join" + countme + "'><br/><textarea class='medsocialdisc' placeholder='Description'name='description" + countme + "'></textarea></div>");
//            //alert(name+count)
        countme += 1;
    })
    $("#medicalsocietiesdivision").on("click", "#medclose", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        count -= 1;
    })
});
//        hor
$(function () {
//          hor
    var hor = document.getElementById('medicalawards');
    var countme1 = hor.getElementsByTagName('div').length;
    $("#addnew1").click(function () {
//                //alert(countme1)


//            "<input class='medsocialname' placeholder='MEDICAL SOCIETY' name='name"+couter+"'>"
//                $("#medicalsocietiesdivision").append("<input class='medsocialname' placeholder='MEDICAL SOCIETY' name='name"+count+"'>"); 
        $("#medicalawards").append("<div><input class='medhornorname' placeholder='hornor name'name='name" + countme1 + "'><input class='medsocialyearjoin' placeholder='year given' name='join" + countme1 + "'><br/><textarea class='medsocialdisc' placeholder='Description'name='description" + countme1 + "'></textarea></div>");
//            //alert(name+count)
        countme1 += 1;
    })
    $("#medicalawards").on("click", "#medclose", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        countme1 -= 1;
    })
    $(document).on('keyup', '.medhornorname', function () {
        var lenght = $(this).val().length;
        if (lenght == 1) {
            $("#addnew1").trigger('click');
        }
//        else if(lenght < 1){
//            //alert("less")
//        }

    });
///hh
//         pre
    var pre = document.getElementById('medicalpresentation');
    var countme2 = pre.getElementsByTagName('div').length;
    $("#addnew2").click(function () {
//                //alert(countme2)


//            "<input class='medsocialname' placeholder='MEDICAL SOCIETY' name='name"+couter+"'>"
//                $("#medicalsocietiesdivision").append("<input class='medsocialname' placeholder='MEDICAL SOCIETY' name='name"+count+"'>"); 
        $("#medicalpresentation").append("<div><input class='medpresentation' placeholder='Title'name='name" + countme2 + "'><input class='medsocialyearjoin' placeholder='Year' name='join" + countme2 + "'><br/><textarea class='medsocialdisc' placeholder='Description'name='description" + countme2 + "'></textarea></div>");
//            //alert(name+count)
        countme2 += 1;
    })
    $("#medicalpresentation").on("click", "#medclose", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        countme2 -= 1;
    })
    $(document).on('keyup', '.medpresentation', function () {
        var lenght = $(this).val().length;
        if (lenght == 1) {
            $("#addnew2").trigger('click');
        }

    });
///pre
//         pub
    var pru = document.getElementById('medicalpublications');
    var countme3 = pru.getElementsByTagName('div').length;
    $("#addnew3").click(function () {
//                //alert(countme3)


//            "<input class='medsocialname' placeholder='MEDICAL SOCIETY' name='name"+couter+"'>"
//                $("#medicalsocietiesdivision").append("<input class='medsocialname' placeholder='MEDICAL SOCIETY' name='name"+count+"'>"); 
        $("#medicalpublications").append("<div><input class='medicalpublications' placeholder='Title'name='name" + countme3 + "'><input class='medsocialyearjoin' placeholder='Year' name='join" + countme3 + "'><br/><textarea class='medsocialdisc' placeholder='Description'name='description" + countme3 + "'></textarea></div>");
//            //alert(name+count)
        countme3 += 1;
    })
    $("#medicalpublications").on("click", "#medclose", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        countme3 -= 1;
    })
    $(document).on('keyup', '.medicalpublications', function () {
        var lenght = $(this).val().length;
        if (lenght == 1) {
            $("#addnew3").trigger('click');
        }

    });
///pub
//         edu
    var edu = document.getElementById('medicaleducation');
    var countme6 = edu.getElementsByTagName('div').length;
    $("#addnew6").click(function () {
//                //alert(countme6)


//            "<input class='medsocialname' placeholder='MEDICAL SOCIETY' name='name"+couter+"'>"
//                $("#medicalsocietiesdivision").append("<input class='medsocialname' placeholder='MEDICAL SOCIETY' name='name"+count+"'>"); 
        $("#medicaleducation").append("<div><input class='medicaleducation' placeholder='Colledge Name'name='name" + countme6 + "'><input class='medsocialyearjoin' placeholder='Year Graduated' name='join" + countme6 + "'><br/><textarea class='medsocialdisc' placeholder='Course Of Study'name='description" + countme6 + "'></textarea></div>");
//            //alert(name+count)
        countme6 += 1;
    })
    $("#medicaleducation").on("click", "#medclose", function (e) {
        e.preventDefault();
        $(this).parent('div').remove();
        countme6 -= 1;
    })
    $(document).on('keyup', '.medicaleducation', function () {
        var lenght = $(this).val().length;
        if (lenght == 1) {
            $("#addnew6").trigger('click');
        }

    });
///edu
});


$(document).on('keyup', '.medsocialname', function () {
    var lenght = $(this).val().length;
    if (lenght == 1) {
        $("#addnew").trigger('click');
    }

});
//davsript


$(function () {
    $(".add__").click(function (e) {

        var targ = $(this).attr("sect");

        newVal = $("#" + targ).val();

        if (newVal.length < 1) {

        } else {
//                //alert( $("." + targ+"_list").html())
            $("." + targ + "_list").append("<span class='col-md-2'>" + newVal + "</span>");
            curVal = $("." + targ).val();


            if (curVal.length < 1) {
                $("." + targ).val(curVal + "" + newVal);
                $("#" + targ).val("")
                return;
            }
            $("." + targ).val(curVal + "<%;%>" + newVal);
//                //alert( $("." + targ).val(curVal + "<%;%>" + newVal));
            $("#" + targ).val("");
        }
    });


});



//           script for edit doctor profile david stop here






