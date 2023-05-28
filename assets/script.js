var formEl = document.querySelector('#searchBtn');
var cityHistory = JSON.parse(localStorage.getItem('city')) ?? [];
var city = document.querySelector('#query');
var searchResult = document.querySelector('#searchResult');
var searchContainerEl = document.querySelector('#searchContainer');
var cityNameEl = document.querySelector('#cityName');
var tempDay1El = document.querySelector('#temp1');
var windEl = document.querySelector('#wind1');
var humidEl = document.querySelector('#humid');
var currentDay = dayjs().format('M/D/YYYY');
const currentDayEl = document.querySelector('#currentDayEl');
var forecastContainer = document.querySelector('#forecastContainer');
const cityHistoryResult = document.querySelector('#search-history');

var apiKey = '507cd1329619c9a780d221184056c3ba';

var getCity = function() {
  var apiUrl =
    'https://api.openweathermap.org/data/2.5/forecast?q=' +
    city.value +
    '&appid=' +
    apiKey +
    '&units=imperial';
  fetch(apiUrl)
    .then(function(response) {
      if (response.ok) {
        response.json().then(function(data) {
          displayWeather(data);
        });
      } else {
        alert('Error: ' + response.statusText);
      }
    })
    .catch(function(error) {
      alert('Unable to connect to Weather API');
    });
};

function addCityHistory(recentCity) {
  if (!cityHistory.includes(recentCity)) {
    cityHistory.push(recentCity);
    localStorage.setItem('city', JSON.stringify(cityHistory));
    displayHistory();
  }
}

function displayHistory() {
  cityHisoryResult.innerHTML = '';
  for (let i = 0; i < cityHistory.length; i++) {
    let historyBtn = document.createElement('button');
    historyBtn.classList.add('btn', 'history-btn');
    historyBtn.textContent = cityHistory[i];
    cityHisoryResult.appendChild(historyBtn);
    historyBtn.addEventListener('click', event => getWeather(cityHistory[i]));
  }
}

var displayWeather = function(results) {
  var cityData = results.city;
  var forecastList = results.list;
  var firstForecast = forecastList[0];

  console.log('city');
  console.log(cityData);

  console.log('forecast');
  console.log(forecastList);

  console.log('first forecast');
  console.log(firstForecast);

  let weatherIcon = firstForecast.weather[0].icon;
  var iconurl = 'http://openweathermap.org/img/w/' + weatherIcon + '.png';
  $('#wicon').attr('src', iconurl);
  document.getElementById('icon').style.display = 'flex';

  cityNameEl.textContent = cityData.name;
  let temperature = firstForecast.main.temp;
  tempDay1El.textContent = 'Temp: ' + temperature + ' °F';
  let wind = firstForecast.wind.speed;
  windEl.textContent = 'Wind: ' + wind + ' MPH';
  let humid = firstForecast.main.humidity;
  humidEl.textContent = 'Humidity: ' + humid + '%';

  // 5 day forecast
  forecastContainer.innerHTML = '';

  var forecastElementsContainer = document.createElement('div');
  forecastElementsContainer.classList.add('forecast-elements-container');

  for (var i = 0; i < forecastList.length; i += 8) {
    var forecastDay = forecastList[i];
    var date = forecastDay.dt_txt.split(' ')[0];

    if (date !== dayjs().format('YYYY-MM-DD')) {
      var forecastElement = document.createElement('div');
      forecastElement.classList.add('forecast-day');

      var dateElement = document.createElement('h4');
      dateElement.textContent = dayjs(date).format('M/D/YYYY');

      var temperatureElement = document.createElement('p');
      temperatureElement.textContent = 'Temp: ' + forecastDay.main.temp + ' °F';

      var weatherIconElement = document.createElement('img');
      weatherIconElement.src =
        'http://openweathermap.org/img/w/' + forecastDay.weather[0].icon + '.png';

      forecastElement.appendChild(dateElement);
      forecastElement.appendChild(temperatureElement);
      forecastElement.appendChild(weatherIconElement);

      forecastElementsContainer.appendChild(forecastElement);
    }
  }

  forecastContainer.appendChild(forecastElementsContainer);
};

formEl.addEventListener('click', getCity);
