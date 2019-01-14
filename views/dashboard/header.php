<!-- Global site tag (gtag.js) - Google Analytics -->





<!DOCTYPE html>
<!-- saved from url=(0031)http://localhost/school/classes -->
<html lang="en" style="overflow: auto;">
    <head><meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content=""> 

        <title>Cloud Information </title>

        <!-- Bootstrap core CSS -->
        <script src="<?php echo URL ?>public/jquery2.1.3.min.js"></script>
        <script src='<?php echo URL ?>public/jqueryUI/jquery-ui.js'></script>
        <script src='<?php echo URL ?>public/bootstrap/js/bootstrap.js'></script>
        <link rel='stylesheet' href="<?php echo URL ?>public/jqueryUI/jquery-ui.css" />
        <link rel='stylesheet' href="<?php echo URL ?>public/bootstrap/css/bootstrap.css" />
        <link rel="stylesheet" href="<?php echo URL ?>views/dashboard/css/styles.css">
        <link rel="stylesheet" href="<?php echo URL ?>views/dashboard/assets/css/style-responsive.css">
        <link rel="stylesheet" href="<?php echo URL ?>views/index/css/style.css" media="screen" type="text/css" />
        <link rel="stylesheet" href="<?php echo URL ?>public/font-awesome/css/font-awesome.css" media="screen" type="text/css" />
        <!--external css-->
        <link rel="stylesheet" type="text/css" href="<?php echo URL ?>views/dashboard/resources/style.css">    

        <!-- Custom styles for this template -->
        <link href="<?php echo URL ?>views/dashboard/assets/css/style.css" rel="stylesheet">


        <link href="<?php echo URL ?>views/dashboard/file_upload/css/fileinput.css" media="all" rel="stylesheet" type="text/css" />
        <link rel="stylesheet" type="text/css" href="<?php echo URL; ?>views/dashboard/datetimepicker/build/css/bootstrap-datetimepicker.css" />
        <link rel="stylesheet" type="text/css" href="<?php echo URL ?>views/dashboard/resources/jquery.gritter.css">
        <link rel="stylesheet" type="text/css" href="<?php echo URL ?>views/dashboard/resources/zabuto_calender.css" />
        <script src="<?php echo URL ?>views/dashboard/file_upload/js/fileinput.js" type="text/javascript"></script>
        <script src="<?php echo URL ?>public/js/moment.js"></script>

<!--        <script src="<?php echo URL; ?>views/dashboard/datetimepicker/src/js/bootstrap-datetimepicker.js"></script>
        <script src='<?php echo URL ?>views/dashboard/resources/jquery.nicescroll.js'></script>
        <script src='<?php echo URL ?>views/dashboard/resources/jquery.scrollTo.min.js'></script>
        <script src='<?php echo URL ?>views/dashboard/resources/jquery.dcjqaccordion.2.7.js'></script>
        <script src='<?php echo URL ?>views/dashboard/resources/script.js'></script>
        <script src='<?php echo URL ?>views/dashboard/resources/common-scripts.js'></script>
        <script src='<?php echo URL ?>views/dashboard/resources/jquery.gritter.js'></script>
        <script src='<?php echo URL ?>views/dashboard/resources/gritter-conf.js'></script>
        <script src='<?php echo URL ?>views/dashboard/resources/jquery.sparkline.js'></script>
        <script src='<?php echo URL ?>views/dashboard/resources/sparkline-chart.js'></script>
        <script src='<?php echo URL ?>views/dashboard/resources/Chart.js'></script>
        <script src='<?php echo URL ?>views/dashboard/resources/zabuto_calender.js'></script>-->


    </head>
    <body style="">
        <header class="header" style="  background-color: rgb(66, 133, 244);">
            <div class="sidebar-toggle-box">
                <div class="fa fa-bars tooltips" data-placement="right" data-original-title=""></div>
            </div>
            <!--logo start-->
            <a href="http://localhost/mycloudinformation" class="logo col-sm-4 col-xs-6"><b>Cloud Information</b><br><small><small style="text-transform: lowercase; color: #424a5d">nothing is hidden</small></small></a>
            <!--logo end-->

            <div class="nav notify-row text-danger col-xs-12 col-sm-5" id="top_menu">
                <div class="form-group has-success has-feedback 
                <?php
                if ($this->search != "true") {
                    echo "hidden";
                }
                ?>">
                    <input type="text" class="form-control btn-lg" id="searchForm" aria-describedby="inputSuccess2Status" placeholder="search" attr="<?php echo $this->doc ?>">
                    <span class="glyphicon glyphicon-search form-control-feedback" aria-hidden="true"></span>
                    <span id="inputSuccess2Status" class="sr-only">(success)</span>
                </div>
            </div>
            <div class="top-menu col-xs-6 col-sm-2">
                <ul class="nav pull-right top-menu">
                    <li id="logout"><a style="background: red" class="logout" href="http://localhost/mycloudinformation/index/logout">Logout</a></li>
                </ul>
            </div>
        </header>


        <aside>
            <div id="sidebar" class="nav-collapse " style="margin-left: 0px;">
                <!-- sidebar menu start-->
                <ul class="sidebar-menu" id="nav-accordion" style="display: block;">
                    <?php if (Session::get("usertype") == 2) { ?>
                        <li class="sub-menu">
                            <a href="http://localhost/mycloudinformation/dashboard/users">
                                <i class="fa fa-user"></i>
                                <span>Users</span>
                            </a>

                        </li>

                    <?php } ?>
                    <li class="sub-menu">
                        <a href="http://localhost/mycloudinformation/dashboard/documents">
                            <i class="fa fa-cloud"></i>
                            <span>Information on The Cloud</span>
                        </a>
                    </li>
                    <li class="sub-menu">
                        <a href="http://localhost/mycloudinformation/dashboard/save">
                            <i class="fa fa-file"></i>
                            <span>Create New Information</span>
                        </a>

                    </li>
                    <li class="sub-menu">
                        <a href="http://localhost/mycloudinformation/dashboard/my_documents">
                            <i class="fa fa-cloud-download"></i>
                            <span>My Data on The Cloud</span>
                        </a>
                    </li>
                </ul>
                <!-- sidebar menu end-->
            </div>
        </aside>
        <!--sidebar end-->
        <div class="container kv-main">

            <script>
                $(function(){
                
                    $(".sidebar-toggle-box").click(function(){
                        if($("#sidebar").width()>"0"){
                            $("#main-content").animate({"margin-left":"2px"}, 500);
                            $("#sidebar .sidebar-menu").fadeOut(200);
                            $("#sidebar").animate({"width":"0px"}, 200)
                        }else{
                            $("#main-content").animate({"margin-left":"210px"}, 500);  
                            $("#sidebar .sidebar-menu").fadeIn(200);
                            $("#sidebar").animate({"width":"210px"}, 200)
                           
                        }
                    }) 
                    
                    //                    $(body).change(function(){
                    if($(document).width()<900){
                        $("#main-content").animate({"margin-left":"2px"}, 500);
                        $("#sidebar .sidebar-menu").fadeOut(200);
                        $("#sidebar").animate({"width":"0px"}, 200)
                    }else{
                        $("#main-content").animate({"margin-left":"210px"}, 500);  
                        $("#sidebar .sidebar-menu").fadeIn(200);
                        $("#sidebar").animate({"width":"210px"}, 200) 
                    }
                    //                    })
                   
                   
                    //                $(".sidebar-toggle-box").click(function(){
                    //                    $("body").addClass("sidebar-closed")
                    //                    $("#sidebar").animate({"width":"0px"}, 200,function(){ })
                    //                    $("#main-content").animate({"margin-left":"2px !important"}, 500);
                    //                    
                    //                })  
                    
                    $(document).on("keyup","#searchForm",function (e) {
                        e.preventDefault();
                        var str="";
                        if($(this).val().length===0 && $(this).attr("attr")=="true"){
                            $.post("http://localhost/mycloudinformation/dashboard/search", {
                                param: ' '
                            }, function (data) {
                                res=JSON.parse(data);
                                $.each(res, function(id,data){
                                    str+=data;  
                                })
                                str=' <div class="feeds">'+str+'</div>';
                                $(".feeds").replaceWith(str);
                            });
                        }
                        else if($(this).val().length>=3 && $(this).attr("attr")=="true"){
                            $.post("http://localhost/mycloudinformation/dashboard/search", {
                                param: $(this).val()
                            }, function (data) {
                                res=JSON.parse(data);
                                $.each(res, function(id,data){
                                    str+=data;  
                                })
                                str=' <div class="feeds">'+str+'</div>';
                                $(".feeds").replaceWith(str);
                            });
                        }else if($(this).val().length>=3 && $(this).attr("attr")=="false")
                        {
                            $.post("http://localhost/mycloudinformation/dashboard/mysearch", {
                                param: $(this).val()
                            }, function (data) {
                                res=JSON.parse(data);
                                $.each(res, function(id,data){
                                    str+=data;  
                                })
                                str=' <div class="classes_cont">'+str+'</div>';
                                $(".classes_cont").replaceWith(str);
                            });  
                        }
                        else if($(this).val().length===0 && $(this).attr("attr")=="false"){
                           $.post("http://localhost/mycloudinformation/dashboard/mysearch", {
                                param: $(this).val()
                            }, function (data) {
                                res=JSON.parse(data);
                                $.each(res, function(id,data){
                                    str+=data;  
                                })
                                str=' <div class="classes_cont">'+str+'</div>';
                                $(".classes_cont").replaceWith(str);
                            }); 
                        }
                    });
                })
                
                
               

            </script>
