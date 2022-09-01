const axios = require('axios').default; //.default for inteliSence and types
const chalk = require('chalk');


const API_KEY = 'c92bb9eda57c4c95adcc6a27cb7fcf75';
const url = 'https://api.weatherbit.io/v2.0/current?lat=35.7796&lon=-78.6382&key=c92bb9eda57c4c95adcc6a27cb7fcf75';
// const url = 'https://api.tomorrow.io/v4/timelines?location=-73.98529171943665,40.75872069597532&fields=temperature&timesteps=current&units=metric&apikey=CwqMpYNwY6jnrGAJJmm8KGZjhcbRIvQH';
//const url = 'https://pokeapi.co/api/v2/pokemon/pikachu';


// request({ url: url }, (error, response) => {
//     const data = JSON.parse(response.body);
//     console.log(data.game_indices[0]);
// })


// axios.get(url)
//     .then(response => {
//         const { temp, precip } = response.data.data[0];
//         // console.log(response.data.data[0]);

//         printForecast(temp, precip);
//     });

// const printForecast = (temperature, chanceOfRain) => {
//     console.log(chalk.green.bold(`It is currently ${temperature} degrees out. There is a ${chanceOfRain} % chance of rain.`));
// }

//Generate error for access => error.response
//https://api.weatherbit.io/v2.0/current?country=Argentina&key=c92bb9eda57c4c95adcc6a27cb7fcf75


axios.get('https://api.weatherbit.io/v2.0/current?city=Buenos%20Aires&country=Argentina&key=c92bb9eda57c4c95adcc6a27cb7fcf75')
    .then(response => {
        const { lat, lon } = response.data.data[0];
        console.log(chalk.magenta(`The Latitude and Longitude for Buenos Aires, Argentina are:\n${chalk.italic.bold(`LAT: ${lat} - LONG: ${lon}`)}.`));
    })
    .catch(error => {
        handdleError(error);
    });

    
const handdleError = () => {
    if (error.response) { // The request was made and the server responded with a status code that falls out of the range of 2xx
        console.log('===== error.response.data =====\n', error.response.data);
        console.log('===== error.response.status =====\n', error.response.status);
        console.log('===== error.response.headers =====\n', error.response.headers);
    }
    else if (error.request) {
        // The request was made but no response was received
        // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
        // http.ClientRequest in node.js
        console.log('===== error.request =====\n', error.request);
    } else {
        // Something happened in setting up the request that triggered an Error
        console.log('==== Error.message GENERAL =====\n', error.message);
    }
    // console.log('===== error.config =====\n', error.config);
}