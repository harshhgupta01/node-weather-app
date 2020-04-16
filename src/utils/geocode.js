const request = require('request')


const geocode = (address, callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1IjoiaGFyc2hndXB0YTMxIiwiYSI6ImNrOHZiNjlkYTBmcjczaHM3MXhiY204aG8ifQ.rzJ2q3dW4g3I_86MWELeBg&limit=1'
    request({url: url, json: true}, (error, {body}) => {
        if (error) {
            callback('Unable to connect to geocoding service!', undefined)
        } 
        
        else if (body.features.length === 0) {
            callback('Unable to find location. Try another search', undefined)
        }    
        
        else {
            const cor = body.features[0]
            callback(undefined, {
                latitude: cor.center[1],
                longitude: cor.center[0],
                location: cor.place_name
            })
        }
    })
}

module.exports = geocode