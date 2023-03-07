var formEl = document.querySelector('#searchBtn');
var cityHistory = document.querySelector('#cityHistory');
var city = document.querySelector('#query');
var searchResult = document.querySelector('#searchResult');
var searchContainerEl = document.querySelector('#searchContainer');
var cityNameEl = document.querySelector('#cityName');
var tempDay1El = document.querySelector("#temp1");
var windEl = document.querySelector('#wind1');
var humidEl = document.querySelector('#humid');
var currentDay = dayjs().format('M/D/YYYY');
var forecastContainer = document.querySelector('#forecastContainer');

var apiKey = '507cd1329619c9a780d221184056c3ba';

var getCity = function () {
    var apiUrl = 'https://api.openweathermap.org/data/2.5/forecast?q='+city.value+'&appid='+apiKey+'&units=imperial';
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {          
          response.json().then(function (data) {
            // console.log(data);
            displayWeather(data);   
                     
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
    var cityData = results.city;
    var forecastList = results.list;
    var firstForcast = forecastList[0];
    
    console.log('city');
    console.log(cityData);

    console.log('forcast')
    console.log(forecastList)

    console.log('firstforecast')
    console.log(firstForcast)


    

    let weatherIcon = firstForcast.weather.icon;

    cityNameEl.textContent = cityData.name + currentDay + weatherIcon;
    let temperature = firstForcast.main.temp;
    tempDay1El.textContent = "Temp: "+temperature+ ' °F';
    let wind = firstForcast.wind.speed;
    windEl.textContent = 'Wind: '+wind+' MPH';
    let humid = firstForcast.main.humidity;
    humidEl.textContent = 'Humidity: '+humid+'%';
    
//5 day forecast
for (var i = 0; i < forecastList.length; i+= 8) { //try to figure out how to increment by 8 instead of 1
  var date = forecastList[i].dt_txt.split(" ")[0];
  console.log(date);
  //if the date changed, create a new element for our 5 day forecast
} if (date != dayjs().format('D')) {
  const forcastContainer = document.createElement('div');
  let weatherIcon = firstForcast.weather.icon;

    cityNameEl.textContent = cityData.name + currentDay + weatherIcon;
    let temperature = firstForcast.main.temp;
    tempDay1El.textContent = "Temp: "+temperature+ ' °F';
    let wind = firstForcast.wind.speed;
    windEl.textContent = 'Wind: '+wind+' MPH';
    let humid = firstForcast.main.humidity;
    humidEl.textContent = 'Humidity: '+humid+'%';
  formEl.appendChild(forecastContainer);
};


    var text = city.value;
    var oldSearchItem = $('<li>').text(text);
    
    // formEl.appendChild(oldSearchItem);  
    formEl.appendChild(searchResult);


  
    searchContainerEl.appendChild();

// $.get('https://api.openweathermap.org/data/2.5/forecast?q='+city.value+'&appid='+apiKey+'units=imperial'; 
    
//    function(data) {
//         // Loop through the weather data for the next 5 days
//         for (var i = 0; i < 5; i++) {
//           // Get the date and time for the forecast
//           var forecastDate = new Date(data.list[i].dt_txt);
//           // Create a new <div> element to hold the forecast for this day
//           var forecastDiv = $('<div>');
//           // Set the text for the forecast <div>
//           forecastDiv.text('Date: ' + forecastDate.toDateString() + ', Temperature: ' + data.list[i].main.temp + ' °C');
//           // Add the forecast <div> to the forecast container
//           $('#forecast').append(forecastDiv);
//         }
//       });
    
  };


  
  formEl.addEventListener('click', getCity);
  
  
  