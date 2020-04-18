const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()

const port = process.env.PORT || 3000

// Define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname,'/templates/views')
const partialsPath = path.join(__dirname, '/templates/partials')


//setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Harsh Gupta'
    })
})


app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About me',
        name: 'Harsh Gupta'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        message: 'We are here to help',
        title: 'Help',
        name: 'Harsh Gupta'
    })
})


app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must provide a location'
        })
    }

    else {
        geocode(req.query.address, (error, {latitude, longitude, location}={}) => {
            if (error) {
                return res.send({error})
            }
            
            forecast(latitude, longitude, (error, forecastData) => {
                if (error){
                    return res.send({error})
                }

                res.send({
                    forecast: forecastData,
                    location,
                    address: req.query.address
                })

                // res.render('index', {
                //     address: req.query.address,
                //     location,
                //     forecast: forecastData,
                //     title: 'Weather App',
                //     name: 'Harsh Gupta'
                // })        
            })
        })
    }
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }

    console.log(req.query.search)
    res.send({
        products: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMessage: 'Help article not found',
        name: 'Harsh Gupta'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404 Page',
        errorMessage: 'Page not found',
        name: 'Harsh Gupta'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port)
})

