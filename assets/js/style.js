let currentWeather = document.getElementById('current-weather');
let forecastHeading = document.getElementById('forecast-heading');
let weatherForecast = document.getElementById('weather-forecast');
let historyContainer = document.getElementById('history-container');
let historyList = document.getElementById('search-history-list');


const searchBtn = document.getElementById('search-button');
const clearBtn = document.getElementById('clear-button');

window.onload = function() {
    currentWeather.style.display = 'none';
    forecastHeading.style.display = 'none';
    weatherForecast.style.display = 'none';
}


searchBtn.addEventListener('click', searchCity);


function searchCity() {
    let citySearch = document.getElementById('city-search').value;
    generateResults(citySearch);
}

function generateResults(citySearch) {
    let apiKey = "7e4c79b601721f061335dfefeb6654a7";
    let searchURL = `https://api.openweathermap.org/data/2.5/weather?q=${citySearch}&units=metric&appid=${apiKey}`;
    fetch(searchURL)
    .then(firstResponse => firstResponse.json())
    .then(firstData => {
        let lon = firstData.coord.lon;
        let lat = firstData.coord.lat;
        let retrievedCityName = firstData.name;
        let weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&units=metric&exclude=minutely,hourly&appid=${apiKey}`
        fetch(weatherURL)
        .then(secondResponse => secondResponse.json())
        .then(secondData => {
            // current weather
            let retrievedIcon = secondData.current.weather[0].icon; // for retrieving the correct icon
            let currentTemp = secondData.current.temp; // in celsius
            let currentHumidity = secondData.current.humidity; // in percentage
            let currentWind = secondData.current.wind_speed; // in meters/second
            let currentUVIndex = secondData.current.uvi;
            let cityName = document.getElementById('city-name');
            let currentIcon = document.getElementById('current-icon');
            let iconURL = `http://openweathermap.org/img/wn/${retrievedIcon}.png`;
            let currentDate = document.getElementById('current-date');
            let weatherDetails = document.getElementById('weather-details');
            
            
            cityName.textContent = retrievedCityName;
            currentIcon.setAttribute('src', iconURL);
            currentDate.textContent = moment().format('DD/MM/YYYY');
            
            weatherDetails.innerHTML = `
            Temp: ${currentTemp}°C<br/><br/>
            Humidity: ${currentHumidity}%<br/><br/>
            Wind: ${currentWind}m/s<br/><br/>
            UV Index: <span id='uv-index'>${currentUVIndex}</span>
            `;
            // change colour based on uv index
            let uvColour = document.getElementById('uv-index');
            switch (true) {
            case (currentUVIndex >= 0 && currentUVIndex < 3):
                uvColour.classList.add('low-uv');
                break;
            case (currentUVIndex >=3 && currentUVIndex < 6):
                uvColour.classList.add('moderate-uv');
                break;
            case (currentUVIndex >=6 && currentUVIndex < 8):
                uvColour.classList.add('high-uv');
                break;
            case (currentUVIndex >=8 && currentUVIndex < 11):
                uvColour.classList.add('very-high-uv');
                break;
            case (currentUVIndex >= 11):
                uvColour.classList.add('extreme-uv');
                break;
            }

            // weather forecast
            // day one
            let dayOne = document.getElementById('day-one');
            let iconOne = document.getElementById('icon-one');
            let dateOne = document.getElementById('date-one');
            let weatherOne = secondData.daily[0].weather[0].icon;
            let tempOne = secondData.daily[0].temp.max;
            let humidityOne = secondData.daily[0].humidity;
            let windOne = secondData.daily[0].wind_speed;
            let iconOneURL = `http://openweathermap.org/img/wn/${weatherOne}.png`
            dateOne.textContent = moment().add(1, 'days').format("DD/MM/YYYY");
            iconOne.setAttribute('src', iconOneURL);
            dayOne.innerHTML = `
            Temp: ${tempOne}°C<br/><br/>
            Humidity: ${humidityOne}%<br/><br/>
            Wind: ${windOne}m/s<br/><br/>
            `;

            // day two
            let dayTwo = document.getElementById('day-two');
            let iconTwo = document.getElementById('icon-two');
            let dateTwo = document.getElementById('date-two');
            let weatherTwo = secondData.daily[1].weather[0].icon;
            let tempTwo = secondData.daily[1].temp.max;
            let humidityTwo = secondData.daily[1].humidity;
            let windTwo = secondData.daily[1].wind_speed;
            let iconTwoURL = `http://openweathermap.org/img/wn/${weatherTwo}.png`;
            dateTwo.textContent = moment().add(2, 'days').format("DD/MM/YYYY");
            iconTwo.setAttribute('src', iconTwoURL);
            dayTwo.innerHTML = `
            Temp: ${tempTwo}°C<br/><br/>
            Humidity: ${humidityTwo}%<br/><br/>
            Wind: ${windTwo}m/s<br/><br/>
            `;

            // day three
            let dayThree = document.getElementById('day-three');
            let iconThree = document.getElementById('icon-three');
            let dateThree = document.getElementById('date-three');
            let weatherThree = secondData.daily[2].weather[0].icon;
            let tempThree = secondData.daily[2].temp.max;
            let humidityThree = secondData.daily[2].humidity;
            let windThree = secondData.daily[2].wind_speed;
            let iconThreeURL = `http://openweathermap.org/img/wn/${weatherThree}.png`;
            dateThree.textContent = moment().add(3, 'days').format("DD/MM/YYYY");
            iconThree.setAttribute('src', iconThreeURL);
            dayThree.innerHTML = `
            Temp: ${tempThree}°C<br/><br/>
            Humidity: ${humidityThree}%<br/><br/>
            Wind: ${windThree}m/s<br/><br/>
            `;

            // day four
            let dayFour = document.getElementById('day-four');
            let iconFour = document.getElementById('icon-four');
            let dateFour = document.getElementById('date-four')
            let weatherFour = secondData.daily[3].weather[0].icon;
            let tempFour = secondData.daily[3].temp.max;
            let humidityFour = secondData.daily[3].humidity;
            let windFour = secondData.daily[3].wind_speed;
            let iconFourURL = `http://openweathermap.org/img/wn/${weatherFour}.png`;
            dateFour.textContent = moment().add(4, 'days').format("DD/MM/YYYY");
            iconFour.setAttribute('src', iconFourURL);
            dayFour.innerHTML = `
            Temp: ${tempFour}°C<br/><br/>
            Humidity: ${humidityFour}%<br/><br/>
            Wind: ${windFour}m/s<br/><br/>
            `;

            // day five
            let dayFive = document.getElementById('day-five');
            let iconFive = document.getElementById('icon-five');
            let dateFive = document.getElementById('date-five');
            let weatherFive = secondData.daily[4].weather[0].icon;
            let tempFive = secondData.daily[4].temp.max;
            let humidityFive = secondData.daily[4].humidity;
            let windFive = secondData.daily[4].wind_speed;
            let iconFiveURL = `http://openweathermap.org/img/wn/${weatherFive}.png`;
            dateFive.textContent = moment().add(5, 'days').format("DD/MM/YYYY");
            iconFive.setAttribute('src', iconFiveURL);
            dayFive.innerHTML = `
            Temp: ${tempFive}°C<br/><br/>
            Humidity: ${humidityFive}%<br/><br/>
            Wind: ${windFive}m/s<br/><br/>
            `;
            
            currentWeather.style.display = 'block';
            forecastHeading.style.display = 'block';
            weatherForecast.style.display = 'flex';
            saveHistory(retrievedCityName);
        });
});
    const inputs = document.querySelectorAll('#city-search');
    inputs.forEach(input => {
        input.value = '';
    })
}

function saveHistory(retrievedCityName) {
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    if (searchHistory === null) {
        searchHistory = [retrievedCityName];
    } else if (searchHistory.indexOf(retrievedCityName) == -1) {
        searchHistory.push(retrievedCityName);
    }
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    showHistory();
}

function showHistory() {
    historyList.innerHTML = '';
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory'));
    if (searchHistory !== null) {
        for (let i = 0; i < searchHistory.length; i++) {
            let history = searchHistory[i];
            let li = document.createElement('li');  
            li.setAttribute("style", "list-style-type: none");
            li.classList = 'btn btn-info text-white';
            li.textContent = history;
            li.addEventListener('click', previousSearch);
            historyList.appendChild(li);
    }
}
}

function previousSearch(event) {
    let clickedItem = event.target;
    if (event.target.matches('li')) {
        let citySearch = clickedItem.textContent;
        generateResults(citySearch);
    }
}

clearBtn.addEventListener('click', function() {
    localStorage.clear();
    historyList.innerHTML = '';
})
