<?php

//static $i = 0;
//if ((($_FILES["file_data"]["type"] == "image/gif") || ($_FILES["file_data"]["type"] == "image/jpeg") || ($_FILES["file_data"]["type"] == "image/png") || ($_FILES["file_data"]["type"] == "image/pjpeg"))) {

$type = $_FILES["file_data"]["type"];
$img = $_FILES["file_data"]["name"];
$size = $_FILES["file_data"]["size"];
$tmp = $_FILES["file_data"]["tmp_name"];
$err = $_FILES["file_data"]["error"];
$exe = explode("/", $type);
if ($err > 0) {
    echo "Return Code: " . $err . "<br />";
} else {
    $img = "data";
    $_FILES["file_data"]["size"]=($_FILES["file_data"]["size"]/4);

    do {
        for ($i = 0; $i < 20; $i++) {
            $key = range(0, 9);
            $img.= $key [array_rand($key)];
        }
        if (!file_exists($img . "end")) {
            $img = $img . "." . $exe[1];
            echo "upload/" . $img;
//            $data = file_get_contents($tmp);
//            $file = fopen($img, "w+");
//            exec("sudo -R 777 /opt/lampp/htdocs/savelock/public/uploads/" . $img);
//            echo fwrite($file, $data);
//            fclose($file);
            move_uploaded_file($tmp, $img);
            break;
        }
    } while (true);
}
