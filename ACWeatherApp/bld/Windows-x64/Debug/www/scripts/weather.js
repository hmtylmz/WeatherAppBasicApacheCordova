var WeatherApp = {};

(function ($, ns, navigator) {
    ns.getWeather = function () {
        navigator.geolocation.getCurrentPosition(onGetLocationSuccess, onGetLocationError, { enableHighAccuracy: true });
    }
    var onGetLocationSuccess = function (position) {
        $("#result").html(position.coords.latitude + " " + position.coords.longitude);
        var url = "http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&appid=e92a7c265a3399c34d2b0864a50cf040";

        $.getJSON(url, function (result) {

            var date = new Date();

            $("#weatherPlace").html(result.name);
            $("#dateNow").html(date.getUTCDate() + "." + date.getUTCMonth() + 1 + "." + date.getUTCFullYear());

            $("#weatherImage").attr("src", "http://openweathermap.org/img/w/" + result.weather[0].icon + ".png");
            $("#weatherSummary").html(result.weather[0].main + " " + parseInt((result.main.temp) - 273.15) + " degree");
            $("#weatherDetail").html(result.weather[0].description);
        }).error(function (xhr, status, error) {
            $("#result").html($("#result").html() + xhr + + status + error + "ersrs");
        });
    }

    var onGetLocationError = function (error) {
        $("#result").html(error.message);
    }

})($, WeatherApp, navigator);