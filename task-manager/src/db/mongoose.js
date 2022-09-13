const mongoose = require('mongoose');

//A diferencia de hacerlo diurectamente con MongDB, en mongoose hay que posarle la DB en el connectionString (task-manager-api)
mongoose.connect('mongodb://127.0.0.1:27017/task-manager-api',
    () => console.log('Connected Correctly!!')
);
