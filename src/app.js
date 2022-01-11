const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const weather = require('./utils/weather.js')

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

// Setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to save
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        authorName: 'Jonathan'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        authorName: 'Jonathan'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'Just imagine there is a Help message here. A very good one.',
        authorName: 'Jonathan'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: "You must inform an adress."
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, placeName} = {}) => {
    
        if (error) {
            return res.send({
                error
            })
        }
    
        weather(latitude, longitude, (error, weatherData) => {
            if (error) {
                return res.send({
                    error
                })
            }
    
            res.send({
                addressProvided: req.query.address,
                addressReturned: placeName,
                date: new Date(),
                forecast: weatherData.forecastData,
                iconUrl: weatherData.weatherIconUrl
            })
        })
    })
    

})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term.'
        })
    }
    
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('notFound', {
        title: '404 Error',
        errorMessage: 'Article not found.',
        authorName: 'Jonathan'
    })
})

app.get('*', (req, res) => {
    res.render('notFound', {
        title: '404 Error',
        errorMessage: 'Page not found.',
        authorName: 'Jonathan'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})