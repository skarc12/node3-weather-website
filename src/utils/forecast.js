const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=92f15000ba224bfa6078285e7320615e&query='+ latitude + ',' + longtitude +'&units=m'
    
    request ({url, json: true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect')
        }else if(body.error){
            callback(body.error.info)
        }else{
            callback(undefined, 'Weather is ' + body.current.weather_descriptions[0] + '. It is ' + body.current.temperature + ' there and feels like ' + body.current.feelslike)
        }
    })

}

module.exports = forecast
