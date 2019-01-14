/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var a = 0;
var iban = 0;
var code2currency = {"004": "AFN", "008": "ALL", "012": "DZD", "024": "AOA", "032": "ARS", "051": "AMD",
    "533": "WG", "036": "AUD", "031": "AZN", "044": "BSD", "048": "BHD", "050": "BDT", "052": "BBD",
    "112": "BYR", "084": "BZD", "060": "BMD", "064": "BTN", "068": "BOB", "070": "BAM", "072": "BWP",
    "076": "BRL", "100": "BGN", "108": "BIF", "116": "KHR", "120": "", "124": "CAD", "132": "CVE",
    "136": "KYD", "140": "XAF", "152": "CLF ", "156": "CNY ", "170": "COP", "174": "KMF ", "178": "CDF",
    "188": "CRC", "191": "HRK", "192": "CUP", "203": "CZK", "262": "DJF", "214": "DOP", "818": "EGP",
    "222": "SCV", "226": "GNF", "232": "ERN", "231": "ETB", "238": "FKP ", "242": "FJD", "246": "FIM",
    "250": "FRF", "266": "XAF", "270": "GMD", "268": "GEL", "276": "DEM", "288": "GHS", "292": "GIP",
    "300": "EUR", "320": "GTQ", "324": "GNF", "332": "HTG", "340": "HNL", "344": "HKD", "348": "HUF",
    "352": "ISK", "356": "INR", "360": "IDR", "364": "IRR", "368": "IQD", "372": "IEP", "376": "ISL",
    "380": "ITL", "388": "MD", "392": "JPY", "400": "JOD", "398": "KZT", "404": "KES", "408": "KRW",
    "410": "KPW", "414": "KWD", "417": "KGS", "428": "LVL", "422": "LBP", "426": "LSL", "430": "LBP",
    "434": "LYD", "440": "LTL", "446": "MOP", "807": "MKD", "454": "MWK", "458": "MYR", "462": "MVR",
    "466": "XOF", "478": "MRO", "480": "MUR", "484": "XN", "498": "MDL", "492": "EUR", "496": "MNT",
    "504": "MAD", "508": "MZN", "104": "MMK", "516": "NAD", "524": "NPR", "528": "AND", "554": "NZD",
    "558": "NIO", "562": "XAF", "566": "NGN", "578": "NOK", "512": "OMR", "586": "PKR", "591": "PAB",
    "598": "PGK", "600": "PYG", "604": "PEN", "608": "PHP", "616": "PLN", "620": "EUR", "634": "QAR",
    "642": "ON", "643": "RUB", "646": "RWF", "882": "WST", "682": "SAR", "686": "XAF", "688": "RSD",
    "690": "SCR", "694": "SLL", "702": "SGD", "090": "SBD", "706": "SOS", "710": "ZAR", "728": "SDG",
    "724": "EUR", "144": "LKR", "729": "SDG", "740": "SRD", "748": "SZL", "756": "CHF", "760": "SYP",
    "158": "TWD", "762": "TJS", "834": "TZS", "764": "THB", "776": "OP", "780": "TTD", "788": "TND",
    "792": "TRY", "795": "TMT", "800": "UGX", "804": "UAH", "784": "AED", "826": "GBP", "840": "USD",
    "858": "UYU", "860": "UZS", "548": "VUV", "862": "VEF", "704": "VND", "887": "YER", "894": "ZMW", "716": "ZWL"};
var paytype = ["voucher", "Master-Card", "verve-Card", "paypal"];

$(document).on('click', "#gobydate", function (e) {
    $('.notrans').empty();
    $('.loadin').text("loading...")
    e.preventDefault();
    if ($('.frombydate').val() == "" || $('.tobydate').val() == "") {
        ////alert(please select date ");
        $('.loadin').empty();
        return;
    }
    else if (!$('.descptn').val() == "" || $('.frombydate').val() == "" || $('.tobydate').val() == "") {
//        //alert("get ere ");
        var new_data = "";
        $('.wall-t-body').empty();
        ////alert(yes it is   " + $('.wall-t-body').empty());
        conDate = $('.frombydate').val() + '_' + $('.tobydate').val();
        var url22 = 'http://192.168.0.102/medslat/walletModule/acc_trans_by_date2/' + $('.frombydate').val() + '_' + $('.tobydate').val() + '_' + $('.descptn').val();
//        //alert("urls is  " + url22);
        $.get(url22, function (data) {

            new_data = JSON.parse(data);
            $('.wall-t-body').empty();
            if (new_data.length === 0) {
                $('.wall-t-body').append("No Transaction History");
                $('.loadin').empty();
                $('.frombydate').empty();
                $('.tobydate').empty();
            }
            else {
                $.each(new_data, function (id, ob) {
                    $('.wall-t-body').append(formTrHis(ob, getOp()));
                    $('.loadin').empty();
                    $('.frombydate').empty();
                    $('.tobydate').empty();
                });
//                //alert("thehheh   " + new_data);
                new_data = "";
            }
        });
    }
    else {
        conDate = $('.frombydate').val() + '_' + $('.tobydate').val();
        var url2 = 'http://192.168.0.102/medslat/walletModule/acc_trans_by_date/' + $('.frombydate').val() + '_' + $('.tobydate').val();
        $.get(url2, function (data) {

            var new_data = JSON.parse(data);
            $('.wall-t-body').empty();
            if (new_data.length === 0) {
                $('.wall-t-body').append("No Transaction History");
                $('.loadin').empty();
                $('.frombydate').empty();
                $('.tobydate').empty();
            }
            else {
                $.each(new_data, function (id, ob) {
                    $('.wall-t-body').append(formTrHis(ob));
                    $('.loadin').empty();
                    $('.frombydate').empty();
                    $('.tobydate').empty();
                });
            }
        });
    }
});

function formTrHis(ob) {
    var html = " <tr class='primary' style='background: rgba(67, 123, 189, 0." + (((a++) % 2) * 4) + ");'>\n\
                      <td class='inline-word'>" + ob.trans_date + "</td>\n\
                      <td class='hd-mb'>" + ob.trans_ref + "</td>\n\
                      <td class='inline-word'>" + ob.trans_des + "</td>\n\
                      <td class='hd-mb'>" + ob.trans_vdate + "</td> \n\
                      <td class='inline-word'>" + ob.trans_deb + "</td>  \n\
                      <td class='inline-word'>" + ob.trans_cre + "</td> \n\
                      <td class='hd-mb'>" + ob.trans_currency + "</td>     \n\
                   </tr>";
    return html;
}

$(document).ready(function () {
    $('.frombydate').empty();
    $('.tobydate').empty();//
    $(document).on("click", "#con_submit", function (e) {
        e.preventDefault();
        $(".con-proc-stat").text("");
        $(".con-proc-stat").text("Converting, Please wait...");
        var amt = $("#amt").html();
        var frm = $("#frm").html();
        var tt = $("#tt :selected").val();
//        //alert("hdsgsghddg   convert  " + amt + "  " + frm + "  " + tt);
        // return;
        $.post("http://192.168.0.102/medslat/dash/currency_converter",
                {
                    amt: amt,
                    frm: frm,
                    tt: tt
                },
        function (o) {
//            //alert("this is it  " + o)
            if (o > 0) {
                $(".con-proc-stat").text("Done Converting!");
                $(".con-proc-result").html("<div>Your Converted Value in " + tt + " from " + frm + " is " + o + " do you want to continue? \n\
                <span class='yes_convert'><a href=''>YES</a></span> <span class='no_convert'><a href=''>NO</a></span></div>");
            }
//            $(".con_amt").html(o);
//            $(".con_cur").html(tt);
        });
    });
    // vicsoft latest work starts here
    $(document).on("click", "#saveChanges", function () {
        if ($('input[name="Payment-method"]').is(':checked')) {

            if ($('#achTermsAccepted').is(':checked')) {
                ////alert(country_type);
                if (country_type === "EUROPE") {

                    var textSele = $("#achCountry :selected").val();
                    ////alert("concat it  " + textSele);
                    if (textSele === "") {
                        //alert("Select Valid Country");
                    }
                    else {
                        var selcountr = textSele.split("_");
                        var plsrepl = selcountr[1];
                        var textSelected = plsrepl.replace(/\+/g, " ");
                        // //alert("contryu is  " + textSelected);
                        if (textSelected === "AUSTRIA" || textSelected === "BELGIUM" || textSelected === "BULGARIA" || textSelected === "CYPRUS" || textSelected === "CZECH REP"
                                || textSelected === "DENMARK" || textSelected === "ESTONIA" || textSelected === "FINLAND" || textSelected === "FRANCE" || textSelected === "FRENCH GUIANA"
                                || textSelected === "GERMANY" || textSelected === "GIBRALTAR" || textSelected === "GREECE" || textSelected === "GUADELOUPE" || textSelected === "HUNGARY"
                                || textSelected === "ICELAND" || textSelected === "IRELAND" || textSelected === "ITALY" || textSelected === "LATVIA" || textSelected === "LIECHTENSTEIN" ||
                                textSelected === "LITHUANIA" || textSelected === "LUXEMBOURG" || textSelected === "MALTA" || textSelected === "MARTINIQUE" || textSelected === "MAYOTTE" ||
                                textSelected === "MONACO" || textSelected === "NETHERLANDS" || textSelected === "NORWAY" || textSelected === "POLAND" ||
                                textSelected === "PORTUGAL" || textSelected === "REUNION IS" || textSelected === "ROMANIA" || textSelected === "SLOVAK REP" || textSelected === "SLOVENIA" ||
                                textSelected === "SPAIN" || textSelected === "ST PIERRE MIQUELON" || textSelected === "SWEDEN" || textSelected === "SWITZERLAND" || textSelected === "UNITED KINGDOM")
                        {

                            ////alert(europ  " + iban);
                            if ($("#bankname").val() === "" || $("#iban").val() === "" || $("#swift").val() === "") {
                                //alert("Fill All the Neccessary blank");
                            }
                            else if ($("#iban").length === iban || $("#swift").lenght >= 8 || $('input[name="Payment-Frequency"]').is(':checked') || $('input[name="Account_Type"]').is(':checked')) {
                                ////alert("test type p   " + $("#form-Account-Type :checked").val() + "  " + $("#form-pay-method :checked").val());

                                saveEurope($("#paymentThreshold :selected").val(), $("#form-pay-method :checked").val(), $("#form-pay-frequency :checked").val(), textSelected, $("#bankname").val(), $("#iban").val(), $("#swift").val(), $("#form-Account-Type :checked").val(), "");
                            }
                            else {//$("#achTermsAccepted :checked").val()
                                //alert("Check The values Supplied for any Error..");
                            }
                        } else {
                            //     ////alert(europ2");
                        }
                    }
                }
                else if (country_type === "CANADA" || country_type === "AUSTRALIA") {
                    ////alert(yes   " + country_type);
                    var textSele = $("#achCountry :selected").val();
                    if (textSele === "") {
                        //    //alert("Select Valid Country");
                    }
                    else {//paymentThreshold  achcurrency
                        var selcountr = textSele.split("_");
                        var plsrepl = selcountr[1];
                        var textSelected = plsrepl.replace('+', " ");
                        if (textSelected === "CANADA" || textSelected === "AUSTRALIA") {
                            //   ////alert(europ  " + iban);
                            if ($("#bankname").val() === "" || $("#accountnumb").val() === "" || $("#ITT").val() === "") {
                                //alert("Fill All the Neccessary blank");
                            }
                            else if ($("#accountnumb").length === 12 || $("#ITT").lenght === 9 || $('input[name="Payment-Frequency"]').is(':checked') || $('input[name="Account_Type"]').is(':checked')) {
                                //       ////alert(payment method " + $("#form-pay-method :checked").val());
                                saveEurope($("#paymentThreshold :selected").val(), $("#form-pay-method :checked").val(), $("#form-pay-frequency :checked").val(), textSelected, $("#achcurrency :selected").val(), $("#bankname").val(), $("#accountnumb").val(), $("#ITT").val(), $("#form-Account-Type :checked").val());
                            }
                            else {
                                //alert("Check The values Supplied for any Error.8ij.");
                            }
                        }
                    }
                }
                else if (country_type === "HONG KONG") {
                    //      ////alert(yes   " + country_type);
                    var textSele = $("#achCountry :selected").val();
                    if (textSele === "") {
                        //alert("Select Valid Country");
                    }
                    else {//paymentThreshold  achcurrency
                        var selcountr = textSele.split("_");
                        var plsrepl = selcountr[1];
                        var textSelected = plsrepl.replace('+', " ");
                        if (textSelected === "HONG KONG") {
                            //      ////alert(europ  " + iban);
                            if ($("#bankname").val() === "" || $("#accountnumb").val() === "" || $("#swiftbic").val() === "") {
                                //alert("Fill All the Neccessary blank");
                            }
                            else if ($("#acntnum").length === 12 || $("#swiftbic").lenght >= 8 || $('input[name="Payment-Frequency"]').is(':checked') || $('input[name="Account_Type"]').is(':checked')) {
                                //    ////alert(payment method " + $("#form-pay-method :checked").val());
                                saveEurope($("#paymentThreshold :selected").val(), $("#form-pay-method :checked").val(), $("#form-pay-frequency :checked").val(), textSelected, $("#bankname").val(), $("#acntnum").val(), $("#swiftbic").val(), $("#form-Account-Type :checked").val(), "");
                            }
                            else {
                                //alert("Check The values Supplied for any Error.8ij.");
                            }
                        }
                    }
                }

                else if (country_type === "INDIA") {
                    //        ////alert(yes   " + country_type);
                    var textSele = $("#achCountry :selected").val();
                    //             ////alert(europ  " + textSele);
                    if (textSele === "") {
                        //alert("Select Valid Country");
                    }
                    else {//paymentThreshold  achcurrency
                        var selcountr = textSele.split("_");
                        var plsrepl = selcountr[1];
                        var textSelected = plsrepl.replace('+', " ");
                        if (textSelected === "INDIA") {
                            //             ////alert(europ  " + iban);
                            if ($("#bankname").val() === "" || $("#accountnumb").val() === "" || $("#ifsc").val() === "") {
                                //alert("Fill All the Neccessary blank");
                            }
                            else if ($("#acntnum").length === 12 || $("#ifsc").lenght >= 8 || $('input[name="Payment-Frequency"]').is(':checked') || $('input[name="Account_Type"]').is(':checked')) {
                                //                    ////alert(payment method " + $("#form-pay-method :checked").val());
                                saveEurope($("#paymentThreshold :selected").val(), $("#form-pay-method :checked").val(), $("#form-pay-frequency :checked").val(), textSelected, $("#bankname").val(), $("#acntnum").val(), $("#ifsc").val(), $("#form-Account-Type :checked").val(), "");
                            }
                            else {
                                //alert("Check The values Supplied for any Error.8ij.");
                            }
                        }
                    }
                }

                else if (country_type === "MEXICO") {
                    //         ////alert(yes   " + country_type);
                    var textSele = $("#achCountry :selected").val();
                    if (textSele === "") {
                        //alert("Select Valid Country");
                    }
                    else {//paymentThreshold  achcurrency
                        var selcountr = textSele.split("_");
                        var plsrepl = selcountr[1];
                        var textSelected = plsrepl.replace('+', " ");
                        if (textSelected === "MEXICO") {
                            //                    ////alert(europ  " + iban);
                            if ($("#bankname").val() === "" || $("#cabval").val() === "") {
                                //alert("Fill All the Neccessary blank");
                            }
                            else if ($("#cabval").length === 11 || $('input[name="Payment-Frequency"]').is(':checked') || $('input[name="Account_Type"]').is(':checked')) {
                                //                    ////alert(payment method " + $("#form-pay-method :checked").val());
                                saveEurope($("#paymentThreshold :selected").val(), $("#form-pay-method :checked").val(), $("#form-pay-frequency :checked").val(), textSelected, $("#bankname").val(), $("#cabval").val(), $("#form-Account-Type :checked").val(), "", "");
                            }
                            else {
                                //alert("Check The values Supplied for any Error.8ij.");
                            }
                        }
                    }
                }

                else if (country_type === "NEW ZEALAND") {
                    //      ////alert(yes   " + country_type);
                    var textSele = $("#achCountry :selected").val();
                    //            //alert("chchchchchc    " + textSele);
                    if (textSele === "") {
                        //alert("Select Valid Country");
                    }
                    else {
                        var selcountr = textSele.split("_");
                        var plsrepl = selcountr[1];
                        var textSelected = plsrepl.replace('+', " ");
//                        //alert("let us see  " + textSelected);
                        if (textSelected === "NEW ZEALAND") {
                            ////alert(europ  " + iban);//
                            if ($("#bankname").val() === "" || $("#nzacntnum").val() === "" || $("#nzsurfx").val() === "" || $("#nzbnkbrnum").val() === "") {
                                //alert("Fill All the Neccessary blank");
                            }
                            else if ($("#nzacntnum").length() <= 8 || $("#nzsurfx").length() <= 4 || $("#nzbnkbrnum").length() === 6 || $('input[name="Payment-Frequency"]').is(':checked') || $('input[name="Account_Type"]').is(':checked')) {
                                ////alert(payment method " + $("#form-pay-method :checked").val());
                                saveEurope($("#paymentThreshold :selected").val(), $("#form-pay-method :checked").val(), $("#form-pay-frequency :checked").val(), textSelected, $("#bankname").val(), $("#nzacntnum").val(), $("#nzsurfx").val(), $("#nzbnkbrnum").val(), $("#form-Account-Type :checked").val());
                            }
                            else {
                                //alert("Check The values Supplied for any Error.8ij.");
                            }
                        }
                    }
                }

                else if (country_type === "PHILIPPINES") {
                    ////alert(yes   " + country_type);
                    var textSele = $("#achCountry :selected").val();
                    ////alert(europ  " + textSele);
                    if (textSele === "") {
                        //alert("Select Valid Country");
                    }
                    else {//paymentThreshold  achcurrency
                        var selcountr = textSele.split("_");
                        var plsrepl = selcountr[1];
                        var textSelected = plsrepl.replace('+', " ");
                        if (textSelected === "PHILIPPINES") {
                            ////alert(europ  " + iban);
                            if ($("#bankname").val() === "" || $("#acccnum").val() === "" || $("#bankid").val() === "") {
                                //alert("Fill All the Neccessary blank");
                            }
                            else if ($("#acccnum").length === 35 || $("#bankid").length >= 8 || $('input[name="Payment-Frequency"]').is(':checked') || $('input[name="Account_Type"]').is(':checked')) {
                                ////alert(payment method " + $("#form-pay-method :checked").val());
                                saveEurope($("#paymentThreshold :selected").val(), $("#form-pay-method :checked").val(), $("#form-pay-frequency :checked").val(), textSelected, $("#bankname").val(), $("#acccnum").val(), $("#bankid").val(), $("#form-Account-Type :checked").val(), "");
                            }
                            else {
                                //alert("Check The values Supplied for any Error....");
                            }
                        }
                    }
                }

                else if (country_type === "SINGAPORE") {
                    ////alert(yes   " + country_type);
                    var textSele = $("#achCountry :selected").val();
                    if (textSele === "") {
                        //alert("Select Valid Country");
                    }
                    else {//paymentThreshold  achcurrency
                        var selcountr = textSele.split("_");
                        var plsrepl = selcountr[1];
                        var textSelected = plsrepl.replace('+', " ");
                        if (textSelected === "SINGAPORE") {
                            ////alert(europ  " + iban);
                            if ($("#bankname").val() === "" || $("#accno").val() === "" || $("#IRC").val() === "") {
                                //alert("Fill All the Neccessary blank");
                            }
                            else if ($("#accno").length === 11 || $("#IRC").length === 7 || $('input[name="Payment-Frequency"]').is(':checked') || $('input[name="Account_Type"]').is(':checked')) {
                                ////alert(payment method " + $("#form-pay-method :checked").val());
                                saveEurope($("#paymentThreshold :selected").val(), $("#form-pay-method :checked").val(), $("#form-pay-frequency :checked").val(), textSelected, $("#bankname").val(), $("#accno").val(), $("#IRC").val(), $("#form-Account-Type :checked").val(), "");
                            }
                            else {
                                //alert("Check The values Supplied for any Error....");
                            }
                        }
                    }
                }
                else if (country_type === "UNITED STATES") {
                    ////alert(yes   " + country_type);
                    var textSele = $("#achCountry :selected").val();
                    ////alert(europ  " + textSele);
                    if (textSele === "") {
                        //alert("Select Valid Country");
                    }
                    else {//paymentThreshold  achcurrency
                        var selcountr = textSele.split("_");
                        var plsrepl = selcountr[1];
                        var textSelected = plsrepl.replace('+', " ");
                        ////alert(europ dfed  " + textSelected);
                        if (textSelected === "UNITED STATES") {
                            ////alert(europ  " + textSele);
                            if ($("#bankname").val() === "" || $("#usacntnum").val() === "" || $("#usinstbrnum").val() === "") {
                                //alert("Fill All the Neccessary blank");
                            }
                            else if ($("#usacntnum").length === 11 || $("#usinstbrnum").length === 7 || $('input[name="Payment-Frequency"]').is(':checked') || $('input[name="Account_Type"]').is(':checked')) {
                                ////alert(payment method " + $("#form-pay-method :checked").val()+"   "+ $("#bankname").val());
                                saveEurope($("#paymentThreshold :selected").val(), $("#form-pay-method :checked").val(), $("#form-pay-frequency :checked").val(), textSelected, $("#bankname").val(), $("#usacntnum").val(), $("#usinstbrnum").val(), $("#form-Account-Type :checked").val(), "");
                            }
                            else {
                                //alert("Check The values Supplied for any Error....");
                            }
                        }
                    }
                }

            }
            else {
                ////alert(please accept the terms and agreement to save changes");
            }

        }
        else {
            //alert("Pls Select your payment method to continue");
            return;
        }
        ////alert(yoo");
    });
    function saveEurope(amnt, paymthd, payfrq, bankcountry, bankname, ibanval, swiftval, acnttype, paycurr) {

        var urlpost = "";
        if (country_type === "EUROPE") {
//            //alert("posted here");
            urlpost = "http://192.168.0.102/medslat/dash/saveEurope";
        }
        else if (country_type === "SINGAPORE") {
            urlpost = "http://192.168.0.102/medslat/dash/saveSingap";
        }
        else if (country_type === "CANADA" || bankcountry === "AUSTRALIA") {
            urlpost = "http://192.168.0.102/medslat/dash/saveCanAust";
        }
        else if (country_type === "HONG KONG") {
            urlpost = "http://192.168.0.102/medslat/dash/saveHongkon";
        }
        else if (country_type === "INDIA") {
            urlpost = "http://192.168.0.102/medslat/dash/saveIndia";
        }
        else if (country_type === "MEXICO") {
            urlpost = "http://192.168.0.102/medslat/dash/saveMexico";
        }
        else if (country_type === "NEW ZEALAND") {
            urlpost = "http://192.168.0.102/medslat/dash/saveNewzeal";
        }
        else if (country_type === "PHILIPPINES") {
            urlpost = "http://192.168.0.102/medslat/dash/savePhilipne";
        }
        else if (country_type === "UNITED STATES") {
            urlpost = "http://192.168.0.102/medslat/dash/saveUnitstat";
        }

        $.post(urlpost,
                {
                    amnt: amnt,
                    paymthd: paymthd,
                    payfrq: payfrq,
                    bankcountry: bankcountry,
                    bankname: bankname,
                    ibanval: ibanval,
                    swiftval: swiftval,
                    acnttype: acnttype,
                    paycurr: paycurr
                },
        function (result) {
            //alert(result);
            if (result === "success 1" || result === "success 2") {
                //alert("Payment Successfully Saved    ");
            }
            else {
                //alert("Payment failed");
            }
        });
//        //alert("this is the continent  "+country_type);
    }// vicsoft latest work ends here
});

$(document).on('click', ".yes_convert", function (e) {
    e.preventDefault();
    e.preventDefault();
    $(".con-proc-stat").text("");
    $(".con-proc-stat").text("Processing, Please wait...");
    var amt = $("#amt").html();
    var frm = $("#frm").html();
    var tt = $("#tt :selected").val();
    // return;
    $.post("http://192.168.0.102/medslat/dash/doCur_Con",
            {
                amt: amt,
                frm: frm,
                tt: tt
            },
    function (o) {
        //alert("Done Processing!");
        $(".con-proc-stat").text("Done Processing!");
        $(".con-proc-result").empty();
        $(".con_amt").html(o);
        $(".con_cur").html(tt);
        $(".wall-stat-tb-bk").html(o);
        $(".wall-stat-tb-ab").html(o);
        $(".wall-stat-tb-cur").html(tt);
    });
});
$(document).on('click', ".no_convert", function (e) {
    e.preventDefault();
    $(".con-proc-stat").empty();
    $(".con-proc-result").empty();
    $('.wall-t-body').empty();
});
$(document).on('change', ".wal-pay-type", function (e) {
    var activetype = 0;
    var optionSelected = $(this).find("option:selected");
    var textSelected = optionSelected.text();
    if (textSelected === "Voucher") {
        activetype = 0;
    } else if (textSelected === "Master Card") {
        activetype = 1;
    } else if (textSelected === "Verve") {
        activetype = 2;
    } else if (textSelected === "Paypal") {
        activetype = 3;
    }
    switchPaytype(activetype);
});
function switchPaytype(activetype) {



    for (var i = 0; i < 4/*paytype.lenght*/; i++) {
        if (i === activetype) {
            $(".fund-" + paytype[i]).css({
                display: "block"
            });
        } else {
            $(".fund-" + paytype[i]).css({
                display: "none"

            });
        }

    }


}

$(document).on('click', ".voucher-subtmit", function (e) {

    $(".fund-voucher-notice").text("");
    $(".fund-voucher-notice").text("loading please wait...");
    $(".funding-reps").text("");
    var pin = $(".v-pin").val();
    if (pin === "") {
        $(".fund-voucher-notice").text("Please input pin");
    } else {
        var currency = code2currency[pin.charAt(0) + pin.charAt(1) + pin.charAt(2)];
        alert($(".myaccount").find('pocl').attr('id') + "equal" + currency);
        if ($(".myaccount").find('pocl').attr('id') === currency) {
            loadpin();
            return;
        }
        $.post("http://192.168.0.102/medslat/dash/currency_converter",
                {
                    amt: "1",
                    frm: currency,
                    tt: $(".myaccount").find('pocl').attr('id')
                },
        function (o) {

            var new_data = JSON.parse(o);
            alert(new_data + "" + new_data.ca);
            if (new_data.ca > 0) {
                $(".fund-voucher-notice").text("");
                $(".fund-voucher-notice").html("<div>you are trying to load voucher in " + currency + "\nand you defualt currency is " + $(".myaccount").find('pocl').attr('id') + "\n\n\
                conversion rate is 1 " + currency + " to " + new_data.ca + " " + $(".myaccount").find('pocl').attr('id') + " \n\
                do you which to continue? <span class='yes_loadvouch'><a href=''>YES</a></span> <span class='no_loadvouch'><a href=''>NO</a></span></div>");
            }
//            $(".con_amt").html(o);
//            $(".con_cur").html(tt);
        });
    }
});



$(document).on('click', ".no_loadvouch", function (e) {
    e.preventDefault();
    $(".fund-voucher-notice").text("");
    $(".funding-reps").html();
});
$(document).on('click', ".yes_loadvouch", function (e) {
    e.preventDefault();
    loadpin();
});
function loadpin() {
    //alert("about to load");
    var pin = $(".v-pin").val();
    var currency = code2currency[pin.charAt(0) + pin.charAt(1) + pin.charAt(2)];
    $.post("http://192.168.0.102/medslat/walletModule/load_voucher",
            {
                voucher: pin,
                frm: currency,
                tt: $(".myaccount").find('pocl').attr('id')
            },
    function (o) {
        // //alert(o);
//            if(o>0){
//                $(".fund-voucher-notice").text("");
//                $(".funding-reps").html("<div>you are trying to load voucher in "+currency+"\nand you defualt currency is "+$(".wall-stat-tb-cur").text()+"\n\n\
//                conversion rate is 1 "+currency+ " to "+o+" "+$(".wall-stat-tb-cur").text()+" \n\
//                do you which to continue? <span class='yes_loadvouch'><a href=''>YES</a></span> <span class='no_loadvouch'><a href=''>NO</a></span></div>");
//               
//            }
//            $(".con_amt").html(o);
//            $(".con_cur").html(tt);
    });
}
//start for widthraw
$(document).on('change', "#form-pay-method input", function () {
    if ($('input[name="Payment-method"]:checked', '#form-pay-method').val() === "DirectDeposit") {
        $(".with-check").css({
            display: 'none'
        });
        $(".with-direct").css({
            display: 'block'
        });
    } else {
        $(".with-check").css({
            display: 'block'
        });
        $(".with-direct").css({
            display: 'none'
        });
    }
});
var country_type = "";
$(document).on('change', "#achCountry", function () {//
    $(".bank-notice").empty();
    var optionSelected = $(this).find("option:selected");
    var textSelected = optionSelected.text();
//    //alert(textSelected);
    if (textSelected === "AUSTRALIA") {
        country_type = "AUSTRALIA";
        $(".bank-details-help").empty();
        $(".bank-details-help").css({display: 'block'});
        var help_div = "<div><div><span ><b style='color: rgb(243, 145, 7); >Account Number</b></span> <span> is 5-9 digits numeric. Do not enter dashes or spaces.</span></div>\n\
                        <div><span ><b style='color: rgb(5, 149, 43);>BSB Code</b></span> <span> is 6 digits numeric. The BSB (Bank, State, Branch) number is six digits and consists of the following:\n\
                        <ul style='margin-left: 50px;'>\n\
                        <li>A two-digit bank number.</li>\n\
                        <li>A one-digit state number.</li>\n\
                        <li>A three-digit branch number.</li>\n\
                        </ul></span></div>\n\
                        <div>For example, if the BSB number is <b>032001</b>, 03 is the bank number, <b>2</b> is the state number, and <b>001</b> is the branch number. Do not enter dashes or spaces.</div>\n\
                        <div><b>Note</b>: Australian credit union accounts cannot be used for XACH.</div>\n\
                        <div>";
        $(".bank-details-help").html(help_div);
    } else if (textSelected === "AUSTRIA" || textSelected === "BELGIUM" || textSelected === "BULGARIA" || textSelected === "CYPRUS" || textSelected === "CZECH REP"
            || textSelected === "DENMARK" || textSelected === "ESTONIA" || textSelected === "FINLAND" || textSelected === "FRANCE" || textSelected === "FRENCH GUIANA"
            || textSelected === "GERMANY" || textSelected === "GIBRALTAR" || textSelected === "GREECE" || textSelected === "GUADELOUPE" || textSelected === "HUNGARY"
            || textSelected === "ICELAND" || textSelected === "IRELAND" || textSelected === "ITALY" || textSelected === "LATVIA" || textSelected === "LIECHTENSTEIN" ||
            textSelected === "LITHUANIA" || textSelected === "LUXEMBOURG" || textSelected === "MALTA" || textSelected === "MARTINIQUE" || textSelected === "MAYOTTE" ||
            textSelected === "MONACO" || textSelected === "NETHERLANDS" || textSelected === "NORWAY" || textSelected === "POLAND" ||
            textSelected === "PORTUGAL" || textSelected === "REUNION IS" || textSelected === "ROMANIA" || textSelected === "SLOVAK REP" || textSelected === "SLOVENIA" ||
            textSelected === "SPAIN" || textSelected === "ST PIERRE MIQUELON" || textSelected === "SWEDEN" || textSelected === "SWITZERLAND" || textSelected === "UNITED KINGDOM") {
        country_type = "EUROPE";
        $(".bank-details-help").empty();
        $(".bank-details-help").css({display: 'block'});
        $(".pay-currency").css({display: 'none'});
        if (textSelected === "AUSTRIA") {
            iban = 20;
        } else if (textSelected === "BELGIUM") {
            iban = 16;
        } else if (textSelected === "BULGARIA") {
            iban = 22;
        } else if (textSelected === "CYPRUS") {
            iban = 28;
        } else if (textSelected === "CZECH REP") {
            iban = 24;
        } else if (textSelected === "DENMARK") {
            iban = 18;
        } else if (textSelected === "ESTONIA") {
            iban = 20;
        } else if (textSelected === "FINLAND") {
            iban = 18;
        } else if (textSelected === "FRANCE") {
            iban = 27;
        } else if (textSelected === "FRENCH GUIANA") {
            iban = 27;
        } else if (textSelected === "GERMANY") {
            iban = 22;
        } else if (textSelected === "GIBRALTAR") {
            iban = 23;
        } else if (textSelected === "GREECE") {
            iban = 27;
        } else if (textSelected === "GUADELOUPE") {
            iban = 27;
        } else if (textSelected === "HUNGARY") {
            iban = 28;
        } else if (textSelected === "ICELAND") {
            iban = 26;
        } else if (textSelected === "IRELAND") {
            iban = 22;
        } else if (textSelected === "ITALY") {
            iban = 27;
        } else if (textSelected === "LATVIA") {
            iban = 21;
        } else if (textSelected === "LIECHTENSTEIN") {
            iban = 21;
        } else if (textSelected === "LITHUANIA") {
            iban = 20;
        } else if (textSelected === "LUXEMBOURG") {
            iban = 20;
        } else if (textSelected === "MALTA") {
            iban = 31;
        } else if (textSelected === "MARTINIQUE") {
            iban = 27;
        } else if (textSelected === "MAYOTTE") {
            iban = 27;
        } else if (textSelected === "MONACO") {
            iban = 27;
        } else if (textSelected === "NETHERLANDS") {
            iban = 18;
        } else if (textSelected === "NORWAY") {
            iban = 15;
        } else if (textSelected === "POLAND") {
            iban = 28;
        } else if (textSelected === "PORTUGAL") {
            iban = 25;
        } else if (textSelected === "REUNION IS") {
            iban = 27;
        } else if (textSelected === "ROMANIA") {
            iban = 24;
        } else if (textSelected === "SLOVAK REP") {
            iban = 24;
        } else if (textSelected === "SLOVENIA") {
            iban = 19;
        } else if (textSelected === "SPAIN") {
            iban = 24;
        } else if (textSelected === "ST PIERRE MIQUELON") {
            iban = 27;
        } else if (textSelected === "SWEDEN") {
            iban = 24;
        } else if (textSelected === "SWITZERLAND") {
            iban = 21;
            $(".bank-notice").html(" <span> <b>Remember!</b> Payments made via international direct deposit will be deposited in the local currency of the country selected.* Bank accounts utilized to receive ClickBank international direct deposits must be denominated in that local currency in order for the deposit to be successful.* XACH deposits are available in multiple currencies for Canada (CAD, USD), United Kingdom (GBP, EUR) and Switzerland (CHF, EUR).</span>");
        } else if (textSelected === "UNITED KINGDOM") {

            iban = 22;
            $(".pay-currency").css({display: 'block'});
            $("#achcurrency").empty();
            $("#achcurrency").append('<option value="GBP">GBP - British Pound</option><option value="EUR">EUR - Euro</option>');
            $(".bank-notice").html(" <span> <b>Remember!</b> Payments made via international direct deposit will be deposited in the local currency of the country selected.* Bank accounts utilized to receive ClickBank international direct deposits must be denominated in that local currency in order for the deposit to be successful.* XACH deposits are available in multiple currencies for Canada (CAD, USD), United Kingdom (GBP, EUR) and Switzerland (CHF, EUR).</span>");
        }
        var help_div_ = "<div>\n\
                        <div><b style='color: rgb(243, 145, 7);'>IBAN</b> is " + iban + "-Alphanumeric. Do not enter dashes or spaces.</div>\n\
                        <div><b style='color: rgb(5, 149, 43);'>SWIFT BIC</b> is 8- or 11-Alphanumeric. If your SWIFT BIC is 11 characters, and the last 3 characters are " + '"' + "XXX" + '"' + " then do not enter the " + '"' + "XXX" + '"' + " (enter only the first 8 characters)</div>\n\
                        </div>";
        $(".bank-details-help").html(help_div_);
        $(".for-iban").css({display: 'block'});
        $(".bank-details-others").css({display: 'block'});
        $(".bank-d-o-acc").css({display: 'block'});
        $(".with-acc-type").css({display: 'block'});
        $(".for-regular-sp").css({display: 'none'});
        $(".for-regular-ph").css({display: 'none'});
        $(".surfix-txt").css({display: 'none'});
        $(".for-regular").css({display: 'none'});
    } else if (textSelected === "CANADA") {
        country_type = "CANADA";
        var help_div__ = "<div><div><span ><b style='color: rgb(243, 145, 7);'>Account Number</b></span> <span> is up to 12 digits numeric. Do not enter dashes or spaces.</span></div>\n\
                        <div><span><b style='color: rgb(5, 149, 43)';>Institution/Branch Transit Number</b></span> <span> is 9 digits numeric. The institution/branch transit number consists of the following in exactly this order:\n\
                        <ul style='margin-left: 50px;'>\n\
                        <li>A four-digit institution number. <b>Note</b>: The institution number may show up as a three digit value and you will need to add a leading zero to make it 4 digits.</li>\n\
                        <li>A five-digit branch transit number.</li>\n\
                        \n\
                        </ul></span></div>\n\
                        <div>For example, if the institution number is <b>010</b>, and the branch transit number is <b>12345</b>, the institution/branch transit number you use is <b>001012345</b>.</div>\n\
                        <div><img height='150px' width ='250px' src='http://192.168.0.102/medslat/public/images/check_info_ca.gif'></div>\n\
                        <div>";
        $(".bank-details-help").html(help_div__);
        $(".bank-details-help").css({display: 'block'});
        $(".for-iban").css({display: 'none'});
        $(".for-regular").css({display: 'block'});
        $(".for-regular-ca").css({display: 'block'});
        $(".for-regular-us").css({display: 'none'});
        $(".for-regular-hk").css({display: 'none'});
        $(".for-regular-nz").css({display: 'none'});
        $(".for-regular-mx").css({display: 'none'});
        $(".for-regular-ph").css({display: 'none'});
        $(".for-regular-sp").css({display: 'none'});
        $(".for-regular-in").css({display: 'none'});
        $(".bank-details-others").css({display: 'block'});
        $(".bank-d-o-acc").css({display: 'block'});
        $(".with-acc-type").css({display: 'block'});
        $(".pay-currency").css({display: 'block'});
        $("#achcurrency").empty();
        $("#achcurrency").append('<option value="CAD">CAD - Canadian Dollar</option><option value="USD">USD - US Dollar</option>');
    } else if (textSelected === "HONG KONG") {
        country_type = "HONG KONG";
        var help_div_ = "<div><div><span ><b style='color: rgb(243, 145, 7);'>Account Number</b></span> <span> is Between 1 to 12 digits numeric. Do not enter dashes or spaces.</span></div>\n\
                        <div><b style='color: rgb(5, 149, 43);'>SWIFT BIC</b> is 8- or 11-Alphanumeric. If your SWIFT BIC is 11 characters, and the last 3 characters are " + '"' + "XXX" + '"' + " then do not enter the " + '"' + "XXX" + '"' + " (enter only the first 8 characters)</div>\n\
                        <div>";
        $(".bank-details-help").html(help_div_);
        $(".bank-details-help").css({display: 'block'});
        $(".for-iban").css({display: 'none'});
        $(".for-regular").css({display: 'block'});
        $(".for-regular-ca").css({display: 'none'});
        $(".for-regular-us").css({display: 'none'});
        $(".for-regular-hk").css({display: 'block'});
        $(".for-regular-nz").css({display: 'none'});
        $(".for-regular-ph").css({display: 'none'});
        $(".for-regular-mx").css({display: 'none'});
        $(".for-regular-sp").css({display: 'none'});
        $(".for-regular-in").css({display: 'none'});
        $(".bank-details-others").css({display: 'block'});
        $(".bank-d-o-acc").css({display: 'block'});
        $(".with-acc-type").css({display: 'block'});
        $(".pay-currency").css({display: 'none'});
        $("#achcurrency").empty();
        $("#achcurrency").append('<option value="CAD">CAD - Canadian Dollar</option><option value="USD">USD - US Dollar</option>');
    } else if (textSelected === "INDIA") {
        country_type = "INDIA";
        var help_div_ = "<div><div><span ><b style='color: rgb(243, 145, 7);'>Account Number</b></span> <span> is Between 1 to 12 digits numeric. Do not enter dashes or spaces.</span></div>\n\
                        <div><b style='color: rgb(5, 149, 43);'>Indian Financial System Code (IFSC)</b> is 11 digits alphanumeric. Consists of the following in exactly this order:\n\
                        <ul style='margin-left: 50px;'>\n\
                        <li>A four-letter alphabetic bank code.</li>\n\
                        <li>A zero (0).</li>\n\
                        <li>A six character branch code</li>\n\
                        \n\
                        </ul></div>\n\
                        <div<b>Example:</b> SCBL0036001</div>\n\
                        <div>";
        $(".bank-details-help").html(help_div_);
        $(".bank-details-help").css({display: 'block'});
        $(".for-iban").css({display: 'none'});
        $(".for-regular").css({display: 'block'});
        $(".for-regular-ca").css({display: 'none'});
        $(".for-regular-ca").css({display: 'none'});
        $(".for-regular-nz").css({display: 'none'});
        $(".for-regular-ph").css({display: 'none'});
        $(".for-regular-us").css({display: 'none'});
        $(".for-regular-sp").css({display: 'none'});
        $(".for-regular-mx").css({display: 'none'});
        $(".for-regular-in").css({display: 'block'});
        $(".bank-details-others").css({display: 'block'});
        $(".bank-d-o-acc").css({display: 'block'});
        $(".with-acc-type").css({display: 'block'});
        $(".pay-currency").css({display: 'none'});
    } else if (textSelected === "MEXICO") {
        country_type = "MEXICO";
        var help_div_ = "<div>\n\
                        <div><b style='color: rgb(5, 149, 43);'>CLABE</b> is 11 digits alphanumeric. Consists of the following in exactly this order:\n\
                        <ul style='margin-left: 50px;'>\n\
                        <li>A three-digit bank code.</li>\n\
                        <li>A three-digit bank plaza code./li>\n\
                        <li>An eleven-digit account number.</li>\n\
                        <li>A one-digit check digit.</li>\n\
                        \n\
                        </ul></div>\n\
                        <div>";
        $(".bank-details-help").html(help_div_);
        $(".bank-details-help").css({display: 'block'});
        $(".for-iban").css({display: 'none'});
        $(".for-regular").css({display: 'block'});
        $(".for-regular-ca").css({display: 'none'});
        $(".for-regular-ca").css({display: 'none'});
        $(".for-regular-nz").css({display: 'none'});
        $(".for-regular-ph").css({display: 'none'});
        $(".for-regular-us").css({display: 'none'});
        $(".for-regular-in").css({display: 'none'});
        $(".for-regular-sp").css({display: 'none'});
        $(".for-regular-mx").css({display: 'block'});
        $(".bank-details-others").css({display: 'block'});
        $(".bank-d-o-acc").css({display: 'block'});
        $(".with-acc-type").css({display: 'block'});
        $(".pay-currency").css({display: 'none'});
    } else if (textSelected === "NEW ZEALAND") {
        country_type = "NEW ZEALAND";
        var help_div_n = "<div><div><span ><b style='color: rgb(243, 145, 7);'>Account Number</b></span> <span> is up to 8 digits numeric. Do not enter dashes or spaces.</span></div>\n\
                            <div><span ><b style='color: rgb(243, 145, 7);'>Suffix</b></span> <span> is up to 4 digits numeric. Do not enter dashes or spaces.</span></div>\n\
                        <div><b style='color: rgb(5, 149, 43);'>Bank/Branch Number</b> is 6 digits numeric. The bank/branch number consists of the following:\n\
                        <ul style='margin-left: 50px;'>\n\
                        <li>A two-digit bank number.</li>\n\
                        <li>A four-digit branch number.</li>\n\
                        \n\
                        </ul></div>\n\
                        <divFor example, if the bank/branch number is <b>030123</b>, <b>03</b> is the bank number and <b>0123</b> is the branch number. Do not enter dashes or spaces.\n\
                        <div><b>Note:</b> NZ credit union accounts cannot be used for XACH.</div>\n\
                        <div>";
        $(".bank-details-help").html(help_div_n);
        $(".bank-details-help").css({display: 'block'});
        $(".for-iban").css({display: 'none'});
        $(".for-regular").css({display: 'block'});
        $(".for-regular-ca").css({display: 'none'});
        $(".for-regular-ca").css({display: 'none'});
        $(".for-regular-us").css({display: 'none'});
        $(".for-regular-mx").css({display: 'none'});
        $(".for-regular-in").css({display: 'none'});
        $(".for-regular-ph").css({display: 'none'});
        $(".for-regular-sp").css({display: 'none'});
        $(".for-regular-nz").css({display: 'block'});
        $(".bank-details-others").css({display: 'block'});
        $(".bank-d-o-acc").css({display: 'block'});
        $(".with-acc-type").css({display: 'block'});
        $(".pay-currency").css({display: 'none'});
    } else if (textSelected === "PHILIPPINES") {
        country_type = "PHILIPPINES";
        var help_div_p = "<div>\n\
                        <div><b style='color: rgb(243, 145, 7);'>Account Number</b> is Up to 35 digits numeric. Do not enter dashes or spaces</div>\n\
                        <div><b style='color: rgb(5, 149, 43);'>Bank ID</b> is 8- or 11-Alphanumeric. If your SWIFT BIC is 11 characters, and the last 3 characters are " + '"' + "XXX" + '"' + " then do not enter the " + '"' + "XXX" + '"' + " (enter only the first 8 characters)</div>\n\
                        </div>";
        $(".bank-details-help").html(help_div_p);
        $(".bank-details-help").css({display: 'block'});
        $(".for-iban").css({display: 'none'});
        $(".for-regular").css({display: 'block'});
        $(".for-regular-ca").css({display: 'none'});
        $(".for-regular-ca").css({display: 'none'});
        $(".for-regular-mx").css({display: 'none'});
        $(".for-regular-us").css({display: 'none'});
        $(".for-regular-in").css({display: 'none'});
        $(".for-regular-nz").css({display: 'none'});
        $(".for-regular-sp").css({display: 'none'});
        $(".for-regular-ph").css({display: 'block'});
        $(".bank-details-others").css({display: 'block'});
        $(".bank-d-o-acc").css({display: 'block'});
        $(".with-acc-type").css({display: 'block'});
        $(".pay-currency").css({display: 'none'});
    } else if (textSelected === "SINGAPORE") {
        country_type = "SINGAPORE";
        var help_div_ = "<div><div><span ><b style='color: rgb(243, 145, 7);'>Account Number</b> Up to 11 digits numeric. Do not enter dashes or spaces.</span></div>\n\
                        <div><b style='color: rgb(5, 149, 43);'>International Routing Code</b> is  exactly 7 digits numeric. Consists of the following in exactly this order:\n\
                        <ul style='margin-left: 50px;'>\n\
                        <li>A four digit local bank code.</li>\n\
                        <li>A three digit branch code.</li>\n\
                        </ul></div>\n\
                        <div>";
        $(".bank-details-help").html(help_div_);
        $(".bank-details-help").css({display: 'block'});
        $(".for-iban").css({display: 'none'});
        $(".for-regular").css({display: 'block'});
        $(".for-regular-ca").css({display: 'none'});
        $(".for-regular-us").css({display: 'none'});
        $(".for-regular-ca").css({display: 'none'});
        $(".for-regular-nz").css({display: 'none'});
        $(".for-regular-ph").css({display: 'none'});
        $(".for-regular-mx").css({display: 'none'});
        $(".for-regular-in").css({display: 'none'});
        $(".for-regular-sp").css({display: 'block'});
        $(".bank-details-others").css({display: 'block'});
        $(".bank-d-o-acc").css({display: 'block'});
        $(".with-acc-type").css({display: 'block'});
        $(".pay-currency").css({display: 'none'});
    } else if (textSelected === "UNITED STATES") {
        country_type = "UNITED STATES";
        var help_div__ = "<div><div><span ><b style='color: rgb(243, 145, 7);'>Account Number</b></span> <span> is 3-17 digits numeric. Do not enter dashes or spaces.</span></div>\n\
                        <div><span><b style='color: rgb(5, 149, 43)';>Routing Code</b></span> <span> 9 digits numeric. Begins with a 0, 1, 2, or 3. Do not enter dashes or spaces. Note: The routing number you enter must be taken from a check from your account. Do not utilize the number off of a deposit slip; this number is not the same and will not work for ACH purposes.\n\
                        </span></div>\n\
                        <div><img height='150px' width ='250px' src='http://192.168.0.102/medslat/public/images/check_info_u.gif'></div>\n\
                        <div>";
        $(".bank-details-help").html(help_div__);
        $(".bank-details-help").css({display: 'block'});
        $(".for-iban").css({display: 'none'});
        $(".for-regular").css({display: 'block'});
        $(".for-regular-us").css({display: 'block'});
        $(".for-regular-ca").css({display: 'none'});
        $(".for-regular-hk").css({display: 'none'});
        $(".for-regular-nz").css({display: 'none'});
        $(".for-regular-mx").css({display: 'none'});
        $(".for-regular-ph").css({display: 'none'});
        $(".for-regular-sp").css({display: 'none'});
        $(".for-regular-in").css({display: 'none'});
        $(".bank-details-others").css({display: 'block'});
        $(".bank-d-o-acc").css({display: 'block'});
        $(".with-acc-type").css({display: 'block'});
    }


});
//end for withdraw
//vicsoft Script start here ..
function jj_title(txt) {
    $(".Txt_WALLET").text("");
    $(".Txt_WALLET").text(txt);
}
$(document).on('click', '.currencies', function (e) {
    if ($(window).width() <= 600 || $(window).height() <= 400) {
        $(this).css("background", "#eee").siblings().css("background", "#fff");
    } else {
        $(this).css("background", "#eee").siblings().css("background", "#424A5D");
    }
    loadcurcombo();
    switchtab();
    $('.frombydate').empty();
    $('.tobydate').empty();
    $('.wall-t-body').empty();
    $('.w-m-cont .currency').css({display: 'block'});
    jj_title("CONVERT CURRENCY");
    e.preventDefault();
});

$(document).on('click', '#invoice', function ()
{

    if ($(window).width() <= 600 || $(window).height() <= 400) {
        $(this).css("background", "#eee").siblings().css("background", "#fff");
    } else {
        $(this).css("background", "#eee").siblings().css("background", "#424A5D");
    }
    switchtab();
    $('.frombydate').empty();
    $('.tobydate').empty();
    $('.wall-t-body').empty();
    $('.w-m-cont .invoice').css({display: 'block'});
    jj_title("INVOICE LIST");
})

$(document).on('click', '#funds', function () {
    if ($(window).width() <= 600 || $(window).height() <= 400) {
        $(this).css("background", "#eee").siblings().css("background", "#fff");
    } else {
        $(this).css("background", "#eee").siblings().css("background", "#424A5D");
    }
    switchtab();
    $('.frombydate').empty();
    $('.tobydate').empty();
    $('.wall-t-body').empty();
    $('.w-m-cont .fund').css({display: 'block'});
    jj_title("FUND WALLET");
});

$(document).on('click', '#withdraws', function () {
    if ($(window).width() <= 600 || $(window).height() <= 400) {
        $(this).css("background", "#eee").siblings().css("background", "#fff");
    } else {
        $(this).css("background", "#eee").siblings().css("background", "#424A5D");
    }
    switchtab();
    $('.frombydate').empty();
    $('.tobydate').empty();
    $('.wall-t-body').empty();
    $('.w-m-cont .withdraw').css({display: 'block'});
    jj_title("PAYMENT");
});
$(document).on('click', '#transactions', function () {
    if ($(window).width() <= 600 || $(window).height() <= 400) {
        $(this).css("background", "#eee").siblings().css("background", "#fff");
    } else {
        $(this).css("background", "#eee").siblings().css("background", "#424A5D");
    }
    switchtab();
    $('.frombydate').empty();
    $('.tobydate').empty();
    $('.wall-t-body').empty();
    $('.w-m-cont .transaction').css({display: 'block'});
    jj_title("TRANSACTION HISTORY");
});
function switchtab() {
    $('.w-m-cont .transaction').css({display: 'none'});
    $('.w-m-cont .fund').css({display: 'none'});
    $('.w-m-cont .invoices').css({display: 'none'});
    $('.w-m-cont .currency').css({display: 'none'});
    $('.w-m-cont .withdraw').css({display: 'none'});
}
function loadcurcombo() {
    $(this).css("background", "#eee");
    var urlch = 'http://192.168.0.102/medslat/dash/combocurrency/';
    $.get(urlch, function (data) {
        var new_data = JSON.parse(data);
        $('.currenccombo').empty();
        $.each(new_data, function (id, ob) {
            $('.currenccombo').append('<option value="' + ob.currency + '">' + ob.country + '</option>');
        });
    });
}
function setTitle(value) {
    $('.Txt_REFER').text(value);
}
$(function () {
    $(document).on('click', '.mypat', function () {
        $(this).css("background", "#eee");
        switchtab();
        $('.refer .myrefs').css({display: 'block'});
        setTitle("MY HOSPITAL PATIENTS");
    });
    $(document).on('click', '.mydoctors', function () {
        if ($(window).width() <= 600 || $(window).height() <= 400) {
            $(this).css("background", "#eee").siblings().css("background", "#fff");
        } else {
            $(this).css("background", "#eee").siblings().css("background", "#424A5D");
        }
        switchtab();
        $('.refer .mydoc').css({display: 'block'});
        setTitle("MY DOCTORS");
    });
    $(document).on('click', '.mynurses', function () {
        if ($(window).width() <= 600 || $(window).height() <= 400) {
            $(this).css("background", "#eee").siblings().css("background", "#fff");
        } else {
            $(this).css("background", "#eee").siblings().css("background", "#424A5D");
        }
        switchtab();
        $('.refer .mynurse').css({display: 'block'});
        setTitle("MY NURSES");
    });

    $(document).on('click', '.refer .myrefs li', function () {
        $(this).css("background", "rgb(67, 123, 189)").siblings().css("background", "rgb(91, 192, 222)");
    });
//[id^=pat_]
    $(document).on('click', "[class^=ed-mailing]", function () {
        var num_arry = $(this).attr("id").split("-");
        var ed_cls = num_arry[1] + "-" + num_arry[2];
        alert("." + ed_cls);
        $('.' + ed_cls).text("a");
        $('.txt-' + ed_cls).css({
            display: 'block'
        });

    });
    $(document).on('click', '.ref2me', function () {
        alert("refer to me");
    });

});

$(document).on('click', '#saveChanges', function () {
    var name = $(".txt-mailing-fn .form-control").val();
    var str = $(".txt-mailing-st .form-control").val();
    var city = address_comp['province'];
    var cout = address_comp['country'];
    var zip = address_comp['postal_code'];
    $.post("http://192.168.0.102/medslat/walletModule/savecheck", {name: name, street: str, city: city, country: cout, zip: zip}, function (resp) {
        console.log(resp);
    })
});
$(document).on('click', '#withdraws', function () {
    $.get("http://192.168.0.102/medslat/walletModule/getcheck", function (resp) {
        var $data = JSON.parse(resp);
            $data=$data[0];
        $(".txt-mailing-fn .form-control").val($data.full_name)
        $(".txt-mailing-st .form-control").val($data.street);
        $(".txt-mailing-ct .form-control").val($data.city);
        $(".txt-mailing-cn .form-control").val($data.country);
        $(".txt-mailing-zp .form-control").val($data.zipcode);
    })
});
$(document).on("mouseover", ".mailin-add-wrap .form-control", function () {
    if ($(".wallpayadd").val() && $(".wallpayadd").hasClass("set")) {
        $(".txt-mailing-ct input").val(address_comp['province']);
        $(".txt-mailing-cn input").val(address_comp['country']);
        $(".txt-mailing-zp input").val(address_comp['postal_code']);
    }
})
$(document).on("click", "#invoice", function () {

    var new_data = "";

    var url22 = 'http://192.168.0.102/medslat/walletModule/getinvoice/';

    $.get(url22, function (data) {
        new_data = JSON.parse(data);
        if (new_data.length > 0) {
            var counter = 0;
            $.each(new_data, function (id, ob) {
                counter += 1;
                $("#elem-body").empty();
                $("#elem-body").append("<tr mn_xid='" + ob.inv_id + "' class='invoice_elem'><td>" + counter + "</td> <td>" + ob.inv_to + "</td><td>" + ob.inv_id + "</td> \n\
<td>" + ob.inv_date + "</td><td><a href='' class='mlink'>View</a></td></tr>");
            });
        }
        else {
            $("#invoiceList").empty();
            $("#invoiceList").append("<table class='table table-bordered'> \n\
<thead><tr><th>S/N</th><th>Invoice To </th><th>Invoice id </th><th>Invoice Date</th> \n\
</tr></thead><tbody> <tr class='invoice_elem'><td></td><td></td><td>No Invoice Yet</td> \n\
<td></td></tr></tbody></table></div>");
        }
    });
    $('.w-m-cont .invoices').css({display: 'block'});
    jj_title("INVOICE LIST");
});


$(document).on('click', '.wallet-acc-tran', function (e) {
//    var temp = document.getElementById("myTable").rows[i].cells[j].innerHTML;
//    alert(temp);

})

$(document).on('click', '.mlink', function (e) {
//     alert('that is the page link');
    e.preventDefault();
    var inv_data = $(this).parent().parent().attr('mn_xid');

    $.post('http://192.168.0.102/medslat/walletModule/getinvoiced',
            {
                params: inv_data,
            },
            function (result) {
                n_result = JSON.parse(result);

                $('#invoiceModal').modal();
                $('#descur').html(n_result[0].currency);
                $('#descoutput').html(n_result[0].description);
                $('#descamount').html(n_result[0].amount);
                $('#descid').html(n_result[0].inv_id);
            })
})




