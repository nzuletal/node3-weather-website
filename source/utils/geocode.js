const request = require("request")

const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(address) + ".json?access_token=pk.eyJ1Ijoibmljb2xhc3p1bGV0YSIsImEiOiJjbDVsOHFmeHIwZXBjM2tweGI4MXRsMWNsIn0.2okzof6RPZIGLZ2hmJZgbg&limit=1"
    
    request({url, json: true}, (error, {body}) => { //Aca hice lo del shortcut con url y destructing con el objeto "response"
        if (error) {
           callback("Unable to connect to location service!", undefined)
        } else if (body.features.length === 0) {
            callback("Unable to find location, try another search", undefined)
        } else {
            const data= {
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1],
                location: body.features[0].place_name
            }
            callback(undefined, data)
        }
    })
}

module.exports = geocode