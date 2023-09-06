// Used to calculate from slightly below the scroll positions
// equal to 1/4 the height of the panel
const panelOffset =  window.innerHeight *.165;
// How far away from a scroll position to calculate
// Set multiplier to 2 to prevent multiple panels from saturating simultaneously
const panelTestRange = panelOffset * 2.5;

var scrollFromTop, negations;

$( document ).ready(function() {
  $( document ).on("scroll", function() {
    // Current scroll position
    scrollFromTop = $( "html" ).scrollTop();
    //console.log(scrollFromTop);

    negations = scrollFromTop + panelOffset;

    // When a panel is in view
    $( ".gallery-thumbnail" ).filter(function (){
      return (Math.abs( ( $(this).offset().top ) - negations) < panelTestRange ) ? true : false;
    })
      .css("filter", "saturate(100%)");

    // When a panel is out of view
    $( ".gallery-thumbnail" ).filter(function (){
      return (Math.abs( ( $(this).offset().top ) - negations) >= panelTestRange ) ? true : false;
    })
      .css("filter", "saturate(0%)");
  });
});