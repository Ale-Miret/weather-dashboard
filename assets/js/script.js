// var apiKey = "6c9ad037feadb844f8df6358011443e8";
// var searchBtn = $("#search-btn");
// var searchInput = $("#search-input");
// var cityList = $("#cityList");
// var currentWeather = $("#currentWeather");
// var forecastCards = $("#forecastCards");
// var currentDate = moment().format("L");

// // function to display the city list
// function displayCityList() {
//   var cities = JSON.parse(localStorage.getItem("cities")) || [];

//   cityList.empty();

//   for (var i = 0; i < cities.length; i++) {
//     var li = $("<li>").text(cities[i]);
//     li.attr("data-city", cities[i]);
//     li.addClass("list-group-item");
//     cityList.prepend(li);
//   }
// }

// // function to display the current weather for a given city
// function displayCurrentWeather(city, weather) {
//   // Get the elements where we will display the weather information
//   let cityNameEl = document.querySelector("#city-name");
//   let currentDateEl = document.querySelector("#current-date");
//   let weatherIconEl = document.querySelector("#weather-icon");
//   let temperatureEl = document.querySelector("#temperature");
//   let humidityEl = document.querySelector("#humidity");
//   let windSpeedEl = document.querySelector("#wind-speed");

//   // Set the text content of the elements to display the weather information
//   cityNameEl.textContent = city.name;
//   currentDateEl.textContent = moment().format(" (MM/DD/YYYY) ");
//   weatherIconEl.setAttribute(
//     "src",
//     `https://openweathermap.org/img/w/${weather[0].icon}.png`
//   );
//   weatherIconEl.setAttribute("alt", weather[0].description);
//   temperatureEl.textContent = `${Math.round(
//     (weather.main.temp - 273.15) * 1.8 + 32
//   )} °F`;
//   humidityEl.textContent = `${weather.main.humidity} %`;
//   windSpeedEl.textContent = `${Math.round(weather.wind.speed * 2.237)} MPH`;
// }

// // function to get the weather for a given city
// function getWeather(city) {
//   var queryURL =
//     "https://api.openweathermap.org/data/2.5/weather?q=" +
//     city +
//     "&appid=" +
//     apiKey;

//   $.ajax({
//     url: queryURL,
//     method: "GET",
//   }).then(function (response) {
//     displayCurrentWeather(response, response.weather);
//   });
// }

// // event listener for the search button
// searchBtn.on("click", function (event) {
//   event.preventDefault();
//   var city = searchInput.val().trim();
//   getWeather(city);
// });

// // function to initialize the page
// function init() {
//   displayCityList();
// }

// init();

$(document).ready(function () {

  // function to get current weather data from OpenWeather API
  function getWeather(cityName) {
    var APIKey = "6c9ad037feadb844f8df6358011443e8";
    var queryURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=" + APIKey;
  
    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      displayCurrentWeather(response);
      getForecast(response.coord.lat, response.coord.lon);
    });
  }

  // function to get 5-day forecast data from OpenWeather API
  function getForecast(lat, lon) {
    var APIKey = "6c9ad037feadb844f8df6358011443e8";
    var queryURL = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat + "&lon=" + lon + "&exclude=current,minutely,hourly&units=imperial&appid=" + APIKey;

    $.ajax({
      url: queryURL,
      method: "GET"
    }).then(function (response) {
      displayForecast(response.daily);
    });
  }

  // function to display current weather data
  function displayCurrentWeather(response) {
    console.log(response);
    var city = response.name;
    var date = moment().format("MM/DD/YYYY");
    var temp = response.main.temp.toFixed(1);
    var humidity = response.main.humidity;
    var windSpeed = response.wind.speed.toFixed(1);
    var iconCode = response.weather[0].icon;
    var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";

    $("#city-date").text(city + " (" + date + ")").append("<img src='" + iconURL + "'>");
    $("#temp").text(temp + " °F");
    $("#humidity").text(humidity + " %");
    $("#wind-speed").text(windSpeed + " MPH");
  }

  // function to display 5-day forecast data
  function displayForecast(daily) {
    console.log(daily);
    for (var i = 1; i <= 5; i++) {
      var date = moment.unix(daily[i].dt).format("MM/DD/YYYY");
      var temp = daily[i].temp.day.toFixed(1);
      var humidity = daily[i].humidity;
      var iconCode = daily[i].weather[0].icon;
      var iconURL = "https://openweathermap.org/img/w/" + iconCode + ".png";

      $("#forecast-date-" + i).text(date);
      $("#forecast-temp-" + i).text(temp + " °F");
      $("#forecast-humidity-" + i).text(humidity + " %");
      $("#forecast-icon-" + i).attr("src", iconURL);
    }
  }

  // event listener for form submission
  $("#search-form").on("submit", function (event) {
    event.preventDefault();
    var cityName = $("#city-input").val().trim();
    if (cityName) {
      getWeather(cityName);
    }
  });

});


  