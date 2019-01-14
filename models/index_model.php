<?php

class Index_model extends Model {

    public function __construct() {
        Session::init();
        parent::__construct();
    }

    public function signin($data, $up = 0) {
        $code = "";
        $param = array(
            ':user_id' => $data["usr"],
            ':password' => Hash::create('sha256', $data["pwd"], HASH_PASSWORD_KEY),
        );

        $sql = $this->db->prepare("SELECT user_id FROM login WHERE user_id=:user_id and password=:password", $param);
        $sql->execute($param);
        $count = $sql->rowCount();
        if ($count == "1") {
            $res = $this->db->select("SELECT user_type FROM login WHERE user_id=:user_id and password=:password", $param);
            Session::set("email", $data["usr"]);
            Session::set("usertype", $res[0]["user_type"]);
            Session::set("loggedin", $data["usr"]);
//            header("location:" . URL."dashboard");
 //           $code = $res[0]["lock_code"];
        }
        Session::set("code", $code);
        if ($up == 0)
            echo $count;
        else {
            echo $up;
        }
    }

    public function signup($data) {
//        $lock = rand(100000000000000, 100000000000000000);
        if ($this->confirmUsername($data["usr"]) > "0") {
            echo "2";
            return;
        } else {

            $param = array(
                'user_id' => $data["usr"],
                'password' => Hash::create('sha256', $data["pwd"], HASH_PASSWORD_KEY),
                'user_type' => "1"
            );
            $this->db->insert("login", $param);
//            $param = array(
//                'lock_code' => $lock,
//            );
//            $this->db->insert("lock_code", $param);
//            $this->signin($data, $lock);
            $this->signin($data, "");
        }
    }

    function confirmUsername($data) {

        $param = array(
            ':email' => $data
        );
        $sql = $this->db->prepare("SELECT user_id FROM login WHERE user_id=:email", $param);
        $sql->execute($param);
        $count = $sql->rowCount();
        return $count;
    }

    function logout() {
        Session::destroy();
        Session::offset("loggedin");
        Session::offset("email");
        header("location:" . URL);
    }

}
