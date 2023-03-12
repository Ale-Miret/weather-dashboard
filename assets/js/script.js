
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


  