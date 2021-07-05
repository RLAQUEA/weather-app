var cities;

//#search-button takes value from #search-input and passes it as var citySearch to weatherData()
$("#search-button").on("click", function () {
    var citySearch = $("#search-input").val();
    weatherData(citySearch);
});

//will add to list of prior searches
function addCity(text) {
    var li = $("<button>").text(text);
    $(".cities").append(li);
}

//this will look for the weather data for the city searched
function weatherData(citySearch) {
    var APIKEY = "49eb16dfa1cec272cd9a1afb144b9378"
    $.ajax({
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + APIKEY + "&units=imperial",
        method: "GET", //get is used to retrieve the data object needed
        //"allWeather" is data returned from weather api
    })
    .then(function (allWeather) {
        if (cities.indexOf(citySearch) === -1) {
            cities.push(citySearch);//push each search to localstorage "cities" array
            window.localStorage.setItem("cities", JSON.stringify(cities));
            //this will add a search history row by search input
            addCity(citySearch);
        };

        var title = $("<h3>").text(allWeather.name + " (" + new Date().toLocaleDateString() + ")");
        var wind = $("<p>").addClass("card-text").text(allWeather.wind.speed + " MPH");
        var humid = $("<p>").addClass("card-text").text(allWeather.main.humidity + "% Humidity");
        var temp = $("<p>").addClass("card-text").text("Temp" + allWeather.main.temp + " °F");//grabbed farenheit  with imperial units
        var cardBody = $("<div>").addClass("card-body");
        // append and add to page
        cardBody.append(title, temp, humid, wind);
        $("#weather-today").append(cardBody);
    });

    $.ajax({
        url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + allWeather.coord.lat + "&lon=" + allWeather.coord.lon + "exclude=hourly&appid=" + APIKEY, 
        method: "GET", //get is used to retrieve the data object needed
        //"allWeather" is data returned from weather api
    })
    .then(function (allWeather2) {
        console.log(allWeather.coord.lat);
        console.log(allWeather2);
    });
}

function displayCities() {
// on page load get history from local storage, if nothing, leave as empty array
cities = JSON.parse(window.localStorage.getItem("cities")) || [];

//have page disaply latest history search, if any
if (cities.length > 0) {
    weatherData(cities[cities.length - 1]);
}
//create rows based on each searched city in history array
for (var i = 0; i < cities.length; i++) {
    addCity(cities[i]);
}
}
displayCities();