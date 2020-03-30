$(document).ready(() => {

    console.log("Ready");

    // Populate the input box with some dummy polygon vertices
    let polygonVerticesInput = $("#input-polygon-vertices");
    polygonVerticesInput.val("46.28023856550844,6.065817904296855; 46.11579388534466,6.134482455078105; 46.118649720430554,5.912009310546855");

    // Create a variable for the button
    let btnGenerate = $("#btn-generate");

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
        var myMap = new google.maps.Map(document.getElementById('map'), {
            zoom: 5, 
            center: polygonBounds.getCenter()
        });

        let polygon = new google.maps.Polygon({
            paths: polygonVertices,
            fillColor: '#cccccc',
            fillOpacity: 0.5,
            strokeColor: '#0033a0'
        });
        polygon.setMap(myMap);
        console.log(getZoomByBounds(myMap, polygonBounds))

    }

    function getCenterOfPolygon(polygonVertices){
        let bounds = new google.maps.LatLngBounds();
        let i;

        for(i=0; i<polygonVertices.length; i++){
            bounds.extend(polygonVertices[i]);
        }

        return bounds;
    }

    /**
    * Returns the zoom level at which the given rectangular region fits in the map view. 
    * The zoom level is computed for the currently selected map type. 
    * @param {google.maps.Map} map
    * @param {google.maps.LatLngBounds} bounds 
    * @return {Number} zoom level
    **/
    function getZoomByBounds( map, bounds ){
        var MAX_ZOOM = map.mapTypes.get( map.getMapTypeId() ).maxZoom || 21 ;
        var MIN_ZOOM = map.mapTypes.get( map.getMapTypeId() ).minZoom || 0 ;
    
        var ne= map.getProjection().fromLatLngToPoint( bounds.getNorthEast() );
        var sw= map.getProjection().fromLatLngToPoint( bounds.getSouthWest() ); 
    
        var worldCoordWidth = Math.abs(ne.x-sw.x);
        var worldCoordHeight = Math.abs(ne.y-sw.y);
    
        //Fit padding in pixels 
        var FIT_PAD = 40;
    
        for( var zoom = MAX_ZOOM; zoom >= MIN_ZOOM; --zoom ){ 
            if( worldCoordWidth*(1<<zoom)+2*FIT_PAD < $(map.getDiv()).width() && 
                worldCoordHeight*(1<<zoom)+2*FIT_PAD < $(map.getDiv()).height() )
                return zoom;
        }
        return 0;
    }
});