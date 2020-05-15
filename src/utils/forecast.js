const request = require('request')

const forecast = (latitude, longtitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=92f15000ba224bfa6078285e7320615e&query='+ latitude + ',' + longtitude +'&units=m'
    
    request ({url, json: true}, (error, {body}={})=>{
        if(error){
            callback('Unable to connect')
        }else if(body.error){
            callback(body.error.info)
        }else{
            callback(undefined,  {
                location: body.location.name,
                temperature: body.current.temperature,
                feelsLike: body.current.feelslike
                
            })
        }
    })

}

module.exports = forecast
