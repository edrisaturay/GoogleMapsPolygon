$(document).ready(() => {

    // This example requires the Drawing library. Include the libraries=drawing
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing">

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 10
    })

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
            pos = [
                {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            ]
            zoomToLocation(pos)
        })
    }else{
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

     var drawingManager = new google.maps.drawing.DrawingManager({
        drawingMode: google.maps.drawing.OverlayType.MARKER,
        drawingControl: true,
        drawingControlOptions: {
            position: google.maps.ControlPosition.TOP_CENTER,
            drawingModes: [
                'polygon'
            ]
        },
        markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
        polygonOptions: {
            fillColor: '#0033a0',
            fillOpacity: 0.3,
            strokeWeight: 5,
            strokeColor: '#0033a0',
            clickable: false,
            editable: true,
            zIndex: 1
        }
    });
    drawingManager.setMap(map);

    $("#clear-polygon").click(() => {
        if(drawingManager != null){
            drawingManager.setMap(nul)
        }
    })

    function zoomToLocation(pos){
        map.setCenter(pos[0])
    }

    function generateLatLngBoxes(){
        let wrapper = $()

        
        var content = `
        <div class="form-group">
            <label for="selected-field-input">Selected Point</label>
            <input type="text" class="form-control" id="selected-field-input" placeholder="Selected Lat Lng ">
        </div>
        `
    }
   
    
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

})