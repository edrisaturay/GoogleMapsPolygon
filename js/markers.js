$(document).ready(() => {
    
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

    let marker
    let pos

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
})
