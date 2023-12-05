// Used to calculate from slightly below the scroll positions
// equal to 1/4 the height of the panel (.66vh * .25 = .165vh)
const panelOffset =  window.innerHeight *.165;
// Offset distance from the top of the panel position
// Two different ranges used to help prevent lots of CSS transitions triggering at once
// * 4 = height of a single panel
const fadeEnterRange = panelOffset * 3.75;
const fadeExitRange = panelOffset * 2.6;

var scrollFromTop, negations;
// Whether an image is fullscreened or not
var viewingImage = false;

$( document ).ready(function() {
  $( ".custom1" ).on( "click", function() {
    $( ".custom1 > .custom1-text" ).toggleClass( "open", 180 );
  });

  $( ".custom2" ).on( "click", function() {
    $( ".custom2 > .custom2-text" ).toggleClass( "open", 180 );
  });

  /*----------[ Image Viewer ]----------*/
  $( ".img-full-container" ).on( "click", function() {
    var fadeInTime = 280;
    var fadeOutTime= 240;

    // If the image IS NOT being viewed
    if (viewingImage === false) {
      // Add markup to contain the loaded image
      $( ".featured-image" ).before( "<div class='ajax-image-container'><img class='ajax-image'></div>" );
      // Fade-in the image
      $( ".ajax-image" ).animate({
        opacity: 1.0
      }, fadeInTime, "swing");
      // Fade-in container's opacity to 0.75
      $( ".ajax-image-container" ).animate({
        opacity: 0.75
      }, fadeInTime, "swing");

      /* [ Load in the image asynchronously ]
        Images in the article have a high and low res version. The low res versions loaded with 
        the article uses the "pre_" prefix in their filename. This Algorithm finds the current 
        path name, then removes "pre_" from the string to get the path to the higher res version. */
      // get image path
      var imgElement = $(this).find( ".in-article" ).attr('src');
      // remove pre_ from string
      var newPath = imgElement.replace('pre_', '');
      //console.log( newPath ); // log generated path string
      loadImage( newPath );
      viewingImage = true;
    }
    else {
      // If the image IS being viewed
      viewingImage = false;
      // Fade-out the image
      $( ".ajax-image" ).animate({
        opacity: 0.0
      }, fadeOutTime, "swing");
      // Fade-out opacity, then remove the element
      $( ".ajax-image-container" ).animate({
        opacity: 0.0
      }, fadeOutTime, "swing", function() {
        $(this).remove();
      });
    }
  });

  // Scroll to top
  $("#scrollTop").on( "click", function() {
    // Scroll to the top of the page in 1000ms
    $("html, body").animate({scrollTop: 0}, 1000);
  });
});

/** Load an image asynchronously with jQuery's '.load'
 *  Arguments: [path] - relative file location
 */
loadImage = function(path) {
  var imgElement = $("<img>");
  // Class storing the image
  var image = $(".ajax-image");
  // Asynchronously load
  imgElement.on('load', function(){
    image.attr("src", $(this).attr("src"));	
  });
  // Set the src attribute
  imgElement.attr("src", path);
}