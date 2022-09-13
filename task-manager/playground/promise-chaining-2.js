require('../src/db/mongoose');
const Task = require('../src/models/task');

// PROMISE CHAINING --------------------------------
// PARA HACER UNA TAREA DESPOUES DE LA OTRA
// Task.findByIdAndDelete('6318eb23145b549963c29d99')
//     .then(task => {
//         console.log('deleted document:', task);
//         return Task.countDocuments({ completed: false });
//     })
//     .then(incompletedTasks => {
//         console.log('Tasks on incompolete status:', incompletedTasks)
//     })
//     .catch(e => {
//         console.log(e);
//     });

// Promise Chaining CONVERTED to Async/Await
const deleteUserAndCount = async (id) => {
    await Task.findByIdAndDelete(id);
    return await Task.countDocuments({ completed: false });
};

deleteUserAndCount('631b967d3d607659eeb98013')
    .then(incompletedTasks => {
        console.log(incompletedTasks);
    })
    .catch(err =>{
        console.log(err);
    });