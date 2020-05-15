const request = require('request')

const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/' + encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoiY2FsZWIxMjMiLCJhIjoiY2s5eWdlYzA0MDRvMzNlczJ2cnNnbHcwbCJ9.5CzyBqhJPpS7jPAQQuDrzQ&limit=1'
    request({url, json: true}, (error, {body} = {})=>{
        if(error){
            callback('Unable to connect!')
        } else if (body.features.length === 0) {
            callback('Unable to find location.')

        } else {
            callback(undefined, {
                latitude: body.features[0].geometry.coordinates[1],
                longtitude: body.features[0].geometry.coordinates[0],
                location: body.features[0].place_name
            })
        }
    })
}

module.exports = geocode