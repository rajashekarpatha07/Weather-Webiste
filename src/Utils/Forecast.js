const request = require('request');
// Use weather stack api for weather details
const forecast = (lat, lng, callback) => {
    const url = `https://api.weatherstack.com/current?access_key=5f7550855f60c38f9d78e01bced0c47c&query=${lat},${lng}`;

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback("Unable to connect to the weather service!", undefined);
        } else if (body.error) {
            callback("Unable to find the location", undefined);
        } else {
            const temp = body.current.temperature;
            const feelslike = body.current.feelslike;
            const description = body.current.weather_descriptions[0];

            // Pass all the data in a single callback
            callback(undefined, { temp, feelslike, description });
            
        }
    });
};


module.exports = forecast