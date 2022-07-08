const searchBtn = document.getElementById('search-button');
searchBtn.addEventListener('click', searchCity);

function searchCity(event) {
    event.preventDefault();
    console.log('test');
    let cityName = document.getElementById('city-name').value;
    let apiKey = "7e4c79b601721f061335dfefeb6654a7";
    let weatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${apiKey}`;
    fetch(weatherURL)
    .then(response => response.json())
    .then(data => {
        console.log(data);
    });
}
// TODO: fetch data from api

// TODO: display modal if no result is found

// TODO: record data

// TODO: display data on cards

// TODO: save search history to local storage