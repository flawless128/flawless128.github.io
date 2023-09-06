// Used to calculate from slightly below the scroll positions
// equal to 1/4 the height of the panel
const panelOffset =  window.innerHeight *.165;
// Offset distance from the top of the panel position
// Two different ranges used to help prevent lots of CSS transitions triggering
// * 4 = height of a single panel
const fadeEnterRange = panelOffset * 3.75;
const fadeExitRange = panelOffset * 2.6;

var scrollFromTop, negations;

$( document ).ready(function() {
  $( document ).on("scroll", function() {
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
  });
});