// Select elements from the DOM
const searchBtn = document.getElementById("searchBtn");
const locationInput = document.getElementById("locationInput");
const cityName = document.getElementById("cityName");
const temperature = document.getElementById("temperature");
const description = document.getElementById("description");
const humidity = document.getElementById("humidity");
const windSpeed = document.getElementById("windSpeed");

// OpenWeatherMap API Key and URL
const apiKey = "0470873e07cddef2f1b767823ce2101e"; // Replace with your OpenWeatherMap API key
const apiUrl = "https://api.openweathermap.org/data/2.5/weather";

// Event Listener for the Search Button
searchBtn.addEventListener("click", () => {
    const city = locationInput.value.trim();

    if (city) {
        getWeatherData(city);
    } else {
        alert("Please enter a city name!");
    }
});

// Function to Fetch Weather Data
function getWeatherData(city) {
    const url = `${apiUrl}?q=${city}&appid=${apiKey}&units=metric`;

    fetch(url)
        .then(response => {
            if (!response.ok) {
                throw new Error("City not found");
            }
            return response.json();
        })
        .then(data => {
            updateWeatherUI(data);
        })
        .catch(error => {
            alert("Error: " + error.message);
        });
}

// Function to Update Weather UI
function updateWeatherUI(data) {
    cityName.textContent = `Weather in ${data.name}, ${data.sys.country}`;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Description: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    windSpeed.textContent = `Wind Speed: ${data.wind.speed} m/s`;
}
