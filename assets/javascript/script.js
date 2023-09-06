$( document ).ready(function() {
  // Used to calculate from slightly below the scroll positions
  // equal to 1/4 the height of the panel
  const panelOffset =  window.innerHeight *.165;
  // How far away from a scroll position to calculate
  // Set multiplier to 2 to prevent multiple panels from saturating simultaneously
  const panelTestRange = panelOffset * 2.25;

  $( document ).on("scroll", function() {
    // Current scroll position
    var scrollFromTop = $( "html" ).scrollTop();
    //console.log(scrollFromTop);

    // When a panel is in view
    $( ".gallery-thumbnail" ).filter(function (){
      return (Math.abs( ( $(this).offset().top ) - scrollFromTop - panelOffset) < panelTestRange ) ? 
      true : false;
    })
      .css("filter", "saturate(100%)");

    // When a panel is out of view
    $( ".gallery-thumbnail" ).filter(function (){
      return (Math.abs( ( $(this).offset().top ) - scrollFromTop - panelOffset) >= panelTestRange ) ? 
      true : false;
    })
      .css("filter", "saturate(0%)");
  });
});