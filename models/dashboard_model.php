<?php

class Dashboard_model extends Model {

    public function __construct() {
        Session::init();
        parent::__construct();
    }

    public function save($data) {
        $pix = explode("upload/", $data["img"]);
        $file = "";
        if ($pix[0] != "") {
            $file = "attached";
        }
//        $catid = $this->getCat($data["cat"]);
//        $catid = $catid[0]["name"];
        $param = array(
            'title' => $data["title"],
            // 'content' => $this->mc_encrypt($data["description"]),
            'content' => $data["description"],
            'usr_id' => $this->user_id(Session::get("email")),
            'file' => $file,
            'cat' => $data["cat"],
            'save_date' => date("Y.m.d"),
            'save_time' => date("h:i:s"),
            'status' => "0",
        );
        $id = $this->db->insert("information", $param);

        foreach ($pix as $key => $value) {
            $this->savePix($id, $value, $this->user_id(Session::get("email")));
        }
    }

    public function update($data) {
//        $pix = explode("upload/", $data["img"]);
//        $file = "";
//        if ($pix[0] != "") {
//            $file = "attached";
//        }
//        $catid = $this->getCat($data["cat"]);
//        $catid = $catid[0]["name"];
        $param = array(
            'title' => $data["title"],
            'content' => $data["description"],
//            'file' => $file,
            'cat' => $data["cat"],
            'status' => "0",
        );
        $this->db->update("information", $param, "id='{$data['id']}'");
//        $this->db->delete("attachment", "content_id='{$data['id']}'", 10);
//        foreach ($pix as $key => $value) {
//            $this->savePix($data['id'], $value, $this->user_id(Session::get("email")));
//        }
    }

    public function savePix($id, $value, $user) {
        $name = "";
        for ($i = 0; $i < 30; $i++) {
            $key = array_merge(range(0, 9), range('a', 'z'), range('A', 'Z'));
            $name.= $key [array_rand($key)];
        }
        if (file_put_contents("picture/" . $name . "", "$value", FILE_USE_INCLUDE_PATH)) {
            $param = array(
                'name' => $name,
                'content_id' => $id,
                'comment' => "",
                'usr_id' => $user,
            );
            $id = $this->db->insert("attachment", $param);
        }
    }

    function attachments() {
        $param = array(
            ':email' => $this->user_id(Session::get("email")),
        );
        $sql = $this->db->select("SELECT * FROM attachment WHERE usr_id=:email and status=0", $param);
        return $sql;
    }

    function delete($whr, $id) {
        $param = array(
            'status' => "1",
        );
        if ($whr == "document") {
            $this->db->update("attachment", $param, "content_id=$id");
            $this->db->update("information", $param, "id=$id");
        } else {
            $this->db->update("attachment", $param, "id=$id");
        }
    }

    function user_id($data) {

        $param = array(
            ':email' => $data
        );
        $sql = $this->db->select("SELECT id FROM login WHERE (user_id=:email) limit 1", $param);
        return $sql[0]["id"];
    }

    function get_user() {
        $sql = $this->db->select("SELECT id,user_id,user_type,status FROM login order by id desc ");
        return $sql;
    }

    function get_attachments($set = 0) {

        $sql = $this->db->select("SELECT * FROM attachment WHERE status=0");
        if (empty($set))
            return $sql;
        else
            echo json_encode($sql);
    }

    function getCat($name = 0) {
        if ($name != 0) {
            $sql = $this->db->select("Select id from category where name='$name' limit 1");
        } else {
            $sql = $this->db->select("Select name from category");
        }
        return $sql;
    }

    function getUserDetails() {
        $param = array(
            ':email' => $this->user_id(Session::get("email")),
        );
        $sql = $this->db->select("SELECT * FROM information WHERE usr_id=:email and status=0 ", $param);
        return $sql;
    }

    function getDetails() {

        $sql = $this->db->select("SELECT * FROM information WHERE  status=0");
        return $sql;
    }

    function get_user_document() {
//$id = user_id($_SESSION["email"]);
        $sql = $this->db->select("SELECT save.id, user_id, title, (
SELECT COUNT( attachment.id ) 
FROM attachment
WHERE save.id = attachment.content_id
) AS file_count, save_date, save_time, save.status,content
FROM information AS save, login
WHERE  usr_id = login.id
ORDER BY save.id DESC limit 20");
        return $sql;
    }

    function search($data) {
        $id = $data["param"];
        $sql = $this->db->select("SELECT a.id, title, (
SELECT COUNT( attachment.id ) 
FROM attachment
WHERE a.id = attachment.content_id
) AS file_count, save_date, save_time, a.status,content,cat
FROM information AS a,category as b
WHERE (content like '%$id%'  or title like '%$id%' or cat like '%$id%' or b.description like '%$id%') 
    and b.name = a.cat
ORDER BY a.id DESC limit 20");
        $attached = $this->get_attachments();
        echo json_encode($this->compileSearch($sql, $attached));
    }

    function mysearch($data) {
        $param = array(
            ':email' => $this->user_id(Session::get("email")),
        );

        $id = $data["param"];
        $sql = $this->db->select("SELECT  distinct save.id, user_id, title, (
SELECT COUNT( attachment.id ) 
FROM attachment
WHERE save.id = attachment.content_id
) AS file_count, save_date, save_time, save.status,content,cat
FROM information AS save, login, category as b
WHERE (content like '%$id%'  or title like '%$id%' or cat like '%$id%' or b.description like '%$id%') 
    and usr_id = login.id
and  usr_id=:email and save.status=0 ORDER BY save.id DESC limit 20", $param);
        $attached = $this->get_attachments();
        echo json_encode($this->compileMySearch($sql, $attached));
    }

// Define a 32-byte (64 character) hexadecimal encryption key
// Note: The same encryption key used to encrypt the data must be used to decrypt the data
// Encrypt Function
    function mc_encrypt($encrypt) {
        $key = ENCRYPTION_KEY;
        $encrypt = serialize($encrypt);
        $iv = mcrypt_create_iv(mcrypt_get_iv_size(MCRYPT_RIJNDAEL_256, MCRYPT_MODE_CBC), MCRYPT_DEV_URANDOM);
        $key = pack('H*', $key);
        $mac = hash_hmac('sha256', $encrypt, substr(bin2hex($key), -32));
        $passcrypt = mcrypt_encrypt(MCRYPT_RIJNDAEL_256, $key, $encrypt . $mac, MCRYPT_MODE_CBC, $iv);
        $encoded = base64_encode($passcrypt) . '|' . base64_encode($iv);
        return $encoded;
    }

    function compileSearch($detail, $attached) {
        $result = array();
        if (!empty($detail))
            foreach ($detail as $key => $value) {
                $acc = "";
                $acc.='<div class="feeds-content">';
                $acc.='<div class="feeds-title">' . $value["title"] . '</div> ';
                $acc.='<div class="feeds-contents">' . $value["content"] . '</div> ';
                $acc.='<div class="feeds-attachments"> ';
                $ind = 0;
                $data = "";
                foreach ($attached as $key1 => $value1) {
                    if ($value1["content_id"] == $value["id"]) {
                        $acc.='<div class="col-md-6 col-sm-6 ">';
                        $acc.=' <div class="class_item" attach_id="' . $value1["id"] . ' style="height: 160px;padding: 1px;overflow: hidden">';
                        $acc.='     <i class="fa fa-save"> document: ' . ++$ind . '</i>';
                        $data = file_get_contents(URL . "picture/" . $value1["name"]);
                        if (strpos($data, "end") > -1) {
                            $data = explode("data", $data);
                            $data = $data[1];
                            $data = explode("end", $data);
                            $data = $data[0];
                            $data = "data" . $data . "end";
                        }

// $data2 = file_get_contents(URL . "public/.uploads/" . $data);
                        $address = URL . "public/.uploads/$data";
                        $acc.='<object data="' . $address . '"  width="100%" height="100%" style="overflow: hidden">';
                        $acc.='<p><a href="' . URL . "public/.uploads/" . $data . '"></a></p>';
                        $acc.='</object>';
                        $acc.='</div>';
                        $acc.='<div class="file-actions" style="display: none;  margin-top: 0; background-color: rgba(255,255,255,0.7);margin-left: 10px;">';
                        $acc.='<div class="file-footer-buttons">';
                        $acc.='<div class="kv-file-remove btn btn-xs btn-default hidden" title="Delete file"><a href="http://localhost/mycloudinformation/dashboard/delete/file"  file_id="' . $value1["id"] . '" class="delete"  ><i class="glyphicon glyphicon-trash text-danger"></a></i></div>';
                        $acc.='</div>';
                        $acc.='<div class="file-upload-indicator" title="Download File"><a href="' . URL . 'public/.uploads/' . $data . '" target="__blank" class="download"><i class="glyphicon glyphicon-hand-down text-warning"></i></a></div>';
                        $acc.='<div class="clearfix"></div>';
                        $acc.='</div>';
                        $acc.='</div>';
                    }
                }
                $acc.=' <div class="clearfix"></div>';
                $acc.='<div class="file-actions" style=" background-color: rgba(255,255,255,0.7);margin-left: 10px; padding: 20px;">';
                $acc.='   <div class="file-footer-buttons">';
                $acc.='<div class="kv-file-remove btn btn-xs btn-default hidden" title="Delete Document"><a  file_id="' . $value["id"] . '" class="delete" href="http://localhost/mycloudinformation/dashboard/delete/document"><i class="glyphicon glyphicon-trash text-danger"></i></a></div>';
                $acc.='</div>';
                $acc.='<div class = "file-upload-indicator" title = "Download Document"><a href = "' . URL . "public/.uploads/" . $data . '" target = "__blank" class = "download"><i class = "glyphicon glyphicon-hand-down text-warning"></i></a></div>';
                $acc.='<div class = "clearfix"></div>';
                $acc.=' </div>';
                $acc.=' </div>';
                $acc.=' </div>';

                array_push($result, $acc);
            }
        return $result;
    }

    function compileMySearch($detail, $attached) {
        $result = array();
        if (!empty($detail))
            foreach ($detail as $key => $value) {
                $acc = "";
                $acc.='<div class = "class_category_section">';
                $acc.='<div class = "class_category_header">' . $value["title"] . '</div>';
                $acc.='<div class="col-md-12 col-sm-12 " style="padding: 0;margin: auto">';
                $acc.='<div class="class_item" content_id="' . $value["id"] . '" style="height: auto">';
                $acc.=$value["content"];
                $acc.= "</div>";
                $acc.="</div>";
                $ind = 0;
                $data = "";
                foreach ($attached as $key1 => $value1) {
                    if ($value1["content_id"] == $value["id"]) {
                        $acc.=' <div class="col-md-3 col-sm-6 ">';
                        $acc.='  <div class="class_item" attach_id="' . $value1["id"] . '" style="height: 160px;padding: 1px;overflow: hidden">';
                        $acc.='<i class="fa fa-save"> document:' . ++$ind . '</i>';
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


                        $acc.='<object data="' . $address . '"width="100%" height="100%" style="overflow: hidden">';
                        $acc.=' <p><a href="' . URL . "public/.uploads/" . $data . '"></a></p>';
                        $acc.='</object>';

                        $acc.='</div>';
                        $acc.=' <div class = "file-actions" style = "  margin-top: 0; background-color: rgba(255,255,255,0.7);margin-left: 10px;">';
                        $acc.=' <div class = "file-footer-buttons">';
                        $acc.='<div class = "kv-file-remove btn btn-xs btn-default" title = "Delete file"><a href ="http://localhost/mycloudinformation/dashboard/delete/file"  file_id="' . $value1["id"] . '" class="delete"  ><i class="glyphicon glyphicon-trash text-danger"></a></i></div>';
                        $acc.='</div>';
                        $acc.='<div class="file-upload-indicator" title="Download File"><a href="' . URL . "public/.uploads/" . $data . ' target="__blank" class="download"><i class="glyphicon glyphicon-hand-down text-warning"></i></a></div>';
                        $acc.='<div class="clearfix"></div>';
                        $acc.='</div>';
                        $acc.='</div>';
                    }
                }
                $acc.='<div class="clearfix"></div>';
                $acc.=' <div class="file-actions" style=" background-color: rgba(255,255,255,0.7);margin-left: 10px; padding: 20px;">';
                $acc.=' <div class="file-footer-buttons">';
                $acc.=' <div class="kv-file-remove btn btn-xs btn-default" title="Delete Document"><a  file_id="' . $value["id"] . '" class="delete" href="http://localhost/mycloudinformation/dashboard/delete/document"><i class="glyphicon glyphicon-trash text-danger"></i></a></div>';
                $acc.='</div>';
                $acc.='<div class = "file-edit-indicator" title = "Edit Information" data-toggle = "modal" data-target = "#myModal' . $value["id"] . '"><i class = "glyphicon glyphicon-pencil text-warning"></i></div>';
               // $acc.='<div class = "file-upload-indicator" title = "Download Document"><a href = "' . URL . "public/.uploads/" . $data . '" target = "__blank" class = "download"><i class = "glyphicon glyphicon-hand-down text-warning"></i></a></div>';
                $acc.=' <div class = "clearfix"></div>';
                $acc.=' </div>';
                $acc.='</div >';
                $acc.='<div class = "modal fade" id = "myModal' . $value['id'] . '" tabindex="-1" role = "dialog" aria-labelledby = "myModalLabel" aria-hidden = "true">';
                $acc.='<div class = "modal-dialog">';
                $acc.='<div class = "modal-content">';
                $acc.='<div class = "modal-header">';
                $acc.='<button type = "button" class = "close" data-dismiss = "modal" aria-label = "Close"><span aria-hidden = "true">&times;';
                $acc.='</span></button>';
                $acc.='<h4 class = "modal-title">' . $value["title"] . '</h4>';
                $acc.='</div>';
                $acc.='<div class="modal-body">';
                $acc.='<form enctype="multipart/form-data" id="post_form">';
                $acc.='<div class="form-group">';
                $acc.= '<label for="title" class="label">Title</label>';
                $acc.='<input type="text" class="form-control" id="title" placeholder="Title" value="' . $value["title"] . '">';
                $acc.='</div>';
                $acc.='<div class = "form-group">';
                $acc.='<label for = "title" class = "label">Category</label>';
                $acc.='<input type = "text" class = "form-control" id = "category" placeholder = "Category" list = "catlist" value = "' . $value["cat"] . '">';
                $acc.='</div>';
                $acc.='<div class = "form-group">';
                $acc.='<label for = "description" class = "label">Content</label>';
                $acc.='<textarea class = "form-control" id = "description"rows = "3">' . $value["content"] . '</textarea>';
                $acc.='</div>';
                $acc.='<div class="alert alert-success" style="display: none"> Your Information has been save successfully <span class="close">x</span></div>';

                $acc.='</form>';


                $acc.='</div>';
                $acc.='<div class="modal-footer">';
                $acc.=' <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>';
                $acc.=' <button type="button" class="btn btn-primary save_changes" sn="' . $value['id'] . '" >Save changes</button>';
                $acc.='</div>';
                $acc.='</div><!-- /.modal-content -->';
                $acc.='</div><!-- /.modal-dialog -->';
                $acc.='</div>';
                array_push($result, $acc);
            }
        return $result;
    }

}

