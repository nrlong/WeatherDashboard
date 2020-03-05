$(document).ready(function () {

    const key = "198e7cd123c38028748d31ffb347ffa7";

    let historyArray = []


    // function to create history array on search
    function historyLink() {
        $("#searchHistory").empty();
        for (let i = 0; i < historyArray.length; i++) {
            let newLink = $("<button>");
            newLink.addClass("history");
            newLink.attr("data-name", historyArray[i]);
            newLink.text(historyArray[i]);
            $("#searchHistory").append(newLink);
        }
        console.log(historyArray);
    }

    // search button click and all the goodness that goes with it

    $(".searchBtn").click(function (event) {
        event.preventDefault();
        let search = $(this).prev().val()

        const URL = "https://api.openweathermap.org/data/2.5/weather?q=" + search + "&appid=" + key;

        // call for weather infomration on current forcast
        $.ajax({
                url: URL,
                method: "GET"
            })

            // generate information to populate created elements for todays weather
            .then(function (response) {
                let cityLoc = $("#city");
                cityLoc.text(response.name);

                let todayDate = moment.unix(response.dt).format("MMMM Do, YYYY");

                let today = $("#today");
                today.text(todayDate)

                console.log(todayDate);


                // convert from kelvin to °f
                let temp = $("#temperature");
                let tempConvert = (((response.main.temp - 273.15) * (9 / 5)) + 32);

                temp.text("Temperature: " + tempConvert.toFixed(1) + "°F");

                let humidity = $("#humidity");
                humidity.text("Humidity: " + response.main.humidity + "%");

                let windSpeed = $("#windSpeed");
                windSpeed.text("Wind Speed: " + response.wind.speed + " MPH");

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
                        uvIndex.text("UV Index: ")

                        let uvValue = $("<span>");
                        uvValue.text(responseUV.value);

                        //set uvIndex colors.  color scale used from https://www.epa.gov/sunsafety/uv-index-scale-0

                        if (responseUV.value < 3) {
                            uvValue.attr("class", "low");
                        } else if (responseUV.value < 6) {
                            uvValue.attr("class", "moderate");
                        } else if (responseUV.value < 8) {
                            uvValue.attr("class", "high");
                        } else if (responseUV.value < 11) {
                            uvValue.attr("class", "very-high");
                        } else {
                            uvValue.attr("class", "extreme");
                        }

                        console.log(typeof (responseUV.value));

                        uvIndex.append(uvValue);
                    })

                console.log(response);
            });

        const URL5Day = "http://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=" + key;

        // call for 5 day weather forcast
        $.ajax({
                url: URL5Day,
                method: "GET"
            })
            .then(function (response5Day) {

                for (let i = 0; i < 5; i++) {
                    let timeChange = i * 8 + 7;
                    let fiveDayDate = moment.unix(response5Day.list[timeChange].dt).format("MMMM Do, YYYY");

                    let forcastDiv = $("#forecast");

                    let fiveDayDateDiv = $("<div>").attr("class", "five-day")
                    fiveDayDateDiv.text(fiveDayDate);

                    forcastDiv.append(fiveDayDateDiv);


                    let forecast = $("<div>").attr("id", "temp-" + i);
                    forecast.text("Temperature: " + parseInt(((response5Day.list[timeChange].main.temp) - 273.15) * (9 / 5) + 32) + "°f");

                    fiveDayDateDiv.append(forecast);

                }



                console.log(response5Day);
            })


        let searchText = $("#search").val().trim();

        console.log(searchText);
        historyArray.push(searchText);

        historyLink();
    })

    //allow enter keypress to search

    $("#searchDiv").keypress(function (event) {

        if (event.keyCode === 13) {
            event.preventDefault();
            $(".searchBtn").click();
        }
    });

});