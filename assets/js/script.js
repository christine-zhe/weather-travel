// GIVEN a weather dashboard with form inputs
// WHEN I search for a city

function searchCity(){
  // console.log(document.querySelector("#citySearch").value)
  // console.log(city)
  // const settings = {
  //   "async": true,
  //   "crossDomain": true,
  //   "url": "https://api.openweathermap.org/data/2.5/weather?q=" + document.querySelector("#citySearch").value +"&appid=5d8a972b9aa6341eaa73ce2f2fcf070e",
  //   "method": "GET",
  //   "headers": {}
  // };
  
  // $.ajax(settings).done(function (response) {
  //     console.log(response);
  //   saveCity(city);
  // });
  let city = $('#citySearch').val();

  fetch("https://api.openweathermap.org/data/2.5/weather?q=" + document.querySelector("#citySearch").value +"&appid=5d8a972b9aa6341eaa73ce2f2fcf070e&units=imperial", {
  "method": "GET",
  "headers": {}
})
.then((response) => 
response.json())

.then(response => {
  console.log(response);
  setCity(city)
  previousCities();
  cityMainInfo(response);
})
.catch(err => {
  console.error(err);
});

}
// THEN I am presented with current and future conditions for that city and that city is added to the search history
var setCity = (city) => {

      localStorage.setItem("City" + localStorage.length, city);

}


var previousCities = () => {
      var lastCity = "";
      var currentCity = "";
     
      let lastCityKey="City"+(localStorage.length-1);

      lastCity=localStorage.getItem(lastCityKey);
      console.log(lastCity);

      $('#search-city').attr("value", lastCity);

      for (let i = 0; i < localStorage.length; i++) {

          $("#city-results").addClass("btn btn-secondary col-12 p-1 m-1");
      }


  }
  

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
var cityMainInfo = (response) => {
  let city = $('#citySearch').val();
  $("#cityForecast").text(city);

  var temperature = response.main.temp;
  // var weatherList = document.createElement("li");
  // weatherList.innerHTML = temperature;

  $("#temperature").text(temperature);
  console.log(temperature)

}

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe

// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity


// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city