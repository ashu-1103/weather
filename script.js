const apiKey = "a0d017e8f0830136dddc79bd93e1fd44";

document.getElementById("search-button").addEventListener("click", async () => {
    const city = document.getElementById("city-input").value.trim();
    if (!city) {
        alert("Please enter a city name!");
        return;
    }

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.cod !== 200) {
            alert(`Error: ${data.message}`);
            return;
        }

        displayWeather(data);
    } catch (error) {
        console.error("Error fetching data:", error);
        alert("Something went wrong. Please try again later.");
    }
});

function displayWeather(data) {
    const weatherResult = document.getElementById("weather-result");
    const cityName = document.getElementById("city-name");
    const weatherIcon = document.getElementById("weather-icon");
    const temperature = document.getElementById("temperature");
    const description = document.getElementById("description");
    const humidity = document.getElementById("humidity");
    const wind = document.getElementById("wind");

    cityName.textContent = data.name;
    temperature.textContent = `Temperature: ${data.main.temp}°C`;
    description.textContent = `Weather: ${data.weather[0].description}`;
    humidity.textContent = `Humidity: ${data.main.humidity}%`;
    wind.textContent = `Wind Speed: ${data.wind.speed} m/s`;

    const weatherCondition = data.weather[0].main.toLowerCase();

    // Select the appropriate weather image
    if (weatherCondition.includes("cloud")) {
        weatherIcon.src = "assets/cloudy.jpg";
    } else if (weatherCondition.includes("rain")) {
        weatherIcon.src = "assets/rainy.jpg";
    } else if (weatherCondition.includes("snow")) {
        weatherIcon.src = "assets/snowy.jpg";
    } else {
        weatherIcon.src = "assets/sunny.jpg";
    }

    weatherResult.classList.remove("hidden");
}
