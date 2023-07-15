//allow the user to search for a city's weather forecast by using the search bar
    //use eventListener for the click of the search bar
//make sure user puts in a correct city
    //if the user spells a city wrong or doesn't type in a city, let the user know
// pull a city's weather info using the open weather api key
    //get access to the open weather api
    //use the api url
    //get api url query parameters
    //get the city that the user typed
    //use dayjs to display five day forecast begginning on current date
    //use a for loop to create a card for each day
//display a city's weather info to the web page in the correct location
    //use get element by id
    //use create element
    //use .textContent to make sure the info is a text
    //use append to display the info
//store a list of previously searched cities
    //use localStorage to setItem
    //use get element by id (under search bar)
    //create element for button
    //add event listener to the button
    //use localStorage to getItem previously displayed city information 

var searchInput = document.getElementById("city-search");
var searchButton = document.querySelector(".search");
var searchHistory = document.querySelector(".search-history");

    searchButton.addEventListener("click", function () {
        var input = searchInput.value.trim();

        if (input !== "") {
            getWeatherData(input);
        } else {
            alert("Please enter a city name");
        }
    });

    function getWeatherData(city){
        var apiKey = "2e9833e09f4a89add539473c0d6e159a";
        var apiUrl = "https://api.openweathermap.org/data/2.5/forecast?q=" + city + "&appid=" + apiKey;
    
        fetch(apiUrl)
        .then(function (response){
            if (response.ok) {
                return response.json();
            } else {
                return "Error:" + response.status;
            }
        })
        .then(function (data) {
            console.log(data);

            updateCurrentConditions(data);
            updateForecast(data);
            addToSearchHistory(city);
        });
    }

    function updateCurrentConditions(data){
        var currentConditions = document.querySelector(".current-conditions");

        currentConditions.innerHTML = "";

        //these variables set the value using the data from our api
        var city = data.city.name;
        var date = dayjs(data.list[0].dt_txt).format("M D, YYYY");
        var temperature = Math.round(((data.list[0].main.temp - 273.15) * 9) / 5 + 32);
        var humidity = data.list[0].main.humidity;
        var windSpeed = data.list[0].wind.speed;
        var iconCode = data.list[0].weather[0].icon;

        //these variables allows us to display our data as text
        var cityNameEl = document.createElement("h2");
        cityNameEl.textContent = city;

        var dateEl = document.createElement("p");
        dateEl.textContent = date;

        var tempEl = document.createElement("p");
        tempEl.textContent = "Temperature: " + temperature + "°F";

        var humidityEl = document.createElement("p");
        humidityEl.textContent = "Humidity: " + humidity + "%";

        var windSpeedEl = document.createElement("p");
        windSpeedEl.textContent = "Wind Speed: " + windSpeed + "mph";

        var iconEl = document.createElement("img");
        iconEl.src = iconCode;

        //the appendChild allows our work above to actually display
        currentConditions.appendChild(cityNameEl);
        currentConditions.appendChild(dateEl);
        currentConditions.appendChild(tempEl);
        currentConditions.appendChild(humidityEl);
        currentConditions.appendChild(windSpeedEl);
        currentConditions.appendChild(iconEl);
    }

    function updateForecast(data) {
        var forecastSection = document.querySelector(".week-forecast");

        forecastSection.innerHTML = "";

        //the for loop allows us to create a card for each forecast of the five day forecast
        for (var i = 0; i < 5; i++) {
            var forecastData = data.list[i * 8];

            var date = dayjs().add(i, "day").format("M D, YYYY");
            var temperature = Math.round(((forecastData.main.temp - 273.15) * 9) / 5 + 32);
            var humidity = forecastData.main.humidity;
            var windSpeed = forecastData.wind.speed;
            var iconCode = forecastData.weather[0].icon;

            var card = document.createElement("div");
            card.classList.add("card");

            var dateEl = document.createElement("h4");
            dateEl.textContent = date;

            var tempEl = document.createElement("p");
            tempEl.textContent = "Temperature: " + temperature + "°F";
    
            var humidityEl = document.createElement("p");
            humidityEl.textContent = "Humidity: " + humidity + "%";
    
            var windSpeedEl = document.createElement("p");
            windSpeedEl.textContent = "Wind Speed: " + windSpeed + "mph";
    
            var iconEl = document.createElement("img");
            iconEl.src = iconCode;

            card.appendChild(dateEl);
            card.appendChild(tempEl);
            card.appendChild(humidityEl);
            card.appendChild(windSpeedEl);
            card.appendChild(iconEl);

            forecastSection.appendChild(card);

        }
    }

    function addToSearchHistory (city) {
        var prevCityEl = document.createElement('li');
        prevCityEl.textContent = city;

        searchHistory.appendChild(prevCityEl);
    }