$(document).ready(function () {

    $(".searchBtn").click(function () {
        // $("#cityInfo").empty();

        let search = $(this).prev().val()

        const key = "198e7cd123c38028748d31ffb347ffa7";

        const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + key;

        //
        $.ajax({
                url: URL,
                method: "GET"
            })
            .then(function (response) {
                let cityLoc = $("#city");
                cityLoc.text(response.name);

                let temp = $("#temperature");
                let tempConvert = (((response.main.temp - 273.15) * (9 / 5)) + 32);

                temp.text("Temperature: " + tempConvert.toFixed(1) + "°F");

                let humidity = $("#humidity");
                humidity.text("Humidity: " + response.main.humidity + "%");

                let windSpeed = $("#windSpeed");
                windSpeed.text("Wind Speed: " + response.wind.speed + "MPH");

                //generate lon and lat for uv index pull
                let lon = response.coord.lon;
                let lat = response.coord.lat;

                console.log(lon, lat);


                // get information for UV index
                const URLUV = "http://api.openweathermap.org/data/2.5/uvi?appid=" + key + "&lat=" + lat + "&lon=" + lon;

                $.ajax({
                        url: URLUV,
                        method: "GET"
                    })
                    .then(function (responseUV) {
                        let uvIndex = $("#uvIndex");
                        uvIndex.text("UV Index: " + responseUV.value);

                        console.log(responseUV);
                    })





                console.log(response);
            });



    })

})