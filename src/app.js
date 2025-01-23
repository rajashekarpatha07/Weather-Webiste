const express = require('express')
const path = require('path')
const hbs = require('hbs')
const request = require('request')
const forecast = require('./Utils/Forecast')
const geocode = require('./Utils/Geocode')

const app = express()
const port = 3000

//Defining paths to express config
const PublicDirPath = path.join(__dirname, '../public')
const viewPath = path.join(__dirname, './templates/views')
const PartialPath = path.join(__dirname,'./templates/partials')

//Settingup view engine with paths
app.set('view engine', 'hbs');
app.set('views', viewPath) ;
hbs.registerPartials(PartialPath)


//Serving static files
app.use(express.static(PublicDirPath))

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Raja Shekar'
  })
  
})

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About me',
    name: 'raja shekar'
  })
})

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'help page',
    name: 'Raja shekar'
  })
})

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address'
    });
  }

  geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
    if (error) {
      return res.send({
        error
      });
    }

    forecast(latitude, longitude, (error, forecastData) => {
      if (error) {
        return res.send({
          error
        });
      }

      // Send JSON response with forecast data
      res.send({
        forecast: forecastData,
        location,
        address: req.query.address
      });
    });
  });
});


app.get('/product', (req, res) => {
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
    title: '404',
    errorMessage: 'Help article not found'
  })
  res.status(404).send('Help article not found')
})

app.get('*', (req, res) => {
  res.render('404')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
