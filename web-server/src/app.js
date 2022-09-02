const path = require('path');
const express = require('express');
const hbs = require('hbs');
const axios = require('axios').default;
const chalk = require('chalk');

const app = express();
const PORT = process.env.PORT || 3002;

// DEFINE PATHS FOR EXPRESS CONFIG
// Sirviendo static files mediante la ruta (Aca sirve el index.html en el root path) (default)
// Unica location expuesta por el webserver.
const publicDirectoryPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');


// SETUP HANDLEBARS ENGINE AND VIEWS LOCATION
app.set('view engine', 'hbs'); //<-- diciendole a express que vamos a usar handlebars como view engine. //.set() let you set a value for an express setting
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// SETUP STATIC DIRECTORY TO SERVE
// El express.static se encarga de servir los archivo estatico (.HTML, .css, .js). Por eso no hace falta usar el app.get('/help'), ya que no es un endpoint, 
// sino que en la URL va el /about.html.
// Directamente al poner el /help.html, /about.html, etc, detecta eso en el dirname + public y se encarga de entregar el static file
app.use(express.static(publicDirectoryPath));


// Ahora saco el index.html de public folder y creo un endpoint para servir el index.html de handlebars. Y accedo sin el .html
// IMPORTANTE: Que tiene que estar dentro de la carpeta /views (sE PUEDE CUSTOMIZAR (default folder es views), VER const viewsPath y middleware: app.set('views', viewPath);). 
app.get('/', (req, resp) => {
    resp.render('index', {
        //valores que queres que sean accedidos o que necesite la vista.
        title: 'Weather App',
        name: 'Nacho Anello'
    });
});

app.get('/about', (req, resp) => {
    resp.render('about', {
        title: 'About Page',
        name: 'Nacho'
    });
});

app.get('/help', (req, resp) => {
    resp.render('help', {
        message: 'Do you need some help???',
        title: 'Help Page',
        name: 'Nacho'
    });
});

app.get('/weather', async (req, resp) => {
    const { city = '', country = '' } = req.query;

    if (city === '' || country === '') {
        return resp.send({
            error: 'Please fill city and country!'
        });
    }

    try {
        // ##### With async/await #####
        // -------------
        const { lat, lon, temp } = await forecastService2(city, country) || {};

        resp.send({
            lat,
            lon,
            temperature: temp
        });
        // const serviceResult = await forecastService2(city, country);
        // resp.send(serviceResult);    
    } catch (error) {
        return resp.send({
            error: 'ERROR while trying to access the service, try another search!'
        });
    }


    // ##### With callback #####
    // -------------
    //IMPORTANTE: Como el servicio tiene una llamada async dentro (axios), y tardaba, se me ejecutaba antes el resp.send({}), por lo tanto
    // ATO la respuesta de ese send mediante un callback para que se tirgeree dentro del callback cuando termine el metodo async
    // forecastService(city, country, (error, forecastServiceData) => {
    //     if (error) {
    //         return resp.send('There was an Error ==> ' + error);
    //     }

    //     resp.send({
    //         ...forecastServiceData
    //     })
    // });
});

// ##### With async/await #####
// -------------
const forecastService2 = async (city, country, callback) => {
    try {
        const result = await axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=c92bb9eda57c4c95adcc6a27cb7fcf75`);
        // const { lat, lon, temp } = result.data.data[0];
        // return { lat, lon, temp };

        return result.data.data[0]; // <----- Hago la desestructuracion desde el lado del consumidor

    } catch (error) {
        throw error;
    }
};

// ##### With callback #####
// -------------
// const forecastService = (city, country, callback) => {

//     axios.get(`https://api.weatherbit.io/v2.0/current?city=${city}&country=${country}&key=c92bb9eda57c4c95adcc6a27cb7fcf75`)
//         .then(response => {
//             const { lat, lon, temp } = response.data.data[0];
//             console.log(chalk.magenta(`The Latitude and Longitude for ${city}, ${country} are:\n${chalk.italic.bold(`LAT: ${lat} - LONG: ${lon}`)}.`));

//             //IMPORTANTE: Aca me encargo de ejecutar el resp.send({}) que viene dentro del callback
//             callback(undefined, { lat, lon, temp });
//         })
//         .catch(error => {
//             callback(error, undefined);
//             // handdleError(error);
//         });
// };

//404 handler inside /help - Match rutas que vengan despues de /help/
app.get('/help/*', (req, resp) => {
    resp.render('404', {
        title: '404 Page',
        errorMessage: 'Help article not found',
        name: 'Nacho'
    });
});


//404 handler ('*' => wildcard character)
app.get('*', (req, resp) => {
    resp.render('404', {
        title: '404 Page',
        errorMessage: 'Page Not Found',
        name: 'Nacho'
    });
});

app.listen(PORT, () => {
    console.log('Server running');
})