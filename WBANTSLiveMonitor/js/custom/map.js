
function Map(elementId) {

    var _elementId = elementId;
    var _internalMap = null;
    var _serviceAdapter = new ServiceAdapter();

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

        _serviceAdapter.GetLocationSensorData(
            function (values) {

                var routeCoordinates = values;      
                var route = new google.maps.Polyline({
                    path: routeCoordinates,
                    geodesic: true,
                    strokeColor: '#33FE33',
                    strokeOpacity: 1.0,
                    strokeWeight: 2
                });

                route.setMap(_internalMap);

                var latlngbounds = new google.maps.LatLngBounds();
                for (var i = 0; i < routeCoordinates.length; i++) {
                    latlngbounds.extend(routeCoordinates[i]);
                }
                _internalMap.fitBounds(latlngbounds);
            }
        );

    }

    google.maps.event.addDomListener(window, 'load', initialize);

}

$(document).ready(function () {
    var map = new Map("map");
});