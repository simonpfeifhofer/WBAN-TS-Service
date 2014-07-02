

function ServiceAdapter() {

    this.GetHRMSensorData = function(callback){

        $.getJSON(
            "http://wbants.cloudapp.net/api/sensordata/HRM/30",
            function (data) {
                var values = [];
                var dates = [];
                $.each(data.results, function (key, val) {
                    values.push(val.value);
                    dates.push(new Date(val.timestamp));
                });
                callback(dates, values);
            });
    }

    this.GetLocationSensorData = function (callback) {

        $.getJSON(
            "http://wbants.cloudapp.net/api/sensordata/Location",
            function (data) {
                var values = [];
                $.each(data.results, function (key, val) {
                    values.push(new google.maps.LatLng(val.value.Latitude, val.value.Longitude));
                });
                callback(values);
            });
    }

}