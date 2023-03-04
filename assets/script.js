var formEl = document.querySelector('#form');
var cityHistory = document.querySelector('#cityHistory');
var city = document.querySelector('#query')
var apiKey = '507cd1329619c9a780d221184056c3ba';

var getCity = function (user) {
    var apiUrl = 'api.openweathermap.org/data/2.5/forecast?q='+ city +'&appid=' + apiKey;
    console.log('working?')
    
  
    fetch(apiUrl)
      .then(function (response) {
        if (response.ok) {
          console.log(response);
          response.json().then(function (data) {
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
  
  formEl.addEventListener('click', getCity);
  
  
  