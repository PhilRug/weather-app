var formEl = document.querySelector('#searchBtn');
var cityHistory = document.querySelector('#cityHistory');
var city = document.querySelector('#query');
var searchResult = document.querySelector('#searchResult');
var searchContainerEl = document.querySelector('#searchContainer');
var cityNameEl = document.querySelector('#cityName');
var tempDay1El = document.querySelector("#temp1");
var windEl = document.querySelector('#wind1');
var humidEl = document.querySelector('#humid');

var apiKey = '507cd1329619c9a780d221184056c3ba';

var getCity = function (user) {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+city.value+'&appid='+apiKey;
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
            displayWeather(data);   
            console.log(data);         
          });
        } else {
          alert('Error: ' + response.statusText);
        }
      })
      .catch(function (error) {
        alert('Unable to connect to Weather API');
      });
  };
  
  var displayWeather = function (results) {
    // let cityName = results.list[0].city.name;
    // cityNameEl.textContent = cityName + dayjs().format('M/D/YYYY');
    let temperature = results.list[0].main.temp;
    tempDay1El.textContent = "Temp: "+temperature;
    let wind = results.list[0].wind.speed;
    windEl.textContent = 'Wind: '+wind+' MPH';
    let humid = results.list[0].main.humidity;
    humidEl.textContent = 'Humidity: '+humid+'%';

      
      formEl.appendChild(searchResult);
  
      searchContainerEl.appendChild();

$.get('https://api.openweathermap.org/data/2.5/forecast?q='+city.value+'&appid='+apiKey, {
    units: 'imperial'
  }, function(data) {
        // Loop through the weather data for the next 5 days
        for (var i = 0; i < 5; i++) {
          // Get the date and time for the forecast
          var forecastDate = new Date(data.list[i].dt_txt);
          // Create a new <div> element to hold the forecast for this day
          var forecastDiv = $('<div>');
          // Set the text for the forecast <div>
          forecastDiv.text('Date: ' + forecastDate.toDateString() + ', Temperature: ' + data.list[i].main.temp + ' °C');
          // Add the forecast <div> to the forecast container
          $('#forecast').append(forecastDiv);
        }
      });
    
  };


  
  formEl.addEventListener('click', getCity);
  
  
  