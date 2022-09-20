const express = require('express');
require('./db/mongoose'); //no hace falta asignarlo a ninguna variable, porque al correrse el archivo, ya tiene el .connect y se ejecuta en ese momento.

const userRoutes = require('./routes/user.routes');
const taskRoutes = require('./routes/task.routes');

const app = express();
const PORT = process.env.PORT || 3004;

// Automaticaly parse JSON
app.use(express.json());

//Use routes
app.use(userRoutes);
app.use(taskRoutes);

// Without middlerware: new request -> run route handler.
//
// With middlerware: new request -> do something -> run route handler.


app.listen(PORT, () => {
    console.log(`Server is on port ${PORT}`);
});

// Encryption algorithm: YHou can get the original value back (nacho => asdgf$·"$fdWd => nacho).

// Hash algorithm: Are ONE WAY algorithm. You cannot reverse the process. (nacho => asdgf$·"$fdWd).
// Lo que se hace cuando uno se loguea es un hash de la pass y comparar ese valor hasheado con el hash de la DB