$(document).ready(() => {

    console.log("Ready");

    // Populate the input box with some dummy polygon vertices
    let polygonVerticesInput = $("#input-polygon-vertices");
    polygonVerticesInput.val("46.28023856550844,6.065817904296855; 46.11579388534466,6.134482455078105; 46.118649720430554,5.912009310546855");

    // Create a variable for the button
    let btnGenerate = $("#btn-generate");

    // Listen for the button on click event
    btnGenerate.on("click", () => {
        transformValuesToCoordinates();
        initializeMap();
    });

    function transformValuesToCoordinates() {
        let rawVertices = polygonVerticesInput.val();
        if(rawVertices == ""){
            // $("#form-group-vertices").addClass("has-error");

        }
    }

    function initializeMap() {

    }
});