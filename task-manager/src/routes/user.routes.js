const express = require('express');
const User = require('../models/user');

const router = express.Router();

router.get('/users', async (req, res) => {
    try {

        //El find() aca NO es el find de MongoDB que esta asociado a una collection y devuelve un cursor. Desde mongoose, el find() es de un Model... por lo tanto
        //devuelve el json
        const result = await User.find({});
        res.json(result);

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

router.get('/users/:id', async (req, res) => {
    try {

        // ==> findById(id) is just syntactic sugar of the find({_id : id}) or findOne({_id: id})
        const result = await User.findById(req.params.id);
        //findById(id) is almost equivalent to findOne({ _id: id }).
        // If you want to query by a document's _id, use findById() instead of findOne()

        if (!result)
            return res.status(404).send('User not found');

        res.json(result); //status 200 by default.

    } catch (error) {
        return res.status(400).json({
            ok: false,
            error
        });
    }
});

router.post('/users', async (req, res) => {
    const user = new User(req.body);

    try {
        const newUser = await user.save();
        res.status(201).json(newUser);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

//runValidators: true => para que corra los customValidaros del Model.
router.patch('/users/:id', async (req, res) => {
    const allowedUpdates = ['name', 'email', 'password', 'age'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(field => allowedUpdates.includes(field));

    if (!isValidOperation)
        return res.status(400).send('Invalid Updated');

    try {
        const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!user)
            return res.status(404).send('User Not Found');

        res.status(200).json({ user });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        const user = await User.findByIdAndDelete(req.params.id); //Retorna el usuario borrado.

        if (!user)
            return res.status(404).send('User not found');

        return res.json(user);

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

module.exports = router;
