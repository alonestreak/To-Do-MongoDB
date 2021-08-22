const express = require('express')
const Task = require('../models/task')
const router = new express.Router()

// Create  a Todo
router.post('/tasks',async (req, res) => {
    const task = new Task({
        ...req.body
    })

    try {
        await task.save()
        res.status(201).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})

// Read all Todos
router.get('/allTasks',async(req,res)=>{
    const tasks= await Task.find({});
    try {
        res.status(201).send(tasks)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Read a Todo
router.get('/tasks/:id', async (req, res) => {
    const _id = req.params.id

    try {
        const task = await Task.findOne({ _id})

        if (!task) {
            return res.status(404).send()
        }
        res.status(201).send(task)
    } catch (e) {
        res.status(500).send()
    }
})


//Update a Todo
router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed','title']
    const isValidOperation = updates.every((update) => allowedUpdates.includes(update))

    if (!isValidOperation) {
        return res.status(400).send({ error: 'Invalid updates!' })
    }

    try {
        const task = await Task.findOne({ _id: req.params.id})

        if (!task) {
            return res.status(404).send({error:"task with given id does not exists"})
        }

        updates.forEach((update) => task[update] = req.body[update])
        await task.save()
        res.status(202).send(task)
    } catch (e) {
        res.status(400).send(e)
    }
})


//Delete a Todo
router.delete('/tasks/:id',async (req, res) => {
    try {
        const task = await Task.findOneAndDelete({ _id: req.params.id})

        if (!task) {
            res.status(404).send()
        }

        res.send(task)
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router