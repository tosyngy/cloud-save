<?php

class Bootstrap {

    function __construct() {
        $url = isset($_GET['url']) ? $_GET['url'] : null;
        $url = rtrim($url, '/');
        $url = explode('/', $url);
        foreach ($url as $key => $value) {
            $url[$key] = strtolower($url[$key]);
        }
        Session::init();
        if (empty($url[0])) {
            if (Session::get("loggedin")) {
                $this->render("dashboard");
                return FALSE;
            }
            $this->render("index");
            return false;
        } else {
//                   $access= array("login", "signup", "logout");
//                    if(!Session::get("loggedin") && !in_array($url[1], $access)){
//                   $this->render("index");
//                   return FALSE;
//              }
            $file = 'controllers/' . $url[0] . '.php';
            if (file_exists($file)) {
                require $file;
                $controller = new $url[0];
                $controller->loadModel($url[0]);
                if (isset($url[3])) {
                    if (method_exists($controller, $url[1])) {
                        $controller->{$url[1]}($url[2], $url[3]);
                    } else {
                        $controller->index();
                    }
                } elseif (isset($url[2])) {
                    if (method_exists($controller, $url[1])) {
                        $controller->{$url[1]}($url[2]);
                    } else {
                        $controller->index();
                    }
                } elseif (isset($url[1])) {
                    if (method_exists($controller, $url[1])) {
                        $controller->{$url[1]}();
                    } else {
                        $controller->index();
                    }
                } else {
                    $controller->index();
                    return;
                }
            } else {
                $this->render("error");
                return;
            }
        }
    }

    function render($param) {
        $file = 'controllers/' . $param . '.php';
        require $file;
        $controller = new $param();
        $controller->loadModel($param);
        $controller->index();
    }

}
