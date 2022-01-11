const request = require('request')

const getWeather = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=8f04aa72f93f4178046397ef2fabb01f&query='
        + latitude + ',' + longitude

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Unable to connect to the weather service.', undefined)
        } else if (body.error) {
                callback(`Requisition error: ${body.error.info}`, undefined)
        } else {
            const current = body.current
            callback(undefined, {forecastData: 'The currently weather is ' +
                current.weather_descriptions[0] +
                '. The temperature is ' +
                current.temperature +
                ' and it feels like ' +
                current.feelslike +
                '.' +
                ' The current humidity is ' +
                current.humidity + 
                '.',
                weatherIconUrl: current.weather_icons}) 
        } 
    })
}

module.exports = getWeather