const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const cors = require('cors')
const Task = require('./task.model')

mongoose.connect("mongodb+srv://praneeth:praneeth@basicnodeconnect.x8dsf.mongodb.net/TodoApp?retryWrites=true&w=majority&appName=BasicNodeConnect")
.then(() => {
    console.log("Connected to MongoDB")
})
.catch((err) => {
    console.log(err)
})

const app = express()
const port = 3000

app.use(bodyParser.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

app.get('/allTasks', async (req, res) => {
  const tasks = await Task.find({})
  res.status(200).json({result: true, data: tasks})
})

app.get('/taskById/:id', async (req, res) => {
  const id = req.params.id
  await Task.findById(id)
    .then((task) => {
      if(!task) {
        return res.status(404).json({result: false, message: "Task not found"})
      }
      res.status(200).json({result: true, data: task})
    })
    .catch((error) => {
      res.status(500).json({result: false, message: error.message})
    })
})

app.post('/addTask', async (req, res) => {
  try {
    const newTask = new Task({
      name: req.body.name,
      description: req.body.description,
      dueDate: req.body.dueDate,
      createdDate: req.body.createdDate || new Date(),
      isCompleted: req.body.isCompleted || false,
      tags: req.body.tags || [],
      completedOn: req.body.completedOn || null
    })

    const savedTask = await newTask.save();
    res.status(201).json({ result: true, data: savedTask });
  } catch (error) {
    res.status(500).json({ result: false, message: error.message });
  }
})

app.put('/updateTask/:id', async (req, res) => {
  const taskId = req.params.id
  const updatedTask = {
    name: req.body.name,
    description: req.body.description,
    dueDate: req.body.dueDate,
    createdDate: req.body.createdDate || new Date(),
    isCompleted: req.body.isCompleted || false,
    tags: req.body.tags || [],
    completedOn: req.body.completedOn || null
  }
  await Task.findByIdAndUpdate(taskId, updatedTask)
    .then((task) => {
      if(!task) {
        return res.status(404).json({result: false, message: "Task not found"})
      }
      res.status(200).json({result: true, message: "Task updated successfully"})
    })
    .catch((error) => {
      res.status(500).json({result: false, message: error.message})
    })
})

app.delete('/deleteTask/:id', async (req, res) => {
  const taskId = req.params.id
  await Task.findByIdAndDelete(taskId)
    .then((task) => {
        if(!task) {
            return res.status(404).json({result: false, message: "Task not found"})
        }
        res.status(200).json({result: true, message: "Task deleted successfully"})
    })
    .catch((error) => {
        res.status(500).json({result: false, message: error.message})
    })
})

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})
