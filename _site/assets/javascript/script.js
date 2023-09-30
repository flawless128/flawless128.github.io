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