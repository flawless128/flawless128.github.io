// Used to calculate from slightly below the scroll positions
// equal to 1/4 the height of the panel (.66vh * .25 = .165vh)
const panelOffset =  window.innerHeight *.165;
// Offset distance from the top of the panel position
// Two different ranges used to help prevent lots of CSS transitions triggering at once
// * 4 = height of a single panel
const fadeEnterRange = panelOffset * 3.75;
const fadeExitRange = panelOffset * 2.6;

var scrollFromTop, negations;

$( document ).ready(function() {
  // Fade panels on scroll and resize
  $( document ).scroll(fadeScroll);
  $( document ).resize(fadeScroll);

  /*
  $( ".custom" ).hover(function() {
    $(this).animate({paddingLeft: '+=1.5rem'}, 250, 'swing');
  }, function() {
    $(this).animate({paddingLeft: '-=1.5rem'}, 250, 'swing');
  });
*/

  $( ".custom1" ).on( "click", function() {
    $( ".custom1 > .custom1-text" ).toggleClass( "open", 180 );
  });

  $( ".custom2" ).on( "click", function() {
    $( ".custom2 > .custom2-text" ).toggleClass( "open", 180 );
  });
});

fadeScroll = function() {
  // Current scroll position
  scrollFromTop = $( "html" ).scrollTop();
  //console.log(scrollFromTop);

  negations = scrollFromTop + panelOffset;

  // When a panel is in view
  $( ".gallery-thumbnail" ).filter(function (){
    return (Math.abs( ( $(this).offset().top ) - negations) < fadeEnterRange ) ? true : false;
  })
    .css("filter", "saturate(100%)");

  // When a panel is out of view
  $( ".gallery-thumbnail" ).filter(function (){
    return (Math.abs( ( $(this).offset().top ) - negations) >= fadeExitRange ) ? true : false;
  })
    .css("filter", "saturate(0%)");
}