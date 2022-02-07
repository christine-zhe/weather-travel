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
  var city = $('#citySearch').val();

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
// WHEN I click on a city in the search history
// THEN I am again presented with current and future conditions for that city

function previousCities()  {

      for (let i = 0; i < localStorage.length; i++) {
        let previousOnes = localStorage.getItem("City" + i)
       
               var allCities = $("<button type='button' class='btn btn-secondary col-12 p-1 m-1' id ='city-results'>"+previousOnes+"</button>");
            $("#list").append(allCities);


      }
  }
  

// WHEN I view current weather conditions for that city
// THEN I am presented with the city name, the date, an icon representation of weather conditions, the temperature, the humidity, the wind speed, and the UV index
var cityMainInfo = (response) => {
  let city = $('#citySearch').val();
  $("#cityForecast").text(city);

  var temperature = response.main.temp;
  var windSpeed = response.wind.speed;
  var humidity = response.main.humidity;


  $("#temperature").text( temperature + " F");
  $("#humidity").text(humidity + "%");
  $("#wind").text(windSpeed + " mph");
  

  var latitude = response.coord.lat;
  var longitude =response.coord.lon;
  var url = "http://api.openweathermap.org/data/2.5/onecall?lat=" +latitude + "&lon=" +longitude +"&appid=5d8a972b9aa6341eaa73ce2f2fcf070e&units=imperial";

  fetch(url)
  .then((response) => 
response.json())

  .then(async (response) => {
    console.log(response);
 

// WHEN I view the UV index
// THEN I am presented with a color that indicates whether the conditions are favorable, moderate, or severe
//Green is favorable
//Yellow is moderate
//Red is severe
  let uvResponse = response.current.uvi
  console.log(uvResponse)
  $("#uvi").text("UV Index:" + uvResponse);

  if (uvResponse >= 0 && uvResponse <= 3) {
      $("#uvi").css("background-color","green");
  } else if (uvResponse > 3 && uvResponse <= 8) {
      $("#uvi").attr("background-color", "yellow");
  } else if (uvResponse > 8) {
      $("#uvi").attr("background-color", "red");
  }

  var icon = ("https://openweathermap.org/img/w/" + response.current.weather[0].icon + ".png")
  $("#icon").attr("src", icon);
  
  var eachDay = (`<div class="flex-wrap">`);
  

  for (let i = 1; i < 6; i++) {
    
    var days = response.daily[i];
    var weekday = new Date(days.dt * 1000).toLocaleDateString("en", { weekday: "long" });
    var date = new Date(days.dt * 1000).toLocaleString().split(',')[0];
    var iconURL = ("https://openweathermap.org/img/w/" + days.weather[0].icon + ".png");
    eachDay += (`
    <div class="col">
    <ul class="card list-unstyled">
        <li>${weekday}</li>
        <li>${date}</li>
        <li><img src="${iconURL}"></li>
        <li>Temperature of the Day: ${days.temp.day} F</li>
        <li>Wind: ${days.wind_speed} mph</li>
        <li>Humidity: ${days.humidity}%</li>
    </ul>
    </div>`)
                    }
                    $("#futureForecast").html(eachDay) 
})


}


// WHEN I view future weather conditions for that city
// THEN I am presented with a 5-day forecast that displays the date, an icon representation of weather conditions, the temperature, the wind speed, and the humidity

$("#list").on("click", (event) => {
  event.preventDefault()
  $("#citySearch").val(event.target.textContent)
  searchCity(event)
})

