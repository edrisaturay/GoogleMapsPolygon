$(document).ready(() => {
    // declare variables that will be used
    var myMap                  // holds the map object drawn on the 
    var myDrawingManager       // holds drawing tools
    var myField                // holds the polygon we draw using drawing tools
    var myInfoWindow           // when our polygon is clicked, a dialog box 
                               // will open up. This variable holds that info
    var centerpoint            // center point of the map
 
    // build the map's center point
    // assign map the options of zoom, center point and set the map to
    // SATELLITE
    var mapOptions = {
        zoom: 10, 
        center: {lat: 0, lng: 0}
    };

    // on our web page should be a <div> or <p> tag with id map-canvas
    // show the map in that element with the options listed above
    myMap = new google.maps.Map(
        document.getElementById('map'), 
        mapOptions
    );

    // create a dialog box but don't bind it to anything yet
    myInfoWindow = new google.maps.InfoWindow();

    // show drawing tools
    getCurrentLocation();
    DrawingTools();
    
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
                myMap.setCenter(pos[0])
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

    /**
     * Show or hide drawing tools
     */
    function ShowDrawingTools(val) {
        myDrawingManager.setOptions({
            drawingMode: null,
            drawingControl: val
        });
    }

    /**
     * Allow or disallow polygon to be editable and draggable 
     */
    function PolygonEditable(val) {
        myField.setOptions({
            editable: val,
            draggable: val
        });
        myInfoWindow.close();
        return false;
    }

    /**
     * Add custom property to the polygon
     */
    function AddPropertyToField() {
        var obj = {
            'id':5,
            'grower':'Joe',
            'farm':'Dream Farm'
        };
        myField.objInfo = obj;
    }

    /**
     * Attach an event listener to the polygon. When a user clicks on the 
     * polygon, get a formatted message that contains links to re-edit the 
     * polygon, mark the polygon as complete, or delete the polygon. The message
     * appears as a dialog box
     */
    function FieldClickListener() {
        google.maps.event.addListener(
            myField,
            'click',
            function(event) {
                var message = GetMessage(myField);
                myInfoWindow.setOptions({ content: message });
                myInfoWindow.setPosition(event.latLng);
                myInfoWindow.open(myMap);
            }
        );
    }

    /**
     * Delete the polygon and show the drawing tools so that new polygon can be
     * created
     */
    function DeleteField() {
        myInfoWindow.close();
        myField.setMap(null);
        ShowDrawingTools(true);
    }

    /**
     * Allow or disallow polygon to be editable and draggable 
     */
    function PolygonEditable(val) {
        myField.setOptions({
            editable: val,
            draggable: val
        });
        myInfoWindow.close();
        return false;
    }
    
    /**
     * Get coordinates of the polygon and display information that should 
     * appear in the polygon's dialog box when it is clicked
     */
    function GetMessage(polygon) {
        var coordinates = polygon.getPath().getArray();
        var message = '';

        if (typeof myField != 'undefined') {
            message += '<h1 style="color:#000">Grower: ' 
                + myField.objInfo.grower + '<br>'
                + 'Farm: ' + myField.objInfo.farm + '</h1>';
        }

        message += '<div style="color:#000">This polygon has ' 
            + coordinates.length + ' points<br>'
            + 'Area is ' + GetArea(polygon) + ' acres</div>';

        var coordinateMessage = '<p style="color:#000">My coordinates are:<br>';
        for (var i = 0; i < coordinates.length; i++) {
            coordinateMessage += coordinates[i].lat() + ', ' 
                + coordinates[i].lng() + '<br>';
        }
        coordinateMessage += '</p>';

        message += '<p class><a href="#" id="edit-polygon" class="btn btn-warning mr-2">Edit</a> '
            + '<a href="#" id="save-polygon" class="btn btn-success mr-2">Done</a> '
            + '<a href="#" id="delete-polygon" class="btn btn-danger mr-2">Delete</a></p>'
            + coordinateMessage;

        return message;
    }

    /**
     * Get area of the drawn polygon in acres
     */
    function GetArea(poly) {
        var result = parseFloat(google.maps.geometry.spherical.computeArea(poly.getPath())) * 0.000247105;
        return result.toFixed(4);
    }




})