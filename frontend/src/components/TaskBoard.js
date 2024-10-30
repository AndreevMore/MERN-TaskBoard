import React, { useState } from "react";
import { Paper, Typography, Grid } from "@mui/material";
import { observer } from "mobx-react-lite";
import { taskStore } from "../stores/tasksStore";
import TaskCard from "./TaskCard";
import TaskModal from "./TaskModal";
import EmptyMessage from "./EmptyMessage";

const getStatusColor = (status) => {
  switch (status) {
    case "open":
      return "blue";
    case "in progress":
      return "orange";
    case "completed":
      return "green";
    default:
      return "gray";
  }
};

const TaskBoard = observer(() => {
  const { tasks } = taskStore;
  const [isModalOpen, setModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState(null);

  if (!tasks.length) {
    return (
      <EmptyMessage/>
    );
  }

  const groupedTasks = tasks.reduce(
    (acc, task) => {
      if (!acc[task.status]) acc[task.status] = [];
      acc[task.status].push(task);
      return acc;
    },
    { open: [], "in progress": [], completed: [] }
  );

  const openEditModal = (task) => {
    setSelectedTask(task);
    setModalOpen(true);
  };

  return (
    <>
      <Grid container spacing={2}>
        {["open", "in progress", "completed"].map((status) => (
          <Grid item xs={4} key={status}>
            <Paper
              elevation={3}
              style={{
                padding: 16,
                minHeight: 400,
                borderRadius: 8,
                backgroundColor: "lightgray",
              }}
            >
              <Typography
                variant="h6"
                align="center"
                style={{ color: getStatusColor(status) }}
              >
                {status.toUpperCase()}
              </Typography>
              <div style={{ minHeight: 300, padding: 8 }}>
                {groupedTasks[status].map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={() => openEditModal(task)}
                  />
                ))}
              </div>
            </Paper>
          </Grid>
        ))}
      </Grid>

      {/* Edit Task Modal */}
      <TaskModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        task={selectedTask}
        isEditMode={true}
      />
    </>
  );
});

export default TaskBoard;
