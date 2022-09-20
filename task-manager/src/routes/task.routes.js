const express = require('express');
const Task = require('../models/task');
const auth = require('../middleware/auth');

const router = express.Router();

router.get('/tasks', auth, async (req, res) => {
    try {
        // await req.user.populate('tasks');
        // res.json(req.user.tasks);

        const result = await Task.find({ owner: req.user._id });
        res.json(result); //status 200 by default.
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

router.get('/tasks/:id', auth, async (req, res) => {
    const _id = req.params.id;

    try {
        const task = await Task.findOne({ _id, owner: req.user._id });

        if (!task)
            return res.status(404).send("You are not the creator of this task");

        res.json(task); //status 200 by default.

    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

router.post('/tasks', auth, async (req, res) => {
    const task = new Task({
        ...req.body,
        owner: req.user._id
    });

    try {
        const newTask = await task.save();
        await newTask.populate('owner');

        res.status(201).json(newTask);
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

//runValidators: true => para que corra los customValidaros del Model.
router.patch('/tasks/:id', auth, async (req, res) => {
    const allowedUpdates = ['description', 'completed'];
    const updatesFromRequest = Object.keys(req.body);
    const isValidOperation = updatesFromRequest.every(field => allowedUpdates.includes(field));

    if (!isValidOperation)
        return res.status(400).send('Invalid Updated');

    try {
        // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
        const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

        if (!task)
            return res.status(404).send('Task Not Found');

        for (const field of updatesFromRequest)
            task[field] = req.body[field];

        await task.save();

        res.status(200).json({ task });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            error
        });
    }
});

router.delete('/tasks/:id', auth, async (req, res) => {
    try {
        // const task = await Task.findByIdAndDelete(req.params.id); //Retorna la Task borrada.
        const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

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