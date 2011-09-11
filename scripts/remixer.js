jQuery(function($){
  
  /*
   * Handy drag n' drop -> Data URL tool
   * by @boazsender: http://boazsender.com
   *
   */ 
  
  // jQuery creates it's own event object, and it doesn't have a
  // dataTransfer property yet. This adds dataTransfer to the event object.
  // Thanks to @tbranyen for figuring this out!
  $.event.props.push('dataTransfer');

  $('body')
    .bind( 'dragenter dragover', false)
    .bind( 'drop', function( e ) {
      e.stopPropagation();
      e.preventDefault();
      droplocation = $(e.target);
      if( e.dataTransfer && e.dataTransfer.files ){
        $.each( e.dataTransfer.files, function(index, file){
          var fileReader = new FileReader();
              fileReader.onload = (function(file) {
                 return function(e) {
                  $('<video>', {
                    class: 'thumb',
                    controls: true,
                    src: e.target.result
                  })
                  .draggable({
                    revert: true
                  })
                  .appendTo( droplocation )
                }; 
              })(file);
          fileReader.readAsDataURL(file);
        });
      }
    });

  $('#audioSource, #videoSource').droppable({
  	drop: function( event, ui ) {
  	  $( ui.helper ).appendTo( this )
  	}
  });
  
/*
  // This doesn't work on <video elements>
  $('#audioSource').bind( 'dragenter dragover', false);
  $('#audioSource').bind( 'drop', function( event ) {
    event.stopPropagation();
    event.preventDefault();
    $('#audioSource').append( event.dataTransfer.getData('text/html') );
      
  });
*/


});
