import React, { useState, useEffect } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Select,
  MenuItem,
} from "@mui/material";
import { taskStore } from "../stores/tasksStore";

const TaskModal = ({ open, onClose, task, isEditMode }) => {
  const { taskUpdate, taskCreate } = taskStore;
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    assignee: "",
    dueDate: "",
    status: "open",
  });
  const [initialData, setInitialData] = useState(null);

  useEffect(() => {
    if (isEditMode && task) {
      const taskData = {
        title: task.title,
        description: task.description,
        assignee: task.assignee,
        dueDate: task.dueDate.split("T")[0],
        status: task.status,
      };
      setFormData(taskData);
      setInitialData(taskData);
    } else {
      const newData = {
        title: "",
        description: "",
        assignee: "",
        dueDate: "",
        status: "open",
      };
      setFormData(newData);
      setInitialData(newData);
    }
  }, [task, isEditMode]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const isFormValid = () => {
    return (
      formData.title.trim() !== "" &&
      formData.description.trim() !== "" &&
      formData.assignee.trim() !== "" &&
      formData.dueDate.trim() !== "" &&
      formData.status.trim() !== ""
    );
  };

  const isFormChanged = () => {
    return JSON.stringify(formData) !== JSON.stringify(initialData);
  };

  const handleSubmit = async () => {
    if (!isFormChanged()) {
      console.log("No changes detected, update cancelled.");
      handleClose();
      return;
    }

    try {
      if (isEditMode) {
        await taskUpdate(task._id, formData);
      } else {
        await taskCreate(formData);
      }
      handleClose();
    } catch (error) {
      console.error(
        isEditMode ? "Failed to update task:" : "Failed to create task:",
        error
      );
    }
  };

  const handleClose = () => {
    onClose();
    setFormData({
      title: "",
      description: "",
      assignee: "",
      dueDate: "",
      status: "open",
    });
    setInitialData(null);
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>{isEditMode ? "Edit Task" : "Create Task"}</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          required
          margin="dense"
          name="title"
          label="Title"
          value={formData.title}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          margin="dense"
          name="description"
          label="Description"
          value={formData.description}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          margin="dense"
          name="assignee"
          label="Assignee"
          value={formData.assignee}
          onChange={handleChange}
          fullWidth
        />
        <TextField
          required
          margin="dense"
          name="dueDate"
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={handleChange}
          fullWidth
          InputLabelProps={{
            shrink: true,
          }}
        />
        <Select
          required
          name="status"
          value={formData.status}
          onChange={handleChange}
          fullWidth
          margin="dense"
        >
          <MenuItem value="open">Open</MenuItem>
          <MenuItem value="in progress">In Progress</MenuItem>
          <MenuItem value="completed">Completed</MenuItem>
        </Select>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!isFormValid()}>
          {isEditMode ? "Update" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskModal;
