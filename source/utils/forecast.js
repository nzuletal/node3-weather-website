const request = require("request")


const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=eaea4e1770b722104f9d6070acd77c78&query=" + latitude + "," + longitude + "&units=f" // // si quiero cambiar algo (por ejemplo como pasar de Celsius a Farenheit) se debe hacer desde el url poniendo un "&"" y siguiendo la documentación de la pagina que se está sacando la api para ver como se define en el ejemplo de abajo se ve como "units"

    request({url, json: true}, (error, {body}) => { //Aca hice lo del shortcut con url y destructing con el objeto "response"
        if (error) {
            callback("Unable to connect to weather service!", undefined)
        } else if (body.error) {
            callback("Unable to find location!", undefined)
        } else {
            const weather_descriptions = body.current.weather_descriptions
            const temperature = body.current.temperature
            const precip =  body.current.precip

            callback(undefined, weather_descriptions + ". It is currently " + temperature + " degrees out." + " There is a " + precip + "% chance of rain")
        }

    })
}

module.exports = forecast