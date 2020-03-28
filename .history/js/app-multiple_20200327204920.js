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


    function zoomToLocation(pos){
        map.setCenter(pos[0])
    }

    function generateLatLngBoxes(){
        let wrapper = $()

        '<div class="form-group">
        <label for="selected-field-input">Selected Point</label>
        <input type="text" class="form-control" id="selected-field-input" placeholder="Selected Lat Lng ">
    </div>'
    }
   
    
    function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
            'Error: The Geolocation service failed.' :
            'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
    }

})