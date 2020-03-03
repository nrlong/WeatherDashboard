// const key = "198e7cd123c38028748d31ffb347ffa7";
// let URL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=" + key;

$(".searchBtn").click(function(){
    let search = $(this).prev().val()
    const key = "198e7cd123c38028748d31ffb347ffa7";

    const URL = "https://api.openweathermap.org/data/2.5/forecast?q=" + search + "&appid=" + key;

    $.ajax({
        url: URL,
        method: "GET"
    })
    .then(function(response){
        let cityLoc = $("#city");
        cityLoc.text(response.city.name);
        let temp = $("#temperature");
        let tempConvert = (((response.list[0].main.temp - 273.15)  * (9/5)) + 32);

        temp.text(tempConvert.toFixed(1) + "°F");


    
        console.log(response);
    });

})

