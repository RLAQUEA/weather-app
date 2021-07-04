
var searchBtn = document.querySelector("#search-button")
//target form for search input
function searchInput() {
    var searchInput = document.querySelector("#search-input").value;
    console.log(searchInput);
}

// search for the current weather using api
function getWeatherNow(searchInput) {
    var weatherDataUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + searchInput + "$appid=" + apiKey;
    fetch(weatherDataUrl)
        .then(function (res) {
            return res.json()
        })
        .then(function (data) {
            console.log(data);
        });
}
//use onecall and current weather data 

function saveCitySearch() {
    var citySearch = JSON.parse(window.localStorage.getItem("#search-input")) || []
    var savedCities = {
        name: city,
        input: savedCities
    }
   citySearch.push(savedCities)
    window.localStorage.setItem("saved-city", JSON.stringify
    (citySearch))
    event.preventDefault();
}
   

searchBtn.addEventListener("click", searchInput)
//this will display the saved city searches on the page
    // savedCities.textContent = userInput.savedCities;
   // savedCities.appendChild(userInput);
    // savedCities.push(userScore)
    // window.localStorage.setItem("user-input", JSON.stringify
    // (savedScores))
    // 