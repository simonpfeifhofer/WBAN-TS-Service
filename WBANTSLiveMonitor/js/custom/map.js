
function Map(elementId) {

    var _elementId = elementId;
    var _internalMap = null;

    var initialize = function(){
        var map_canvas = document.getElementById(_elementId);
        var map_options = {
            center: new google.maps.LatLng(44.5403, -78.5463),
            zoom: 8,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        }
        _internalMap = new google.maps.Map(map_canvas, map_options);
        drawRoute();
    }

    var drawRoute = function(){

        var routeCoordinates = [
            new google.maps.LatLng(44.5403, -78.5463),
            new google.maps.LatLng(21.291982, -157.821856),
            new google.maps.LatLng(-18.142599, 178.431),
            new google.maps.LatLng(-27.46758, 153.027892)
        ];
        var route = new google.maps.Polyline({
            path: routeCoordinates,
            geodesic: true,
            strokeColor: '#FF0000',
            strokeOpacity: 1.0,
            strokeWeight: 2
        });

        route.setMap(_internalMap);
    }

    google.maps.event.addDomListener(window, 'load', initialize);

}

$(document).ready(function () {
    var map = new Map("map");
});