<?php
if ($this->attachment) {
    $attached = $this->attachment;
}
if ($this->document) {
    $detail = $this->document;
}
?>


</div>
<div  id="main-content" style="margin-top: 50px;text-align: center">           
    <div class="title bg-primary" style="padding: 5px; margin-top: 5px; text-align: center"><h1>Cloud Info for You</h1></div>
    <div class="feeds">
        <?php
        if (!empty($detail))
            foreach ($detail as $key => $value) {
                //   Array ( [id] => 1 [user_id] => admin [title] => the new look of cardsenda [file_count] => 3 [save_date] => 2016.08.09 [save_time] => 11:52:51 [status] => 0 [content] => the cardsenda application is an innovative application that allow user to transfer there mood and mind into a party, by providing a platform where users can instantly send invitation messages of cards, mail and sms to lovers )
                ?>

                <div class="feeds-content">
                    <div class="feeds-title"><?php echo $value["title"]; ?></div>   
                    <div class="feeds-contents"><?php echo $value["content"]; ?></div>   
                    <div class="feeds-attachments">
                        <?php
                        $ind = 0;
                        foreach ($attached as $key1 => $value1) {
                            if ($value1["content_id"] == $value["id"]) {
                                ?>
                                <div class="col-md-6 col-sm-6 ">
                                    <div class="class_item" attach_id="<?php echo $value1["id"]; ?>" style="height: 160px;padding: 1px;overflow: hidden">
                                        <i class="fa fa-save"> document: <?php echo++$ind; ?></i>
                                        <?php
                                        $data = file_get_contents(URL . "picture/" . $value1["name"]);
                                        if (strpos($data, "end") > -1) {
                                            $data = explode("data", $data);
                                            $data = $data[1];
                                            $data = explode("end", $data);
                                            $data = $data[0];
                                            $data = "data" . $data . "end";
                                        }

                                        $data2 = file_get_contents(URL . "public/.uploads/" . $data);
                                        $address = URL . "public/.uploads/$data";
                                        ?>

                                        <object data="<?php echo $address; ?>"  width="100%" height="100%" style="overflow: hidden">
                                            <p><a href="<?php echo URL . "public/.uploads/" . $data ?>"></a></p>
                                        </object>

                                    </div>
                                    <div class="file-actions" style="  margin-top: 0; background-color: rgba(255,255,255,0.7);margin-left: 10px;">
                                        <div class="file-footer-buttons">
                <!--                                        <button type="button" class="kv-file-upload btn btn-xs btn-default" title="Upload file">   <i class="glyphicon glyphicon-upload text-info"></i>
                                            </button>-->
                                            <div class="kv-file-remove btn btn-xs btn-default hidden" title="Delete file"><a href="<?php echo "http://localhost/mycloudinformation/dashboard/delete/file"; ?>"  file_id="<?php echo $value1["id"]; ?>" class="delete"  ><i class="glyphicon glyphicon-trash text-danger"></a></i></div>
                                        </div>
                                        <div class="file-upload-indicator" title="Download File"><a href="<?php echo URL . "public/.uploads/" . $data ?>" target="__blank" class="download"><i class="glyphicon glyphicon-hand-down text-warning"></i></a></div>
                                        <div class="clearfix"></div>
                                    </div>
                                </div>

                                <?php
                            }
                        }
                        ?>
                        <div class="clearfix"></div>
                        <!--                    <button type='button' class='btn-lg btn-success col-sm-12' > View</button>-->
                        <div class="file-actions" style=" background-color: rgba(255,255,255,0.7);margin-left: 10px; padding: 20px;display: none">
                            <div class="file-footer-buttons">
        <!--                                        <button type="button" class="kv-file-upload btn btn-xs btn-default" title="Upload file">   <i class="glyphicon glyphicon-upload text-info"></i>
                                </button>-->
                                <div class="kv-file-remove btn btn-xs btn-default hidden" title="Delete Document"><a  file_id="<?php echo $value["id"]; ?>" class="delete" href="<?php echo "http://localhost/mycloudinformation/dashboard/delete/document"; ?>"><i class="glyphicon glyphicon-trash text-danger"></i></a></div>
                            </div>
                            <div class="file-upload-indicator" title="Download Document"><a href="<?php echo URL . "public/.uploads/" . $data ?>" target="__blank" class="download"><i class="glyphicon glyphicon-hand-down text-warning"></i></a></div>
                            <div class="clearfix"></div>
                        </div>
                    </div>
                </div>
            <?php } ?>


        <!--                <div class="images">
                            <img src="" class="img-responsive"/>  
                        </div>  -->


    </div> 

    <style>
        table, td, th {
            border: 1px solid #337ab7;
        }
        th {
            text-align: left;
        }
        th {
            background-color: #337ab7;
            color: white;
        }
        td {
            padding: 15px;
        }
        td {
            height: 50px;
            vertical-align: bottom;
        }
        tr:hover + td {
            color: #eee;
        }
    </style>
    <script src="<?php echo URL; ?>public/js/jTable.js"></script>
    <script>

        $(document).ready(function () {
            var table = $('table').DataTable();
        });
    </script>