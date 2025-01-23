const request = require('request')
const app = require('../app')
// Use opencagedata api for getting latitude and longitude of user needed location
const geocode = (address, callback) => {
    const url = 'http://api.opencagedata.com/geocode/v1/json?q=' + encodeURIComponent(address) + '&key=280506d984644751a61a605d55424f1d';

    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to location service', undefined);
        } else if (body.results.length === 0) {
            callback('Unable to find the location', undefined);
        } else{
            const result = body.results[0];
            const data = {
                latitude: result.geometry.lat,
                longitude: result.geometry.lng,
                location: result.formatted
            };
            callback(undefined, data);
        }
    });
};

module.exports = geocode