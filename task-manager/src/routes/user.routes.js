const express = require('express');
const User = require('../models/user');
const auth = require('../middleware/auth');

const router = express.Router();

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        //Saved user
        const newUser = await user.save();
        //Generate JWT and save
        const token = await newUser.generateAuthToken();

        res.status(201).json({ newUser, token });

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

router.post('/users/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        //Check credentials. (Lo metemos dentro de User cuando hacemnos algo para todos los users, mas generico, a diferencia del JWT ques por cada usuario especifico y particular)
        const user = await User.findByCredentials(email, password); //este findByCredentials, es el que va a llamar a statics del schema

        //Generate JWT for user (esto en vez de estar dentro de 'statics' en el schema, esta dentro de 'methods', ya que es un metodo de la instancia del model)
        const token = await user.generateAuthToken();

        res.status(200).json({
            // user: user.getPublicProfile(), // Hide sensitive data (manual way)
            user,
            token
        });

    } catch (error) {
        return res.status(400).send(error.message)
    }
});

router.post('/users/logout', auth, async (req, res) => {
    const userToken = req.token;
    req.user.tokens = req.user.tokens.filter(token => token.token !== userToken);

    try {
        await req.user.save();
        res.send('You are logged out');

    } catch (error) {
        res.status(500).send();
    }
});

router.post('/users/logoutAll', auth, async (req, res) => {
    req.user.tokens = [];

    try {
        await req.user.save();
        res.send('You are logged out from all devices');

    } catch (error) {
        res.status(500).send();
    }
});

router.get('/users/me', auth, async (req, res) => {
    try {

        //El find() aca NO es el find de MongoDB que esta asociado a una collection y devuelve un cursor. Desde mongoose, el find() es de un Model... por lo tanto
        //devuelve el json
        // const result = await User.find({});
        res.json(req.user);

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

//We should no get the possibility for getting the data of another user.
// router.get('/users/:id', async (req, res) => {
//     try {

//         // ==> findById(id) is just syntactic sugar of the find({_id : id}) or findOne({_id: id})
//         const result = await User.findById(req.params.id);
//         //findById(id) is almost equivalent to findOne({ _id: id }).
//         // If you want to query by a document's _id, use findById() instead of findOne()

//         if (!result)
//             return res.status(404).send('User not found');

//         res.json(result); //status 200 by default.

//     } catch (error) {
//         return res.status(400).json({
//             ok: false,
//             error
//         });
//     }
// });

//runValidators: true => para que corra los customValidaros del Model.

//NOTA: No pasamos mas en :id en la ruta porque solo te podes hacer update a vos mismo y el ID se saca del payload del token que se verifica en auth middleware.
router.patch('/users/me', auth, async (req, res) => {

    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const updatesFromRequest = Object.keys(req.body);
    const isValidOperation = updatesFromRequest.every(field => allowedUpdates.includes(field));

    if (!isValidOperation)
        return res.status(400).send('Invalid Updated');

    try {
        // findByIdAndUpdate() saltea mongoose y ejecuta directamente sobre mongoDB, por eso hay que especificarle el runValidators: true
        // y tambien no pasa por el User.pre() del model.
        // Alguna functions de mongoose saltean funcionalidades mas avanzadas como los middlewares, por eso hay que hacer una modificacion
        // Original: const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        // Modificado para que no solatee los middlewars del Model y termine ejecutando el hook save()
        // const user = await User.findById(req.params.id);

        // if (!user)
        //     return res.status(404).send('User Not Found');

        //IMPORTANTE: Aca es donde modifico los campos que vienen en el body y al ser dinamico, AHI se si se modifico el campo password dentro del Model (pre())
        // Si en el body del request no va el 'password', no va a ser actualizado dentro del foreach y va a dar false el user.IsModified() dentro del Model (pre())
        updatesFromRequest.forEach(field => req.user[field] = req.body[field]);

        await req.user.save(); // Las validaciones que antes se ponian con {runValidators: true} las ejecuta por default

        res.status(200).json({ user: req.user });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

//NOTA: No pasamos mas en :id en la ruta porque solo te podes borrar a vos mismo y el ID se saca del payload del token que se verifica en auth middleware.
router.delete('/users/me', auth, async (req, res) => {
    try {
        // const user = await User.findByIdAndDelete(req.user._id); //Retorna el usuario borrado.
        // if (!user)
        //     return res.status(404).send('User not found');
        await req.user.remove(); // Lo hago asi directamente porque el chequedo de existencia del usuario ya esta en el auth (line: 12)

        return res.json(req.user);

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

module.exports = router;
