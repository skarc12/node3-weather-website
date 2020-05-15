const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode.js')
const forecast = require('./utils/forecast.js')

const app = express()

//Defina paths for Express config
const pathDir = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partials') 
//
//Setup hbs engine and views locations
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialPath)

//Setup static dictionary to serve
app.use(express.static(pathDir))

app.get('',(req, res) =>{
    res.render('index', {
        title: 'Weather App',
        name: 'Salome'
    })
})

app.get('/about',(req, res) =>{
    res.render('about', {
        title: 'About Weather App',
        name: 'Salome'
    })
})

app.get('/help',(req, res) =>{
    res.render('help', {
        title: 'I will help you',
        name: 'Salome'
    })
}) 


app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            err: 'Please provide address'
        })
    }
    const address = req.query.address
    geocode(address, (error, {latitude, longtitude, location} = {})=> {
        if(error) {
            return res.send({
                error: error
            })
        } 
        forecast(latitude, longtitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }

            res.send({
                address: req.query.address,
                locations: location,  
                forecastData: "Temperature is " + forecastData.temperature +  " and feels like " + forecastData.feelsLike
            })
        })
        
    })


    
})

// app.get('/address', (req, res) => {
//     if (!req.query.name) {
//         return res.send({
//             error: 'You must provide address'
//         })
//     } 

//     res.send({
//         location: ['a','b','c'].filter((addr)=>{
//             return addr === req.query.name
//         }
//         )
//     })
    
// })

app.get('/products', (req, res)=>{

    if (!req.query.search) {
        return res.send({
            error: 'You must provide search term'
        })
    } 

    res.send({
        products: []
    })
})

app.get('/help/*', (req, res)=>{
    res.render('help404', {
        title: 'Page Not Found',
        error_msg: 'Help Article not found!',
        name: 'Salome'
    })
})

app.get('*', (req, res)=>{
    res.render('404', {
        title: 'Page Not Found',
        error_msg: 'not found!',
        name: 'Salome'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})