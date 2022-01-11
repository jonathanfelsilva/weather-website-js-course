const request = require('request')

const geocode = (location, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' +
        encodeURIComponent(location)
        + '.json?access_token=pk.eyJ1Ijoiam9uYXRoYW5mZWxzaWx2YSIsImEiOiJja3kwZzQ0d2EwMHMxMndvMnQyc3ZqNjhwIn0.avM0uCGMnqPbfJXRKC_MxQ&limit=1'

    request({ url, json: true }, (error, { body } = {}) => {

        if (error) {
            callback('Unable to connect to the weather service.', undefined)
        } else if (body.message) {
            callback(`Error: ${body.message}`, undefined)
        } else if (body.features !== undefined && body.features.length === 0) {
            callback('Error: place not found.', undefined)
        } else {
            let latitude = body.features[0].center[1]
            let longitude = body.features[0].center[0]
            let placeName = body.features[0].place_name

            callback(undefined, {
                latitude,
                longitude,
                placeName,
            })
        }
    })
}

module.exports = geocode