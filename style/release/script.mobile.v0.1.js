var debug = true;
var scriptsLoaded = [];  //When a script is load push it to loaded
var templates = {}; //global tempalte object
var API = {};
/**
* Base Helper 
* 1. Provides the browser storage options 
* 2. Provides ajaxCaller 
* 3. Parser 
**/
var BASE = (function(baseHelper){

  var html5_support = false;
  var cookieEnabled = false;
  
  //--- Testing html5support  ---------------
  if(Storage){
      //html5 storage supported
      debug && console.log('Supports Html5');
      html5_support = true;

  }else{
      //html5 support not available.
      debug && console.log('Doesnot support html5');
      html5_support = false;
      cookieEnabled = areCookiesEnabled();
      //We are also setting a variable 'cookieEnabled' for checking whether javascrit
      //cookie is enabled or not.
  }
  //--- End of the testing html5 support ----  

  /** Private methods **/
  function areCookiesEnabled() {
        var persist= true;
        do {
            var c= 'gCStest='+Math.floor(Math.random()*100000000);
            document.cookie= persist? c+';expires=Tue, 01-Jan-2030 00:00:00 GMT' : c;
            if (document.cookie.indexOf(c)!==-1) {
                document.cookie= c+';expires=Sat, 01-Jan-2000 00:00:00 GMT';
                return persist;
            }
        } while (!(persist= !persist));
        return false;
  }true
  
  function defaultOptions(){
      return { 'expires': '' , 'path': '' };
      //Empty expire means for this session and path empty means the current folder
  }

  //data performs both woth reading and writing the data 
  baseHelper.data =  function (key,value,options){
       var result;
       if(html5_support){
           //write 
           if( typeof value != "undefined" ){              
               sessionStorage.setItem( key, value );
               return true;
           }
           //read
           result = sessionStorage.getItem(key);
       }else if (cookieEnabled){
          //Do it the javascript-cookie-way.
         //write 
          if(typeof value != "undefined" ){
            
            if(!options)
                 options = defaultOptions();
            //console.log(options);
            var expDate;
            
            if(typeof options.expires !== "undefined" && typeof options.expires === "number" ){
              var exdate = new Date();
              exdate.setDate(exdate.getDate() + options.expires); 
              expDate = exdate.toUTCString();
            } 
            var cookieString = key + '=' +value;
            cookieString += options.expires? ';expires='+expDate:'';
            cookieString += options.path?    ';path='+options.path:'';
            //cookieString += options.domain?  ';domain='+options.domain:'';

            document.cookie  = cookieString;
            return true;
            //console.log(cookieString);
           }
           
         //read
         //console.log(document.cookie);
         var cookies = document.cookie.split(';');
         //console.log(cookies);
         
         var result = key ? undefined : {};
         for (var i = 0, l = cookies.length; i < l; i++) {
             
             var parts = cookies[i].split('=');
             var name  = parts[0].trim();
             var value = parts[1].trim();            
             
             if( key && name === key ){
                
                 result = value;
                 break;
             }

          }  // For loop ends 
              
       }else{ //Cookie saved in javascript way.
          //The browser neither supports html5 nor javascript cookie
          alert('Your browser seems to be pretty old. Try new and visit us.');
       }
       //console.log('Return from the cookie function : ');
       //console.log( "Return : "+result);
       return result;
   };
   //End of setData


  baseHelper.remove = function (key,options){
       if(html5_support){
           
           if(sessionStorage.getItem(key) !== null ){
                 sessionStorage.removeItem(key);
                 return true;
           }else{                  
                 debug && console.log("No such key in local storage");
                 return false; 
           }

       }else if(cookieEnabled){
          if(!options)
                options = defaultOptions();
          document.cookie = key + '=; expires=Thu, 01 Jan 1970 00:00:01 GMT;'+';path='+options.path;
       }else{
          //The browser neither supports html5 nor javascript cookie
          alert('Your browser seems to be pretty old. Try new and visit us.');
       }
  };// prototype remove data 

  baseHelper.serialToObject = function(a){
    
    var b = a.split('&'),r={},t;
    var len = b.length; 
    
    for (var i = 0; i < len ; ++i){
      t = b[i].split('=');
      if (t.length != 2) continue;
      r[t[0]] = t[1];
    }
    return r;
  }
  
  return baseHelper; 

})( BASE || {} );

//Send all post ajax request via this 
function ajax(type,data,url,callback){
  debug && console.log('A '+type+' AJAX request to '+url+' with data:');
  debug && console.log(data);
  $.ajax({
      type: type,
      url: url,
      data: data,
      success: function(response){
         //console.log(response);         
         callback(response);
      }
  }); ///Ajax post  
}
