<?php if ( ! defined('BASEPATH')) exit('No direct script access allowed'); 
 /**
  * All controllers extends this controller for website 
  * This will contain some of the functions 
 */
 class Base_controller extends CI_controller{
    
    protected $is_mobile = false; 

    function __construct(){

    	parent::__construct();
      
      $this->load->library('smartylib');
      $this->smartylib->caching = 0; 
      //Base variable
      $this->smartylib->assign( 'base_url', base_url() );
      $this->smartylib->assign( 'current_url',current_url() );
      $this->smartylib->assign( 'env', ENVIRONMENT); //For various environment
      
      $detect = new Mobile_Detect();
      if ($detect->isMobile() || $detect->isAndroidOS() || $detect->isTablet() ) {  
          $this->is_mobile = true; 
          log_message('INFO','Website is opened in a Tablet/Mobile device');   
          $this->smartylib->assign( 'mobile','true' );  //Lighter version     
      }else{
          $this->smartylib->assign( 'mobile','false' );  
      } 
      //$this->smartylib->assign( 'mobile','true' );  //for Debugging mobile    

    }

    /**
    * @param the data array should haive
    * error_icon (can be empty)
    * error_heading ()
    * description
    * page_name
    **/
    public function error_page($data)
    {
        $message = '<div class="big-error">
                        <h1><i class="fa '.$data['error_icon'].'"></i> '.$data['error_heading'].'</h1>
                        <p class="lead">'.$data['description'].'</p>
                        <p><a href="'.base_url().'" class="btn btn-white btn-lg">Go back home</a></p>
                      </div>';
        $this->smartylib->assign( 'message',$message);
        $this->smartylib->assign( 'page',   $data['page_name'] );
        $this->smartylib->display('_interface/error/index.tpl');
    }
    /**
    * Prepare the tags 
    * Tags sent by core contains commas, to get it display
    * return assoc array with each as url 
    */
    public function _prepare_tags($tags)
    {
       $tags = preg_split("/[\s,]+/",$tags);
       $result = array();
       foreach ($tags as $tag) {
         $result[] = array(
              'url' => base_url().'tag/'.url_title($tag),
              'name'=> $tag
         );
       }
       return $result;
    }

    /** 
    * Data send from the client side will be in form 
    * 'type#message#sort#desc#people#follow'
    * which is array( 'type' => 'message' , 'sort' => 'desc' , 'people' => follow )
    * This function performs the parse
    **/
    public function parse_hashmeta($string)
    { 
        $meta  = preg_split("/#/", $string );
        
        $result=array();

        if( $meta ){
          
          $count = count($meta);
          
          if( $count%2 ==0 ){

            $run=0;
            while($run<$count){
              $result[ $meta[$run] ] = $meta[$run+1];
              $run+=2; 
            }
            

          }else{
            //log_message('ERROR',' Meta data '.print_r($meta,true).' failed to resolve.');
          }

        }

        return $result;

    }//resolve hash meta     
    /**
    * pcode { USE FUL FOR DEBUGGING PURPOSE }
    * printf the array in a better form.
    **/
    public function print_code($array)
    {
       echo "<pre>"; print_r($array); echo "</pre>";
    }


 }
