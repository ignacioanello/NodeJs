console.log('Starting');

setTimeout(() => { 
    console.log('2 second timer');
}, 2000); 
//Los 2 segundos son el tiempo que la funcion esta en el Node Api (Donde se registran los eventos con sus callbacks) hasta que lo manda al Callback Queue, 
//para que al liberarse el call Stack, el EventLoop la pueda pasa a este utltimo.

setTimeout(() => { 
    console.log('0 second timer');
}, 0);

console.log('Stopping');

//Importante:
//Ninguna funcion(Callback) que este en el CallbackQueue, se va a ejecutar antes que la funcion principal termine (callStack)


// VER VIDEO 3 DE MODULO 6

/*
OUTPUT:
    Starting
    Stopping      
    0 second timer
    2 second timer
*/