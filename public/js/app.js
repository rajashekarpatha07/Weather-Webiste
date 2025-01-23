// public/js/app.js

console.log("Client Side JavaScript");

const weatherForm = document.getElementById('weatherForm');
const addressInput = document.getElementById('addressInput');
const weatherInfo = document.getElementById('weatherInfo');

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const address = addressInput.value;

    fetch(`/weather?address=${address}`).then((response) => {
        if (!response.ok) {
            throw new Error('Unable to fetch weather data');
        }
        return response.json();
    })
    .then((data) => {
        console.log(data); // Log the data returned from the server
        
        if (data.error) {
            weatherInfo.innerHTML = `<p style="color: red;">Error: ${data.error}</p>`;
        } else {
            weatherInfo.innerHTML = `
                <h2>Weather in ${data.location}</h2>
                <p><strong>Temperature:</strong> ${data.forecast.temp}°C</p>
                <p><strong>Feels Like:</strong> ${data.forecast.feelslike}°C</p>
                <p><strong>Conditions:</strong> ${data.forecast.description}</p>
            `;
        }
    })
    .catch((error) => {
        console.error('Error:', error); // Catch and log any errors
        weatherInfo.innerHTML = `<p style="color: red;">Error: ${error.message}</p>`;
    });
});
