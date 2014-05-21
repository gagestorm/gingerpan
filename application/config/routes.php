<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');
/*
| -------------------------------------------------------------------------
| URI ROUTING
| -------------------------------------------------------------------------
| This file lets you re-map URI requests to specific controller functions.
|
| Typically there is a one-to-one relationship between a URL string
| and its corresponding controller class/method. The segments in a
| URL normally follow this pattern:
|
|	example.com/class/method/id/
|
| In some instances, however, you may want to remap this relationship
| so that a different class/function is called than the one
| corresponding to the URL.
|
| Please see the user guide for complete details:
|
|	http://codeigniter.com/user_guide/general/routing.html
|
| -------------------------------------------------------------------------
| RESERVED ROUTES
| -------------------------------------------------------------------------
|
| There area two reserved routes:
|
|	$route['default_controller'] = 'welcome';
|
| This route indicates which controller class should be loaded if the
| URI contains no data. In the above example, the "welcome" class
| would be loaded.
|
|	$route['404_override'] = 'errors/page_missing';
|
| This route will tell the Router what URI segments to use if those provided
| in the URL cannot be matched to a valid route.
|
*/

function whichSubRoute()
{
	$redirects = array(
			'local'   => 'default',  //local.halfteaspoon.com
		     'edison' => 'default',
          'localhost' => 'default',
		  		'ip'  => 'default',
	   'halfteaspoon' => 'default',  //halfteaspoon.com
			'api'     => 'api'       //api.halfteaspoon.com
			//'new'   => 'namespace' //new.halfteaspoon.com
			);
	if( isset($_SERVER['HTTP_HOST']) ){
    	$curr = $_SERVER['HTTP_HOST'];
    	$curr = explode('.', $curr);
    }else{
    	$curr = array( 'halfteaspoon' );
    }


    //echo "In routes";
    //echo "halfteaspoon is under maintainence"; print_r($curr);
    if( array_key_exists($curr[0],$redirects) || $curr[0]== 'halfteaspoon' || $curr[0] == 'localhost' || $curr[0] >0  ) 
    {
        //echo $redirects[$curr[0]];
        return ( $curr[0] >0 )?$redirects['ip']:$redirects[$curr[0]];
    }else{
    	return 'subdomain';
    }

}

$choiceRoute = whichSubRoute();

if( $choiceRoute == 'default' )
{
	//Default routes
	$route['default_controller'] = "website/home_controller";
    $route['cart/sync']          = 'website/menu_controller/update_cart_session';
    $route['menu/all']           = "website/menu_controller";
	/* END OF THE WEBSTIE ROUTES ----------------------*/

	/* MOBILE APP ROUTING */

	/* MOBILE APP ROUTING ENDS */

	$route['404_override'] = '';

}else{
	//specific url controller matching 
    if($choiceRoute == "api")
    {	
    	//$route['default_controller'] = "";
    	//ALL API URL's routes
        // $route['default_controller'] = "welcome";
        // $route['404_override'] = '';
        // //start version 1 (mvp API)
        // $route['1.0/user/(:any)'] = $choiceRoute[1].'v1_userinfo/index/$1';
        // //controllers outside of "/api"
    }

    if($choiceRoute == "subdomain")
    {
        $route['default_controller'] = "blog/blog_controller/index";
        // $route['404_override'] = '';
        // $route['welcome']                   = $choiceRoute[1].'m_welcome';
        // $route['dashboard']                 = $choiceRoute[1].'m_dashboard';
        // $route['user/(:any)']               = $choiceRoute[1].'m_userinfo/index/$1';
        // $route['reg']                       = 
        // //controllers outside of "/m"
        // $route['login/auth']                = 'login/auth';
        // $route['logout/mobile']             = 'logout/mobile';
    }

}
/* End of file routes.php */
/* Location: ./application/config/routes.php */
