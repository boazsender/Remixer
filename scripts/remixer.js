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

  var body = $('body')
    .bind( 'dragenter dragover', false)
    .bind( 'drop', function( e ) {
      e.stopPropagation();
      e.preventDefault();
      
      console.log( e.dataTransfer.files )
      
      $.each( e.dataTransfer.files, function(index, file){
        var fileReader = new FileReader();
            fileReader.onload = (function(file) {
               return function(e) { 
                 $('#bin1').append( file.fileName + '<img src="'+ e.target.result  +'">') 
               }; 
            })(file);
        fileReader.readAsDataURL(file);
      });
      
    });
});
