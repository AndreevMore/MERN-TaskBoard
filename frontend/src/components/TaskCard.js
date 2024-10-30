import React from "react";
import { Card, CardContent, Typography, Button } from "@mui/material";
import extractDate from "../utils/extractDate";
import { observer } from "mobx-react-lite";
import { taskStore } from "../stores/tasksStore";

const TaskCard = observer(({ task, onEdit }) => {
  const { taskDelete } = taskStore;

  const removeTask = async (task) => {
    try {
      await taskDelete(task._id);
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <Card style={{ marginBottom: 8, cursor: "pointer" }} onClick={onEdit}>
      <CardContent>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography variant="subtitle1" style={{ fontWeight: 500 }}>
            {task.title}
          </Typography>
          <Button
            onClick={(e) => {
              e.stopPropagation();
              removeTask(task);
            }}
          >
            x
          </Button>
        </div>
        <Typography variant="body2">{task.description}</Typography>
        <Typography variant="caption" color="textSecondary">
          Assignee: {task.assignee}
        </Typography>
        <Typography variant="caption" color="textSecondary">
          Due: {extractDate(task.dueDate)}
        </Typography>
      </CardContent>
    </Card>
  );
});

export default TaskCard;
