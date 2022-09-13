require('../src/db/mongoose');
const User = require('../src/models/user');


//631a3e356e36dab65b6a7a98
//.findByIdAndUpdate => te devuelve el documento
//.findByOneAndUpdate => te devuelve el documento
//.updateOne() => NO te devuelve el documento
//.updateMany() => NO te devuelve el documento


// const filter = {
//     age: 1
// };

// PROMISE CHAINING --------------------------------
// PARA HACER UNA TAREA DESPOUES DE LA OTRA
// En este caso hago un update y despues cuento el total de documentos con el valor con el que hice update
// User.findByIdAndUpdate('631a3e356e36dab65b6a7a98', filter)
//     .then(user => {
//         console.log(user);
//         //Chaining Promise
//         return User.countDocuments(filter);
//     })
//     .then(countResult => { //Aca uso la promesa retornada de la anterior y genero el chaining.
//         console.log(countResult);
//     }).catch(e => {
//         console.log(e);
//     });


// Promis Chaining CONVERTED to Async/Await
const updateAgeAndCount = async (id, age) => {
    await User.findByIdAndUpdate(id, { age }); //, { new: true }

    return await User.countDocuments({ age });
};

//Al llamar una function Async (Directamente, sin estar dentro de OTRA function async), como siempre devuelven una promesa, puedo capturar el retorno con el .then()
updateAgeAndCount('631a3e356e36dab65b6a7a98', 11)
    .then(usersCount => {
        console.log(usersCount);
    })
    .catch(err => {
        console.log(err);
    });