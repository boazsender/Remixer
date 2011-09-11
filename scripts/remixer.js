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
    
    // Only let videos get dropped from the file system onto one of the bins
    if( droplocation.attr('id') === 'bin1' || droplocation.attr('id') === 'bin2'){
      // Only try to put file(s) in the bins if some have been dragged to the browser
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
    }
  });

  $('#audioSource, #videoSource').droppable({
  	drop: function( event, ui ) {
  	  $( this ).html( ui.helper )
  	}
  });
  
  $('#makeMashup').click(function(){
    var audio = Popcorn('#audioSource video'),
        audioSrc = $('#audioSource video').attr('src'),
        video = Popcorn('#videoSource video'),
        videoSrc = $('#videoSource video').attr('src');
    
    $('<audio>', {
      src: audioSrc,
      id: 'newAudio'
    })
    .appendTo('body')
    .css({
     display: 'none' 
    });

    $('#mashup').html(
      $('<video>', {
        src: videoSrc,
        id: 'newVideo'
      })
    )
    

    var newAudio = Popcorn('#newAudio'),
        newVideo = Popcorn('#newVideo');
    
    newAudio.play()
    newVideo.volume(0).play()
    
  });
  
  $('#swapVideos').click(function(){
    console.log('asd')
    var video = $('#videoSource video'),
        audio = $('#audioSource video');
    

        video.appendTo('#audioSource')
        audio.appendTo('#videoSource')
    
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



