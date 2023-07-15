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

    function updateCurrentConditions(){

    }

    function updateForecast() {

    }

    function addToSearchHistory (city) {
        var prevCityEl = document.createElement('li');
        prevCityEl.textContent = city;

        searchHistory.appendChild(prevCityEl);
    }