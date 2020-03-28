$(document).ready(() => {

    // declare variables that will be used
    var myMap;                  // holds the map object drawn on the 
    var myDrawingManager;       // holds drawing tools
    var myField;                // holds the polygon we draw using drawing tools
    var myInfoWindow;           // when our polygon is clicked, a dialog box 
                                // will open up. This variable holds that info
    var centerpoint;            // center point of the map
 
    (function(){ initialize(); })();

    
})