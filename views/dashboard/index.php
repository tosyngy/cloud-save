<?php
Session::init();
if (isset($this->details)) {
    $detail = $this->details;
}
if (isset($this->attachment)) {
    $attached = $this->attachment;
}
?>


<section id="main-content" style="">
    <section class="wrapper">

        <div class="classes_cont">
            <?php foreach ($detail as $key => $value) { ?>
                <div class="class_category_section">
                    <div class="class_category_header"><?php echo $value["title"]; ?>
                    </div>
                    <div class="col-md-12 col-sm-12 " style="padding: 0;margin: auto">
                        <div class="class_item" content_id="<?php echo $value["id"]; ?>" style="height: auto">
                            <?php //echo mc_decrypt($value["content"]); ?>
                            <?php echo $value["content"]; ?>
                        </div>
                    </div>
    <!--                    <span class="fa fa-attachment label"> attachment : </span>-->
                    <?php
                    $ind = 0;
                    foreach ($attached as $key1 => $value1) {
                        if ($value1["content_id"] == $value["id"]) {
                            ?>
                            <div class="col-md-3 col-sm-6 ">
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
                                        <div class="kv-file-remove btn btn-xs btn-default" title="Delete file"><a href="<?php echo "http://localhost/mycloudinformation/dashboard/delete/file"; ?>"  file_id="<?php echo $value1["id"]; ?>" class="delete"  ><i class="glyphicon glyphicon-trash text-danger"></a></i></div>
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
                    <div class="file-actions" style=" background-color: rgba(255,255,255,0.7);margin-left: 10px; padding: 20px;">
                        <div class="file-footer-buttons">
                            <div class="kv-file-remove btn btn-xs btn-default" title="Delete Document"><a  file_id="<?php echo $value["id"]; ?>" class="delete" href="<?php echo "http://localhost/mycloudinformation/dashboard/delete/document"; ?>"><i class="glyphicon glyphicon-trash text-danger"></i></a></div>
                        </div>
                        <div class="file-edit-indicator" title="Edit Information" data-toggle="modal" data-target="#myModal<?php echo $value["id"]; ?>"><i class="glyphicon glyphicon-pencil text-warning"></i></div>
                        <!--<div class="file-upload-indicator" title="Download Document"><a href="<?php echo URL . "public/.uploads/" . $data ?>" target="__blank" class="download"><i class="glyphicon glyphicon-hand-down text-warning"></i></a></div>-->
                        <div class="clearfix"></div>
                    </div>
                </div>
                <div class="modal fade" id="myModal<?php echo $value['id']; ?>" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
                                <h4 class="modal-title"><?php echo $value["title"]; ?></h4>
                            </div>
                            <div class="modal-body">
                                <form enctype="multipart/form-data" id="post_form">
                                    <div class="form-group">
                                        <label for="title" class="label">Title</label>
                                        <input type="text" class="form-control" id="title" placeholder="Title" value="<?php echo $value["title"]; ?>">
                                    </div>
                                    <div class="form-group">
                                        <label for="title" class="label">Category</label>
                                        <input type="text" class="form-control" id="category" placeholder="Category" list="catlist" value="<?php echo $value["cat"]; ?>">
                                    </div>
                                    <div class="form-group">
                                        <label for="description" class= "label">Content</label>
                                        <textarea class="form-control"  id="description"rows="3"><?php echo $value["content"]; ?></textarea>
                                    </div>


<!--                                    <div class="form-group">
                                        <input id="file-1" type="file" multiple class="file" data-overwrite-initial="false" data-min-file-count="1" data-max-file-count="2">
                                    </div>-->
                                    <div class="alert alert-success" style="display: none"> Your Information has been save successfully <span class="close">x</span></div>
                                    <!--<button type="submit" class="btn btn-default btn-lg  btn-success">Submit</button>-->

                                </form>


                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary save_changes" sn="<?php echo $value['id']; ?>" >Save changes</button>
                            </div>
                        </div><!-- /.modal-content -->
                    </div><!-- /.modal-dialog -->
                </div><!-- /.modal -->

            <?php } ?>

        </div>
        <datalist id="catlist">
            <?php
            foreach ($this->cat as $key => $value) {
                echo " <option value='{$value['name']}'>{$value['name']}</option>";
            }
            ?>
        </datalist>


        <div class="information_display">
            <div class="exit_info_display">  <i class="fa fa-2x fa-angle-left"></i></div>
            <div id="info_content_disp" class="content">

            </div>
        </div>
    </section>
</section>
<bbbb id="bbbb" aaaa="<?php echo Session::get("code") ?>"style="display: none" />
<script src='<?php echo URL ?>views/dashboard/js/script.js'></script>


<?php

// Decrypt Function
function mc_decrypt($decrypt) {

    $key = ENCRYPTION_KEY;
    $decrypt = explode('|', $decrypt);
    $decoded = base64_decode($decrypt[0]);
    $iv = base64_decode($decrypt[1]);
    $key = pack('H*', $key);
    $decrypted = trim(mcrypt_decrypt(MCRYPT_RIJNDAEL_256, $key, $decoded, MCRYPT_MODE_CBC, $iv));
    $mac = substr($decrypted, -64);
    $decrypted = substr($decrypted, 0, -64);
    $calcmac = hash_hmac('sha256', $decrypted, substr(bin2hex($key), -32));
    if ($calcmac !== $mac) {
        return false;
    }
    $decrypted = unserialize($decrypted);
    return $decrypted;
}
?>