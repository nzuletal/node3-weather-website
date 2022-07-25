const path = require("path")
const express = require("express")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")

const app = express()
const port = process.env.PORT || 3000 //Esto es para el servidor que si port existe utiliza heroku si no el local 3000

//Define paths for Express configuration
const public_directory_path = path.join(__dirname, "../public") //Aca es para conectar la carpeta de public
const views_path = path.join(__dirname,"../templates/views") //Aca es para conectar los .hbs de views
const partial_path = path.join(__dirname,"../templates/partials") //Aca es para conectar los .hbs de partials

//Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", views_path)
hbs.registerPartials(partial_path)

//Setup static directory to serve
app.use(express.static(public_directory_path)) //Aca mira para hacer match en el public folder


app.get("", (req, res) => {
    res.render("index", { //index es el archivo que está en .hbs
        title: "Weather",
        name: "Nico Zuleta"
    }) 
})

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About me",
        name: "Nico Zuleta"
    })
})

app.get("/help", (req,res) => {
    res.render("help", {
        title: "Help",
        help_text: "This is some helpfull text",
        name: "Nico Zuleta"
    })
})


//Esta es la que se conecta a index en /js/app.js en ese archivo
app.get("/weather", (req,res) => {
    if (!req.query.address) { //Esto es por si el usuario no pone address que pasa
        return res.send({
            error: "You must provide an address!"
        })
    }

    geocode(req.query.address, (error,{latitude, longitude, location} = {})  => { //Este = {} es por si el usuario no pone un address malo que la pagina no se dañe
        if(error) {
            return res.send({error})
        }
        forecast(latitude,longitude,(error,forecastdata) => {
            if(error) {
                return res.send({error})
            }
            return res.send({
                forecast:forecastdata,
                location: location,
                address: req.query.address,
            
            })
        })
    })

})



//Aca es para cuando el usuario ponga una direccion que no existe poniendo otro slash despues de help
app.get("/help/*", (req,res) => {
    res.render("404", {
        title: "404 Error",
        name: "Nico Zuleta",
        error_message: "Help article not found."
    })
})

//Aca es para cuando el usuario ponga una direccion que no existe
app.get("*", (req,res) => {
    res.render("404", {
        title: "404 Error",
        name: "Nico Zuleta",
        error_message: "Page not found."
    })
})

app.listen(port, () => {
    console.log("Server is up on port " + port)
})