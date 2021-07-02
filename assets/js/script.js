var apiKey = "49eb16dfa1cec272cd9a1afb144b9378"


var searchBtn = document.querySelector("#search-button")


//target form for search input
    function searchInput () {
        var searchInput = document.querySelector("#search-input").value;
        console.log(searchInput);
    }


// search for the current weather using api

function getWeatherNow(searchInput) {
    var queryUrl = "api.openweathermap.org/data/2.5/weather?q=" + searchInput + "$appid=" + apiKey; 
}

// var weatherDashUrl = "https://api.openweathermap.org/data/2.5/onecall?lat=33.44&lon=94.04&exclude=part&appid=49eb16dfa1cec272cd9a1afb144b9378"



fetch(weatherDashUrl)
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        console.log(data);
    });


//use onecall and current weather data 