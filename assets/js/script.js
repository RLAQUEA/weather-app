//this makes sure the application doesn't run until page DOM is ready 
$(document).ready(function () {

    var cities;
    var lat = "";
    var lon = "";
    var APIKEY = "49eb16dfa1cec272cd9a1afb144b9378"

    $("#search-button").on("click", function () {//#search-button takes value from #search-input and passes it as var citySearch to weatherData()
        var citySearch = $("#search-input").val();
        weatherData(citySearch);
    });

    function addCity(text) {//will add to list of prior searches
        var li = $("<button>").text(text);
        $(".cities").append(li);
    }
    var citiesClass = $(".cities");
    
        citiesClass.on("click", getTarget);

        function getTarget(event) {
            event.preventDefault();
            var citiesBtn = event.target;
        
            weatherData(citiesBtn.innerText);
        }

    function weatherData(citySearch) {//this will look for the weather data for the city searched
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
                }
                // stores weather aspects that are retrieved from api  
                var title = $("<h3>").text(allWeather.name + " (" + new Date().toLocaleDateString() + ")");
                var wind = $("<p>").addClass("card-text").text("Wind: " + allWeather.wind.speed + " MPH");
                var humid = $("<p>").addClass("card-text").text(allWeather.main.humidity + "% Humidity");
                var temp = $("<p>").addClass("card-text").text("Temp: " + allWeather.main.temp + " °F");
                var cardBody = $("<div>").addClass("card-body");

                titleData = $(title).text();
                windData = $(wind).text();
                humidData = $(humid).text();
                tempData = $(temp).text();
                lat = allWeather.coord.lat;
                lon = allWeather.coord.lon;
        
                // appends and adds aspects to page
                cardBody.append(title, temp, humid, wind);
                $("#weather-today").text("");
                $("#weather-today").append(cardBody);
                forecast(allWeather.coord.lat, allWeather.coord.lon);
            });
    }
//this requests the uv index from the api using latitude and longitude
    function forecast(lat, lon) {
        $.ajax({
            url: "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&appid=" + APIKEY + "&units=imperial",
            method: "GET",
        })
            .then(function (response) {
                var uvi = $("<p>").addClass("card-text").text("UV Index: " + response.current.uvi + "");
                $("#forecast").text("");
                for (var i = 0; i < response.daily.length; i++) {
                    var card = $("<div>").addClass("forecast-card")
                    console.log(response.daily[i].temp.day);
                    var temp = $("<h3>").text("Temp: " + response.daily[i].temp.day);
                    var wind = $("<h3>").text("Wind: " + response.daily[i].wind_speed + "MPH");
                    var humidity = $("<h3>").text("Humidity: " + response.daily[i].humidity + "%");
                    var img = $("<img>").attr("src", "http://openweathermap.org/img/w/" + response.daily[i].weather[0].icon + ".png");
                    $(card).append(temp, wind, humidity, img);
                    $("#forecast").append(card);
                }
                $("#weather-today").append(uvi);
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
})

