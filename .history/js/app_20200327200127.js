$(document).ready(() => {

    // This example requires the Drawing library. Include the libraries=drawing
    // parameter when you first load the API. For example:
    // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=drawing">

    const map = new google.maps.Map(document.getElementById('map'), {
        center: {lat: 0, lng: 0},
        zoom: 10
    })

    map.addListener('click', (event) => {
        handleMapClickListener(event)
    })

    function handleMapClickListener(event){
        if(marker != null){
            marker.setMap(null)
            pos = [
                {
                    lat: event.latLng.lat(),
                    lng: event.latLng.lng()
                }
            ]
            createMarkerAtPosition(pos)
            marker.setMap(map)
        }

    }

    // get current location
    const infoWindow = new google.maps.InfoWindow
    let marker;
    const geocoder = new google.maps.Geocoder
    let pos;

    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition( (position) => {
            pos = [
                {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            ]
            zoomToLocation(pos)
            createMarkerAtPosition(pos)
        })
    }else{
        // Browser doesn't support Geolocation
        handleLocationError(false, infoWindow, map.getCenter());
    }


    function zoomToLocation(pos){
        map.setCenter(pos[0])
        setInputText(pos[0].lat, pos[0].lng)
    }

    function createMarkerAtPosition(pos){
        marker = new google.maps.Marker({
            map: map,
            position: pos[0],
            draggable: true, 
            title: "Drag me!"
        })
        setInputText(pos[0].lat, pos[0].lng)
        marker.addListener('drag', (event) => {
            setInputText(event.latLng.lat(), event.latLng.lng())
        })
    }

    function setInputText(lat, lng){
        $("#selected-field-input").val(lat + ', ' + lng)
    }
    
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }
    

    $("#multiple-points").click(())
    // var drawingManager = new google.maps.drawing.DrawingManager({
    //     drawingMode: google.maps.drawing.OverlayType.MARKER,
    //     drawingControl: true,
    //     drawingControlOptions: {
    //         position: google.maps.ControlPosition.TOP_CENTER,
    //         drawingModes: [
    //             // 'marker', 
    //             // 'circle', 
    //             'polygon', 
    //             // 'polyline', 
    //             // 'rectangle'
    //         ]
    //     },
    //     markerOptions: {icon: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png'},
    //     circleOptions: {
    //         fillColor: '#ffff00',
    //         fillOpacity: 1,
    //         strokeWeight: 5,
    //         clickable: false,
    //         editable: true,
    //         zIndex: 1
    //     }
    // });
    // drawingManager.setMap(map);

})


function addMarkerListener(marker){
   
}

