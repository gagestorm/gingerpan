/**
* File desktop/cart.js
* 
**/
var API = (function($,api){  

  debug && console.log('Cart js just got loaded.');

  var cartItemTemplate = function(t){
      
      var html = '<div class="cart-item-container" id="item-'+t.sku+'">';
      html += '<div class="item-image">'+
          '<img src="'+base_url+'images/'+t.image+'" />'+
        '</div>'+

        '<div class="item-info">'+
          '<span class="item-name">'+t.name+'</span>'+
          '<div class="item-extra">'+
            '<span class="item-serving">Serving</span>'+
            '<ul class="radio-list" data-sku="'+t.sku+'">';
      html += '<li><a href="#" class="opt opt-2 ';
      html += (t.serving==2)?' selected" ':' " ';
      html += '>2</a></li>';
      html += '<li><a href="#" class="opt opt-4 ';
      html += (t.serving==4)?' selected" ':' " ';
      html += '>4</a></li>';      
      html += '<li><a href="#" class="opt opt-6 ';
      html += (t.serving==6)?' selected" ':' " ';
      html += '>6</a></li>';              
      html += '</ul>'+
            '</div>'+
          '</div>'+
        '</div>';


      return html;    
  }

  $(document).on('click','.add-cart',function(e){

      e.preventDefault();
      debug && console.log('An item was added to the cart.');
      var m = $(this),data={};
      data.sku=m.attr('data-sku');
      data.name=m.attr('data-name');
      data.image=m.attr('data-image');
      data.serving =2 ;
      debug && console.log(data);
      api.updateCart(data);

  });

  $(document).on('click','.opt',function(e){
    
      e.preventDefault();
      debug && console.log('Increasing the servings');
      var me = $(this);
      var parent = me.parent().parent(); //reached radio-list
      parent.find('.opt').removeClass('selected');
      me.addClass('selected');
      api.updateCartForm({ 'sku': parent.attr('data-sku') , 'serving' : me.html() });

  });

  api.updateCartForm = function(d){
    var slct = $(".item-f-"+d.sku); 
    if( slct.length != 0 )
        slct.remove();
    $('#cart-form').append('<input class="item-f-'+d.sku+'" name="items[]" value="'+d.sku+'|'+d.serving+'" />');
    api.saveCartSession(); //Make changes to sesssion 
  }

  api.updateCart = function(data){

    //Create the template using data
    var html = cartItemTemplate(data);

    //Check whether same product is already is the list
    var itemCount = parseInt($('#cart-item-count').val());

    if( $('#item-'+data.sku).length != 0 ){

      //This is already on screen, change the servings
      debug && console.log('This item is already in the cart'); 
      var c = '#item-'+data.sku;
      var p = parseInt($(c+' .selected').html());
      if( p < 6){
        p+=2;
        $('#item-'+data.sku+' .opt').removeClass('selected');
        $(c+' .opt-'+p).addClass('selected');
      }
      $(".item-f-"+data.sku).remove();
      api.updateCartForm({ 'sku':data.sku , 'serving' : p });

    }else{

      $('#cart-design').append(html);
      $('#cart-item-count').val(itemCount+1);  
      api.updateCartForm({ 'sku':data.sku , 'serving' : 2 });

    }   
    
  }

  api.saveCartSession = function(){
      var data = $('#cart-form-wrap').serialize();
      ajax('POST',data,base_url+'cart/sync',function(e){

      });
  }

  return api; 

})(jQuery,API || {} );