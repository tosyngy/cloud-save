var $clone;
var uptri;
var mapindex  = {"firstname" : "fn",  "lastname" : "ln", "gender" : "gender", "country_code" : "countrycode",  "dateOfBirth" : "dob",  "placeOfBirth" : "pob",    "genotype" : "genotype", "bloodgroup" : "bloodgroup",    "speciality" : "specialty",   "license_num" : "license_num",  "homeAddress" : "add1",    "city" : "city",  "state" : "state",    "country" : "country","mobile" : "pno1","postalAddress" : "add2", "landline" : "pno2",  "emaName1" : "ename",   "emaRelationship1" : "erela",    "emaMobile1" : "emobile",   "emaName2" : "ename2",    "emaRelationship2" : "erela2",    "emaMobile2" : "emobile2",    "office_name" : "officename", "officeMobile" : "officemobile",  "officeAdd" : "officeadre",  "longitute" : "longitude",    "latitude" : "latitude"};

var definevalue = {"gender": ["male", "female"], "genotype": ["as", "aa", "ss"], "bloodgroup": ["o+", "o-", "b+", "b-", "a+", "a-"], "erela": ["brother", "sister", "father", "mother", "son", "daughter", "nephew", "cousin", "wive", "husband", "others"]};
$(document).on("click", ".tgClass", function (e) {
    $("[name=countrycode]").css({"border":"1px solid #008bdd","top":"-19px"}).removeAttr("disabled");
    if ($(this).hasClass("edit") && !$(this).hasClass("active")) {
        var tri = $(this).parent().parent();
        uptri = tri;
        $clone = tri.clone(true);
        $(this).addClass("active");
        tri = tri.find(".up-text");
        var form = $(this).parent().parent().find("form");
        $(tri).each(function () {
            var text = $.trim($(this).text());
            var name = $.trim($(this).attr("name"));
            var id = $.trim($(this).attr("id"));
            var type = "text";
            var list = "";
            var cls = "";
            var edit = "";
            $(this).text("");
            if (name === "city" || name === "state" || name === "country" || name === "email") {
                edit = "disabled";
            }
            if (name === "pob" || name === "add1" || name === "officeadre") {
                cls = " autocomplete ";
            }
            if (id === "gend") {
                list = "sex";
            }
            if (name === "genotype") {
                list = "genotype";
            }
            if (name === "specialty") {
                list = "specialul";
            }
            if (name === "bloodgroup") {
                list = "blood-group";
            }
            if (name === "rel") {
                list = "religion-list";
            }
            if (name === "erela" || name === "erela2") {
                list = "relationship-list";
            }
            if (name === "pno2" || name === "pno1" || name === "emobile" || name === "emobile2" || name === "officemobile") {
                type = "number";
            }
            var input = $('<input  ' + edit + ' class="form-control input-lg' + cls + '" list="' + list + '" id="" type="' + type + '" style="width:100% !important; margin-top:20px;" value="' + text + '" name="' + name + '" />');
            $(this).append(input);
        });
        $(form).append("<button type='submit' class='btn-lg btn-success update-pf' name='" + form.attr("id") + "'  style='width:50% !important; margin-top:20px;'>Save Changes</button>");
        $(form).append("<button type='button' class='btn-lg btn-danger cancel-pf' name='" + form.attr("id") + "'  style='width:50% !important; margin-top:20px;'>Cancel </button>");
        $("input[name=dob]").trigger("click");
    }
    var h = $(".mainprofile").height();
    $(".mainprofile").animate({scrollTop: $(".mainprofile").height()}, "slow");
});

$(document).on("click", ".menu-li", function () {
    var h = $(".mainprofile").height();
    $(".mainprofile").animate({scrollTop: h}, "slow");
});


/////////////////////////////////////////////////////////////////////////
//$(document).on("click", ".update-pf", function (e) {
//        $(".form.formin").trigger("submit");
//        e.preventDefault();
//});
$(document).on("click", ".update-pf", function (e) {
    e.preventDefault();
//    var tri="#"+$(this).attr("name");
    var tri = $(this).parent().find("input");
    var text = "coming_from=prof&";
    $(tri).each(function () {
        var name = $(this).attr("name");
        var data = $(this).val();
        if (name === "email") {
            //dont set the email 
        } else if (name === "gender" || name === "genotype" || name === "bloodgroup" || name === "erela" || name === "erela2") {
            if (test_data(name.toLowerCase(), data.toLowerCase())) {
                text += name + "=" + data + "&";
            }
        } else if (name === "timezone") {
            if (data.indexOf("GMT") > -1 && data.length < 7) {
                text += name + "=" + data + "&";
            }
        } else {
            text += name + "=" + data + "&";
        }
    });
        $(".cancel-pf").trigger("click");
    text = text.replace(/\+/g, '%20');
    UpdateProfile(text);

});
var UpdateProfile = function UpdateProfile(name) {
    //cancela submit 
    $(".update-pf").on("submit", false);
    $(".form.formin").on("submit", false);
    $.jCryption.authenticate("Tosyn205", "http://192.168.0.102/medslat/index/jcryption?getPublicKey=true", "http://192.168.0.102/medslat/index/jcryption?handshake=true", function (AESKey)
    {
        var encryptedString = $.jCryption.encrypt(name, "Tosyn205");
        $.post("http://192.168.0.102/medslat/index/profileUpdate", {jCryption: encryptedString}, function (data) {
            var new_data = JSON.parse(data);
            $.each(new_data[0], function (key, value2) {
                if(mapindex[key]){
                          $("[name="+mapindex[key]+"]").text(value2); 
                }
            });
        });
    });
};
$(document).on("onkeyup", "input[type=email]", function () {
    var email = $(this).val();
    if (email.indexOf("@") === -1 || email.indexOf(".") === -1) {
        $(this).select().css("border", "solid 2px red");
        return;
    }
});
$(document).on("click", "input[name=dob]", function () {
    if (!$(this).hasClass("active")) {
        $('input[name=dob]').datepicker({dateFormat: 'dd.mm.yy'});
        $(this).addClass("active");
    }

});
$(document).on("click", ".cancel-pf", function () {
    cancelT("");
});
function cancelT(rep) {
    console.log("here")
        $("[name=countrycode]").css({"border":"none !important","top":"-10px"}).attr("disabled","disabled");
    $(uptri).replaceWith($clone);
}

$(document).on("mouseover", "input[name=add1]", function () {
    getaddr();
});
$(document).on("mouseover", "input[name=city]", function () {
    getaddr();
});
$(document).on("mouseover", "input[name=state]", function () {
    getaddr();
});
$(document).on("mouseover", "input[name=country]", function () {
    getaddr()
});
function getaddr() {
    if ($("input[name=add1]").attr("placeholder") === "Enter a location" && $("input[name=add1]").attr("placeholder").length !== 0) {
        $("input[name=city]").val(address_comp.city);
        $("input[name=state]").val(address_comp.province);
        $("input[name=country]").val(address_comp.country);
        $("input[name=longitute]").val(address_comp.long);
        $("input[name=latitude]").val(address_comp.lat);
    }
}
function test_data(id, value) {
    if ($.inArray(value, definevalue[id]) > -1)
        return true;
    return false;
}
//    ///////////////////picture uploads here ooooooooo///////////////////
$(document).on("click", ".prof_dp_edit", function (ev) {

    $(".done_pix_btn").hide();
    var allowed = "image/jpeg,image/jpg,image/png,image/gif";

    $('.input_banner').trigger('click').change(function (e) {

        e.preventDefault();

        if (this.files && this.files[0]) {
            fileMan = new FileReader();
            fileMan.readAsDataURL(this.files[0]);
            fileMan.onload = function (e) {
                pixTemp = e.target.result;
                fileType = pixTemp.substring(5, pixTemp.indexOf(";"));
                if (allowed.indexOf(fileType) < 0) {
                    alert(' The File Type You Chose Is Not Supported!\nPlease Select A Valid Image File');
                } else {
                    $('.filley').empty();
                    $('.filley').append('<img class="defualeditimage img-thumbnail" src="' + pixTemp + '">')
                    var newpic = pixTemp.replace(/^data:image\/(png|jpg|jpeg|gif|bmp);base64,/, "");
                    $('#prof_dp_img').attr("src", pixTemp);

                    $(".done_pix_btn").slideDown("slow");
                }
            }
        }
    });
});

$(document).on("click", ".done_pix_btn", function (ev) {
    $('.savepix').trigger('click');
    $(".done_pix_btn").hide();
})
//
$(document).on("mouseover", "#prof_dp_img, #prof_dp_edit", function (event) {

    $(".prof_dp_edit").css({
        display: "block"
    });
});
$(document).on("mouseleave", "#prof_dp_img", function (event) {
    $(".prof_dp_edit").css({
        display: "none"
    });
});
$(document).on("click", ".savepix", function (event) {
    var pix = pixTemp;
    var newpic = pix.replace(/^data:image\/(png|jpg|jpeg|gif|bmp);base64,/, "");
    event.preventDefault();
    $.post("http://192.168.0.102/medslat/profileModule/savefile",
            {
                pix: newpic
            },
    function (data) {

    })
});




//medical record module
$(function(){
    $(document).on("click",".doc-report",function(){
        $.post("http://192.168.0.102/medslat/report/append_report",{"concode":$(this).find("rpp").attr("id"),"xdf":""},function(data){
            $(".main-top-over .down").empty().append(data).parent().show();  
        });
    })
});