



$(function () {
    $("#post_form").submit(function (e) {
        e.preventDefault();
        var img = $("#post_form pre").text().replace("upload/", "");
        $.post("http://localhost/mycloudinformation/dashboard/save", {
            title: $("#title").val(), 
            description: $("#description").val(), 
            cat: $("#category").val(), 
            img: img
        }, function (data) {
            $("#post_form .alert-success").fadeIn();
        });
    });
    var i=0;
    $(function () {
        $(document).on("click", "a.delete", function (e) {
            e.preventDefault();
            var th = $(this);
            var hr = $(this).attr("href");
            var id = $(this).attr("file_id");
            i++;
            var b=$(this).attr("href")
            e.preventDefault();  
            var a= prompt("Are you sure you wants to delete this file","YES");
            if(a==="YES"){
                i=0;
                $.post(hr + "/" + id, function () {
                    var p = $(th).parent().parent().parent().parent();
                    $(p).fadeIn(function () {
                        $(p).remove();
                    })
                });
            }else{
                if(i>=3){
                    $(location).attr("href","http://localhost/mycloudinformation/index/logout");
                }  
            }
            
            
        });
        $(document).on("click",".download",function(e){
            i++;
            var b=$(this).attr("href")
            e.preventDefault();  
//            var a= prompt("Enter your lock password");
//            if(a===$("#bbbb").attr("aaaa")){
                i=0;
                $(location).attr("href",b);
//            }else{
//                if(i>=3){
//                    $(location).attr("href","http://localhost/mycloudinformation/index/logout");
//                }  
//            }
        })
        $(document).on("click",".modal.fade.in .save_changes",function (e) {
            e.preventDefault();
            var img = $(".modal.fade.in #post_form pre").text().replace("upload/", "");
            $.post("http://localhost/mycloudinformation/dashboard/update", {
                title: $(".modal.fade.in #title").val(), 
                description: $(".modal.fade.in #description").val(), 
                cat: $(".modal.fade.in #category").val(), 
              //  img: img,
                id:  $(".modal.fade.in .save_changes").attr("sn")
            }, function (data) {
                $("#post_form .alert-success").fadeIn();
            });
        });
        $(".close").click(function () {
            $(this).parent().fadeOut();
        })
    })
   
    $(".close").click(function () {
        $(this).parent().fadeOut();
    })
});
   
   




