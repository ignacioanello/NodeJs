const jwt = require('jsonwebtoken');
const User = require('../models/user');

const auth = async (req, res, next) => {
    try {

        // const token = req.header('x-token').replace('Bearer ', '');
        const token = req.header('Authorization').replace('Bearer ', '');

        const payloadDecoded = jwt.verify(token, 'thisismynewcourse');
        //Chequeo en la lista de tokens si está.
        const user = await User.findOne({ _id: payloadDecoded._id, 'tokens.token': token });

        if (!user)
            throw new Error();

        // Si quiero que en otros middleware o rutas se obtenga el ID del user o toda la data del user para linkear cosas o ahorrar llamadas 
        // Puedo pasarlo insertandoselo al request (qwue es lo que pasa de middleware a otro.) 
        //Entonces no hay que gastar recursos llamando de nuevo a la busqueda del usuario.
        req.token = token; //para que despues al momenot de hacer logout pueda compararlo contra el array de tokens que esta en el model (user)
        req.user = user;

        next();
    } catch (error) {
        res.status(401).send({ error: 'Please authenticate' });
    }
}

module.exports = auth;