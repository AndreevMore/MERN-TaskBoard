import React, { useEffect, useState } from "react";
import { Container, Button, Typography } from "@mui/material";
import { taskStore } from "./stores/tasksStore";
import { observer } from "mobx-react-lite";
import TasksStatistic from "./components/TasksStatistic";
import TaskBoard from "./components/TaskBoard";
import transformTasks from "./utils/transformTasks";
import TaskModal from "./components/TaskModal";

const App = observer(() => {
  const { tasks, getTasks } = taskStore;
  const [stats, setStats] = useState({});
  const [isModalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    getTasks();
  }, [getTasks]);

  useEffect(() => {
    const stats = transformTasks(tasks);
    setStats(stats);
  }, [tasks]);

  const openEditModal = () => {
    setModalOpen(true);
  };

  return (
    <Container
      maxWidth="lg"
      style={{ marginTop: "20px", position: "relative" }}
    >
      <Typography variant="h4" align="center" gutterBottom>
        Task Management
      </Typography>
      <Button
        color="main"
        style={{ position: "absolute", top: 5, right: 10 }}
        onClick={() => openEditModal()}
        variant="outlined"
      >
        Create Task
      </Button>
      <TasksStatistic stats={stats} />
      <TaskBoard />

      <TaskModal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        isEditMode={false}
      />
    </Container>
  );
});

export default App;
