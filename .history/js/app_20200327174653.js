$(document).ready(() => {
    console.log("document is ready")

    // This example requires the Drawing library. Include the libraries=drawing
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing">

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 8
    })

    // get current location
    const infoWindow = new google.maps.InfoWindow
    const geocoder = new google.maps.Geocoder

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
            let pos = {
                lat: position.coords.latitude,
                lng: position.coords.longitude
            }
            infoWindow.setPosition(pos)
            infoWindow.setContent('Location found.')
            infoWindow.open(map)
            map.setCenter(pos)
            $("#selected-field-input").val()
        }, () => {
            handleLocationError(true, infoWindow, map.getCenter())
        })
    }else{
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }

    $




        var drawingManager = new google.maps.drawing.DrawingManager({
            drawingMode: google.maps.drawing.OverlayType.MARKER,
            drawingControl: true,
            drawingControlOptions: {
                position: google.maps.ControlPosition.TOP_CENTER,
                drawingModes: ['marker', 'circle', 'polygon', 'polyline', 'rectangle']
            },
            markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
            circleOptions: {
                fillColor: '#ffff00',
                fillOpacity: 1,
                strokeWeight: 5,
                clickable: false,
                editable: true,
                zIndex: 1
            }
        });
        drawingManager.setMap(map);

})
function handleLocationError(browserHasGeolocation, infoWindow, pos) {
    infoWindow.setPosition(pos);
    infoWindow.setContent(browserHasGeolocation ?
        'Error: The Geolocation service failed.' :
        'Error: Your browser doesn\'t support geolocation.');
    infoWindow.open(map);
}
