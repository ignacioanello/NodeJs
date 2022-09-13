const express = require('express');
require('./db/mongoose'); //no hace falta asignarlo a ninguna variable, porque al correrse el archivo, ya tiene el .connect y se ejecuta en ese momento.

const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');


const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const PORT = process.env.PORT || 3004;

// Automaticaly parse JSON
app.use(express.json());

//Use routes
app.use(userRoutes);
app.use(taskRoutes);

app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
});