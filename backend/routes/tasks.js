const express = require("express");
const Task = require("../models/TaskSchema");
const router = express.Router();

// Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Add new task
router.post("/", async (req, res) => {
  try {
    const { title, description, status, dueDate, assignee } = req.body;
    const newTask = new Task({ title, description, status, dueDate, assignee });

    await newTask.save();
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete task by id
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    res.status(400).send(error);
  }
});

// Update task by id
router.put("/:id", async (req, res) => {
  const { title, description, assignee, dueDate, status } = req.body;

  try {
    const updatedTask = await Task.findByIdAndUpdate(
      req.params.id,
      {
        title,
        description,
        assignee,
        dueDate,
        status,
        updatedAt: Date.now(),
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json(updatedTask);
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
});

module.exports = router;
