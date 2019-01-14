/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

alert("doc press");
$(document).ready(function() {
    $('[data-toggle="tooltip"]').tooltip();
    
});


function show() {
    var select = document.getElementById('dose1');
    var input = document.getElementById('input');
    if (select.value == 'Order') {
        input.innerHTML = '<input type="text" class="form-control" id=dose2 placeholder="Or Specify dosage"/>';
    }
    else {
        input.innerHTML = '';
    }
}

$(function() {
    $('.med').click(function() {
        var doc = $('#user_id').val();
        var pat = current_chatting;
        var dat = $('.date');
        var start_time = $('.start-time');
        // //alert(pat+doc)
        $.post("http://192.168.0.102/medslat/report/report_date", {d: doc, p: pat}, function(data) {
            ////alert(data);
            var dt = JSON.parse(data);
            console.log(dt);
            d = dt[0];
            t = dt[1];
            dat.text(d);
            start_time.text(t);
        });

    });

    var dynamic;
    var test_txt;
    var arr = [];
    var i = 0;

    $('.tst').change(function() {

        var tst = $(this).val();
        var t = $('.test-selected');
        if (tst == "") {
            return;
        } else
            dynamic = '<div class="div-test">' + tst + '<span class="del pull-right"><i class="glyphicon glyphicon-remove"></></span><div/>';
        t.append(dynamic);
        test_txt = ($(dynamic).text());
        arr.push(test_txt);
        $(this).val('');
    });

    $(document).on('click', '.del', function() {
        $(this).parent().remove();
    });

    $('.upd_test').click(function() {
        var date_test = $('.date').first().text();
        var time_test = $('.start-time').first().text();
        if ($('.div-test').text() == "") {
            //alert('Specify test to continue');
            return;
        }
        var doc = $('#user_id').val();
        var pat = current_chatting;

        $.post('http://192.168.0.102/medslat/report/test', {ar: arr, d: doc, p: pat, t: date_test, tt: time_test}, function(res) {
            //alert(res);
            $('.test-selected').children().remove();
        });
    });

    $('.upd_drug').click(function() {
        var date_drug = $('.date').first().text();
        var time_drug = $('.start-time').first().text();
        var type = $('#drug_type').val();
        var dose = $('.dosage').val();
        var dose2 = $('#dose2').val();
        var doc_id = $('#user_id').val();
        var pat_id = current_chatting;

        if (type == "") {
            //alert('Select Drug and Dosage to continue');
            return;
        }

        if (dose == 'Order') {
            dose = dose2;
        }

        $.post("http://192.168.0.102/medslat/report/drug", {
            da: date_drug,
            tt: time_drug,
            t: type,
            d: dose,
            doc: doc_id,
            pat: pat_id
        }, function(res) {
            //alert(res);
            $('#drug_type').val('');
            $('.dosage').val('Select Dosage');
        });

    });



    $('.conclude').click(function() {
        var doc = $('#user_id').val();
        var pat = current_chatting;
        var com = $('.doc-com').val();
        if (com == "") {
            //alert('Place a comment');
            return;
        }

        $.post("http://192.168.0.102/medslat/report/doc_comment", {c: com, d: doc, p: pat}, function(res) {
            //alert(res);
            $('.doc-com').val("");
        });
    });
});
