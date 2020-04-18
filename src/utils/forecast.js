const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=99f0f95b208b68abd686a56a21304a81&query='+latitude+','+longitude
    
    request({url, json: true}, (error, { body }) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } 
        
        else if (body.error) {
            callback('Unable to find location. Try another search', undefined)
        }    
        
        else {
            const curr = body.current
            // callback(undefined, {
            //     description: curr.weather_descriptions,
            //     temperature: curr.temperature,
            //     feelsLike: curr.feelslike
            // })
            callback(undefined, curr.weather_descriptions+' throughout the day. It is currently '+curr.temperature+' degrees out. And it feels like '+curr.feelslike+' degrees. And the humidity is '+curr.humidity+'%.')
        }
    })
}

module.exports = forecast