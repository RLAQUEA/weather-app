var cities;
var lat = "";
var lon = "";

$("#search-button").on("click", function () {//#search-button takes value from #search-input and passes it as var citySearch to weatherData()
    var citySearch = $("#search-input").val();
    weatherData(citySearch);
});

function addCity(text) {//will add to list of prior searches
    var li = $("<button>").text(text);
    $(".cities").append(li);
}

function weatherData(citySearch) {//this will look for the weather data for the city searched
    var APIKEY = "49eb16dfa1cec272cd9a1afb144b9378"
    var titleData = "";
    var windData = "";
    var humidData = "";
    var tempData = "";

    $.ajax({// api call that retrieves weather based on searched city
        url: "http://api.openweathermap.org/data/2.5/weather?q=" + citySearch + "&appid=" + APIKEY + "&units=imperial",
        method: "GET", //get is used to retrieve the data object needed
    })
        .then(function (allWeather) {//"allWeather" is data returned from weather api
            if (cities.indexOf(citySearch) === -1) {
                cities.push(citySearch);//push each search to localstorage "cities" array
                window.localStorage.setItem("cities", JSON.stringify(cities));//this will add a search history row by search input
                addCity(citySearch);
            };

            // stores weather aspects that are retrieved from api  
            var title = $("<h3>").text(allWeather.name + " (" + new Date().toLocaleDateString() + ")");
            var wind = $("<p>").addClass("card-text").text(allWeather.wind.speed + " MPH");
            var humid = $("<p>").addClass("card-text").text(allWeather.main.humidity + "% Humidity");
            var temp = $("<p>").addClass("card-text").text("Temp" + allWeather.main.temp + " °F");//grabbed farenheit  with imperial units
            var cardBody = $("<div>").addClass("card-body");

            titleData = $(title).text();
            windData = $(wind).text();
            humidData = $(humid).text();
            tempData = $(temp).text();
            lat = allWeather.coord.lat;
            lon = allWeather.coord.lon;
            console.log(lat);
            console.log(lon);
            // appends and adds aspects to page
            cardBody.append(title, temp, humid, wind);
            $("#weather-today").append(cardBody);

        });
}

function getCoord(lat, lon) {
$.ajax({// api call using ajax that retrieves latitude & longitude
url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "exclude=hourly&appid=" + APIKEY, 
method: "GET" //get is used to retrieve the data object needed
}).then(function (coordData) {
})
}
function displayCities() {
    // on page load get history from local storage, if nothing, leave as empty array
    cities = JSON.parse(window.localStorage.getItem("cities")) || [];

    //this directs page to display searches if they exist 
    if (cities.length > 0) {
        weatherData(cities[cities.length - 1]);
    }
    //create rows based on each searched city in cities array
    for (var i = 0; i < cities.length; i++) {
        addCity(cities[i]);
    }
}
displayCities();