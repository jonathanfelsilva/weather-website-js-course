const request = require('request')

const getWeather = (latitude, longitude, callback) => {

    const url = 'http://api.weatherstack.com/current?access_key=8f04aa72f93f4178046397ef2fabb01f&query='
        + latitude + ',' + longitude

    request({url, json: true}, (error, { body } = {}) => {
        if (error) {
            callback('Não foi possível se conectar ao serviço de clima!', undefined)
        } else if (body.error) {
                callback(`Erro na requisição: ${body.error.info}`, undefined)
        } else {
            const current = body.current
            callback(undefined, 'The currently weather is ' +
                current.weather_descriptions[0] +
                '. The temperature is ' +
                current.temperature +
                ' and it feels like ' +
                current.feelslike +
                '.' )
        } 
    })
}

module.exports = getWeather