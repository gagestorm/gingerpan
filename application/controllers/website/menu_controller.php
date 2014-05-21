<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 
 //require_once(CORE_DIR.'drop_module.php');
 require_once('base_controller.php');
 /**
 * @author Afsar Ahmad
 */
 class Menu_controller extends base_controller{
   
    function __construct(){
    	parent::__construct();
    }

    public function index()
    {
    	//$output = $this->recreate_cart();
        $this->smartylib->display('website/menu/index.tpl');
    }

    public function recreate_cart()
    {
    	
    }

    public function update_cart_session()
    {
    	$data = $this->input->post('items');
    	$cart_count = $this->input->post('cart_count');
    	//$this->session->set_userdata(array('people' => 1));
    	echo $this->session->userdata('people');
    	print_r($this->session->all_userdata());
    }

 }

