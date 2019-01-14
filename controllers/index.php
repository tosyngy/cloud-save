<?php

class Index extends Controller{

    function __construct() {
        parent::__construct();
       }

            function index(){ 
       //  echo json_encode($this->model-> getTree());
         $this->view-> render("index/index",TRUE);
        }
            function login(){ 
                if($_POST["whr"]=="login"){
                    $this->model->signin($_POST); 
                }else{
                      $this->model->signup($_POST);
                }
        }
            function logout(){ 
                   $this->model->logout(); 
        }
       

  

}
