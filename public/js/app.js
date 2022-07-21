//Esto es para que el buscador de .hbs se conecte con la info de node js y haga algo
//Hay que tener en cuenta que lo que está entre comillas como "form" significa que va a hacer match con el primero form que haya en el .hbs y eso es lo que se va a traer
const weather_form = document.querySelector("form")
const search = document.querySelector("input") //Me estoy trayendo la info de input que el usuario ponga

//Hacemos el #message-1 porque nos toco ponerle un id a "p" en js/app.js para que fuera unico
// Esto son los textos que van a aparecer abajo del buscador cuando el usuario ponga un location que ya es el resultado de todo
const message_one = document.querySelector("#message-1")
const message_two = document.querySelector("#message-2")


weather_form.addEventListener("submit", (e) => {
    e.preventDefault() //Evita que el browser se reinicie cada vez que alguien haga una busqueda

    const location = search.value //Como el usuario en el tab va a poner la ubicación por eso creo esta nueva variable
    
    message_one.textContent = "Loading..."
    message_two.textContent = ""
    
    //Fetch es para traernos info de una pagina y poderlo usar en java para ponerlo en nuestra pagina. Entonces como en el source/app.js ya hicimos para que esta pagina tenga toda la info cuando el usuario busque por eso ya da resultados. es taernos la info de /weather en la de index la otra pagina a esta.
    fetch("/weather?address=" + location).then((response)=> { 
    response.json().then((data) => {
        if (data.error) {
            message_one.textContent = data.error //Aca lo que hago es que ese mensaje previamente definido me de la info de error
        } else {
            message_one.textContent = data.location //Aca lo que hago es que ese mensaje previamente definido me de la info de location y fprecast
            message_two.textContent = data.forecast
        }
    })
})
})