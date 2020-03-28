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
        centerpoint = new google.maps.LatLng(0,0);
        getCurrentLocation();
        // assign map the options of zoom, center point and set the map to
        // SATELLITE
        var mapOptions = {
            zoom: 16, 
            center: centerpoint
        };

        // on our web page should be a <div> or <p> tag with id map-canvas
        // show the map in that element with the options listed above
        myMap = new google.maps.Map(
            document.$('#map'), 
            mapOptions
        );

        // create a dialog box but don't bind it to anything yet
        myInfoWindow = new google.maps.InfoWindow();

        // show drawing tools
        DrawingTools();
    }

    /**
     * get the user current location and zoom to it
     */
    function getCurrentLocation(){
        if(navigator.geolocation) {
            navigator.geolocation.getCurrentPosition( (position) => {
                pos = [
                    {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                ]
                myMap.setCenter(pos)
            })
        }else{
            // Browser doesn't support Geolocation
            handleLocationError(false, infoWindow, map.getCenter());
        }
    }



    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

    /**
     * Show drawing tools
     */
    function DrawingTools() {

        // drawingMode of NULL, which means that the map drawing tools will
        // have no default drawing tool selected. If drawingMode was set to 
        // google.maps.drawing.OverlayType.POLYGON, polygon would be auto-
        // selected
        // drawingModes can have multiple information. Over here only the
        // polygon capability is added along with the default of hand icon
        // Moreover, polygonOptions are specified as defaults
        myDrawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: null,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_RIGHT,
                drawingModes: [
                    google.maps.drawing.OverlayType.POLYGON
                ]
            },
            polygonOptions: {
                draggable: true,
                editable: true,
                fillColor: '#cccccc',
                fillOpacity: 0.5,
                strokeColor: '#0033a0',
            }
        });
        myDrawingManager.setMap(myMap);

        // when polygon drawing is complete, an event is raised by the map
        // this function will listen to the event and work appropriately
        FieldDrawingCompletionListener();
    }


    /**
     * Using the drawing tools, when a polygon is drawn an event is raised. 
     * This function catches that event and hides the drawing tool. It also
     * makes the polygon non-draggable and non-editable. It adds custom 
     * properties to the polygon and generates a listener to listen to click
     * events on the created polygon
     */
    function FieldDrawingCompletionListener() {
        // capture the field, set selector back to hand, remove drawing
        google.maps.event.addListener(
            myDrawingManager,
            'polygoncomplete',
            function(polygon) {
                myField = polygon;
                ShowDrawingTools(false);
                PolygonEditable(false);
                AddPropertyToField();
                FieldClickListener();
            }
        );
    }

    



})