$(document).ready(() => {

    // declare variables that will be used
    var myMap                  // holds the map object drawn on the 
    var myDrawingManager       // holds drawing tools
    var myField                // holds the polygon we draw using drawing tools
    var myInfoWindow           // when our polygon is clicked, a dialog box 
                               // will open up. This variable holds that info
    var centerpoint            // center point of the map
 
    (function(){ initialize(); })()
    
    /**
     * Initialization function that sets up the map
     */
    function initialize() {
        // build the map's center point
        centerpoint = new google.maps.LatLng(45.00495,-90.00052);

        // assign map the options of zoom, center point and set the map to
        // SATELLITE
        var mapOptions = {
            zoom: 16, 
            center: centerpoint
        };

        // on our web page should be a <div> or <p> tag with id map-canvas
        // show the map in that element with the options listed above
        myMap = new google.maps.Map(
            document.getElementById('mapnvas'), 
            mapOptions
        );

        // create a dialog box but don't bind it to anything yet
        myInfoWindow = new google.maps.InfoWindow();

        // show drawing tools
        DrawingTools();
    }



})