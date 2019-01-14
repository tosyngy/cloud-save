/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */


//script from david for refrence start here

$(function () {

//    $('.in-patients').css({display:'none'});
    $('.out-patients').hide();
    $('.reject-patients').hide();

    $(document).on('click', '.myrefs .tb-in-pat', function () {
        $('.refer .myrefs .in-patients').css({display: 'block'});
        $('.refer .myrefs .out-patients').css({display: 'none'});
        $('.refer .myrefs .reject-patients').css({display: 'none'});
    });
    $(document).on('click', '.myrefs .tb-out-pat', function () {
        $('.refer .myrefs .out-patients').css({display: 'block'});
        $('.refer .myrefs .in-patients').css({display: 'none'});
        $('.refer .myrefs .reject-patients').css({display: 'none'});
    });
    $(document).on('click', '.myrefs .tb-rej-pat', function () {
        $('.refer .myrefs .reject-patients').css({display: 'block'});
        $('.refer .myrefs .in-patients').css({display: 'none'});
        $('.refer .myrefs .out-patients').css({display: 'none'});
    });

    $(document).on('click', '.myhosref .tb-in-pat', function () {
        $('.refer .myhosref .in-patients').css({display: 'block'});
        $('.refer .myhosref .out-patients').css({display: 'none'});
        $('.refer .myhosref .reject-patients').css({display: 'none'});
    });
    $(document).on('click', '.myhosref .tb-out-pat', function () {
        $('.refer .myhosref .out-patients').css({display: 'block'});
        $('.refer .myhosref .in-patients').css({display: 'none'});
        $('.refer .myhosref .reject-patients').css({display: 'none'});
    });
    $(document).on('click', '.myhosref .tb-rej-pat', function () {
        $('.refer .myhosref .reject-patients').css({display: 'block'});
        $('.refer .myhosref .in-patients').css({display: 'none'});
        $('.refer .myhosref .out-patients').css({display: 'none'});
    });



    //left tab
    $(document).on('click', '.mypat', function () {
        switchtab();
        $('.refer .myrefs').css({display: 'block'});
        setTitle("MY PATIENTS");

    });
    $(document).on('click', '.myhppat', function () {
        switchtab();
        $('.refer .myhosref').css({display: 'block'});
        setTitle("MY HOSPITAL PATIENTS");

    });
    $(document).on('click', '.mydoctors', function () {
        switchtab();
        $('.refer .mydoc').css({display: 'block'});
        setTitle("MY DOCTORS");

    });
    $(document).on('click', '.myhired-m', function () {
        switchtab();
        $('.refer .myhired').css({display: 'block'});
        setTitle("MY myhired");

    });
    $(document).on('click', '.myhirer-m', function () {
        switchtab();
        $('.refer .myhirer').css({display: 'block'});
        setTitle("MY myhirer");

    });
    $(document).on('click', '.myhospital', function () {
        switchtab();
        $('.refer .myhos').css({display: 'block'});
        setTitle("MY HOSPITAL");

    });

    function setTitle(value) {
        $('.Txt_REFER').text(value);
    }

    function switchtab() {
        $('.refer .myrefs').css({display: 'none'});
        $('.refer .myhosref').css({display: 'none'});
        $('.refer .mydoc').css({display: 'none'});
        $('.refer .myhired').css({display: 'none'});
        $('.refer .myhirer').css({display: 'none'});
        $('.refer .myhos').css({display: 'none'});
    }




    $(document).on('click', '[id^=pat-option_]', function () {
        var pid = $(this).attr('id');
        //var id_arr = pid.split("_");
        $('#option_' + pid.split("_")[1]).css({display: 'block'});


    });
    $(document).on('click', '.option', function () {
        
        $(this).css({display: 'none'});


    });

});

//script from david stop here