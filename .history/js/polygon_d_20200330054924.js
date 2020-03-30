$(document).ready(() => {

    console.log("Ready");

    var myMap                  // holds the map object drawn on the 
    var myDrawingManager       // holds drawing tools
    var polygon                // holds the polygon we draw using drawing tools
    var myInfoWindow           // when our polygon is clicked, a dialog box 
                               // will open up. This variable holds that info
    var centerpoint            // center point of the map

    // Populate the input box with some dummy polygon vertices
    let polygonVerticesInput = $("#input-polygon-vertices");
    polygonVerticesInput.val("46.28023856550844,6.065817904296855; 46.11579388534466,6.134482455078105; 46.118649720430554,5.912009310546855");

    // Create a variable for the button
    let btnGenerate = $("#btn-generate");

    let mapWrapper = $("google-map-wrapper");

    // Listen for the button on click event
    btnGenerate.on("click", () => {
        let polygonVertices = transformValuesToCoordinates();
        if(polygonVertices != null){
            // Define the LatLng coordinates for the polygon's path.
            initializeMap(polygonVertices);
        }
    });

    function transformValuesToCoordinates() {
        let rawVertices = polygonVerticesInput.val();
        if(rawVertices != ""){
            let vertices = rawVertices.split(";");
            let verticesLatLng = [];

            vertices.forEach(element => {
                element = element.split(",");
                let tempObject = {
                    lat: parseFloat(element[0]), 
                    lng: parseFloat(element[1])
                };
                verticesLatLng.push(tempObject);
            });
            return verticesLatLng;
        }
        return null;
    }

    function initializeMap(polygonVertices) {
        let polygonBounds = getCenterOfPolygon(polygonVertices);
        centerpoint = polygonBounds.getCenter();
        var myMap = new google.maps.Map(document.getElementById('map'), {
            zoom: 5, 
            center: centerpoint
        });

        polygon = new google.maps.Polygon({
            paths: polygonVertices,
            editable: true,
            draggable: true,
            fillColor: '#cccccc',
            fillOpacity: 0.5,
            strokeColor: '#0033a0'
        });
        polygon.setMap(myMap);
        myMap.fitBounds(polygonBounds);
        $("#btn-location").css("display", "block");
        
    }

    function initializeDrawingManager(){
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
        
    }

    function AddAdditionalEventListeners(polygon){
        polygon.getPaths().forEach((path, index) => {
            // Add new point event listener
            google.maps.event.addListener(path, 'insert_at', () => {
                // new point
                updatePolygonVerticesTextBox(polygon);
            });

            // Add remove point event listener
            google.maps.event.addListener(path, 'remove_at', function(){
                // Point was removed
                updatePolygonVerticesTextBox(polygon);
            });
        
            // Add moved point event listener
            google.maps.event.addListener(path, 'set_at', function(){
                // Point was moved
                updatePolygonVerticesTextBox(polygon);
            });
        });

        // Add drag end event listener
        google.maps.event.addListener(polygon, 
            "dragend", 
            () => {
                updatePolygonVerticesTextBox(polygon);
            }
        );

        // Add drag event listener
        google.maps.event.addListener(polygon, 
            "drag", 
            () => {
                updatePolygonVerticesTextBox(polygon);
            }
        );
    }

    function updatePolygonVerticesTextBox(polygon){
        polygonVerticesInput.empty();
        polygonVerticesInput.addClass("mt-3 border border-secondnary p-3");
        var coordinates = polygon.getPath().getArray();
        var elements = '';
        coordinates.forEach((element, index) => {
            elements += element.lat() + "," + element.lng();
            if((index + 1) != coordinates.length) {
                elements +=  "; " ;
            }
        });
        polygonVerticesInput.val(elements);
    }

    function getCenterOfPolygon(polygonVertices){
        let bounds = new google.maps.LatLngBounds();
        let i;

        for(i=0; i<polygonVertices.length; i++){
            bounds.extend(polygonVertices[i]);
        }

        return bounds;
    }

    $("#back-to-location").on("click", () => {
        myMap.setCenter(centerpoint);
    });
});