// fetch('https://puzzle.mead.io/puzzle')

console.log('Client side JavaScript loaded');

// ########### With Promise ###########
// const getForecast = (city, country) => {
//     return fetch(`http://localhost:3002/weather?city=${city}&country=${country}`)
//         .then(response => response.json())
//         .then(json => {
//             if (json.error) {
//                 console.log(json.error);
//                 return;
//             }
//             // console.log(json);
//             return json;
//         });
// };

// ########### With Async/Await ###########
const getForecast = async (city, country) => {
    // fetch('https://puzzle.mead.io/puzzle')
    // Para hacer el depoloy hay que usar el dominio del site donde se deploya
    // const response = await fetch(`http://localhost:3002/weather?city=${city}&country=${country}`);
    const response = await fetch(`/weather?city=${city}&country=${country}`);
    const json = await response.json();
    if (json.error) {
        throw json.error;
    }
    return json;
};


const weatherForm = document.querySelector('#searchForm');
const countrySearchInput = document.querySelector('#countrySearchInput');
const citySearchInput = document.querySelector('#citySearchInput');
const paragraph = document.querySelector('#paragraph');
const paragraphError = document.querySelector('#paragraph-error');

weatherForm.addEventListener('submit', async (e) => {
    e.preventDefault();

    paragraph.textContent = '';
    paragraphError.textContent = '';

    const country = countrySearchInput.value;
    const city = citySearchInput.value;

    // ########### With Promise ###########
    // getForecast(city, country).then(response => {
    //     console.log('FINAL', response);
    //     paragraph.textContent = JSON.stringify(response);
    // });

    // ########### With Async/Await ###########
    try {
        const response = await getForecast(city, country);
        paragraph.textContent = JSON.stringify(response);
    } catch (error) {
        paragraphError.textContent = error;
        console.log('ERROR', error)
    }
});