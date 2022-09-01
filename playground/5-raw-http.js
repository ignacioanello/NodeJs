const https = require('https');

const URL = 'https://api.weatherbit.io/v2.0/current?city=Buenos%20Aires&country=Argentina&key=c92bb9eda57c4c95adcc6a27cb7fcf75';

//Al estar usando un modulo nativo de Node ('https'), y no un NPM Packahge que nos abstrae un monton de cosas, aca vamos a tener que obtener
//los cachos (chunks) de la reponse (La data del HTTP puede ser steameada en varias partes), ya que no viene toda la response junta como en algun paquete http de NPM

//El chunk data es un buffer
//<Buffer 7b 22 64 61 74 61 22 3a 5b 7b 22 77 69 6e 64 5f 63 64 69 72 22 3a 22 4e 4e 57 22 2c 22 72 68 22 3a 35 37 2c 22 70 6f 64 22 3a 22 64 22 2c 22 6c 6f 6e ... 562 more bytes>

const request = https.request(URL, (resp) => {
    let data = '';

    //Este evento se dispara cuando llega la data en chunks
    resp.on('data', (chunk) => {
        //IMPORTANTE !!!!!
        //Esto corre varias veces, una vez por cada chunk
        //chunk == Buffer
        //console.log('chunk es un buffer: ', chunk);

        data += chunk.toString();

    });

    resp.on('end', () => {
        //Esto corre una sola vez, cuando termina.
        console.log(JSON.parse(data));
    });

});

request.on('error', (error) => {
    //NOTA: Esto impacta al request, 
    console.log('An Error', error);
});

//Cuando terminas de setear el request y ejecutas el .end(), lo dispara.
request.end();