const express = require('express');
const Task = require('../models/task');

const router = express.Router();

router.get('/tasks', async (req, res) => {
    try {

        const result = await Task.find({});
        res.json(result); //status 200 by default.

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

router.get('/tasks/:id', async (req, res) => {
    try {

        const result = await Task.findById(req.params.id);

        if (!result)
            return res.status(404).send('User not found');

        res.json(result); //status 200 by default.

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body);

    try {
        const newTask = await task.save();
        res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

//runValidators: true => para que corra los customValidaros del Model.
router.patch('/tasks/:id', async (req, res) => {
    const allowedUpdates = ['description', 'complete'];
    const updates = Object.keys(req.body);
    const isValidOperation = updates.every(field => allowedUpdates.includes(field));

    if (!isValidOperation)
        return res.status(400).send('Invalid Updated');

    try {
        const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });

        if (!task)
            return res.status(404).send('Task Not Found');

        res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

router.delete('/task/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndDelete(req.params.id); //Retorna la Task borrada.

        if (!task)
            return res.status(404).send('Task not found');

        return res.json(task);

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

module.exports = router;