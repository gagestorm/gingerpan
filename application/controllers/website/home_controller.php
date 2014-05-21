<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 
 //require_once(CORE_DIR.'drop_module.php');
 require_once('base_controller.php');
 /**
 * @author Afsar Ahmad
 */
 class Home_controller extends base_controller{
   
    function __construct(){
    	parent::__construct();
    }

    public function index()
    {
        $this->smartylib->display('website/home/index.tpl');
    }

 }

