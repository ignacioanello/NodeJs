
//callback
const doWorkCallback = (callback) => {
    setTimeout(() => {
        callback('This is my error', undefined); // (error, result) => {} del caller.
        callback(undefined, [1, 4, 7]); // (error, result) => {} del caller.
    }, 2000);
}


// doWorkCallback((error, result) => {
//     if (error)
//         return console.log(error)

//     console.log(result);
// });


//promise
const doWorkPromise = (...valueToAdd) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const arr = [1, 4, 7];
            arr.push(...valueToAdd);

            if (arr.length % 2 === 0)
                resolve(arr);

            reject('CANTIDAD IMPAR');

        }, 2000);
    });
}

// doWorkPromise(3,1)
//     .then(
//         result => console.log(result))
//     .catch(error => { 
//         console.log('El error => ', error);
//     });

// ------------------------------------------------
//PROMISE CHAINING (dentro de una Promise RETORNAR otra promise o llamada a una promise, o sea ir concatenandolas, y me da la posibilidad de concatenar los .then())

const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(a + b);
        }, 2000);
    });
}

add(1, 1)
    .then(sum => {
        console.log(sum);
        return add(sum, 4); //la segunda promise corre cuando esta promise esta fullfil
    })
    .then(sum2 => {
        // console.log(sum2);
        console.log(sum2);
    })
    .catch(e => {
        console.log(e);
    });