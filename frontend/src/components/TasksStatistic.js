import React, { useState } from "react";
import {
  Typography,
  Box,
  List,
  ListItem,
  ListItemText,
  Collapse,
} from "@mui/material";
import EmptyMessage from "./EmptyMessage";

const TasksStatistic = ({ stats }) => {
  const [isShowStatistic, setShowStatistic] = useState(false);

  const isEmpty = (obj) => obj && Object.keys(obj).length === 0;

  const showStatItems = (statItem) => {
    if (!statItem) return;
    return Object.entries(statItem).map(([key, value]) => (
      <ListItem key={key}>
        <ListItemText primary={`${key}: ${value}`} />
      </ListItem>
    ));
  };

  return (
    <Box>
      <Typography
        variant="h4"
        onClick={() => setShowStatistic((prev) => !prev)}
        style={{
          cursor: "pointer",
          marginBottom: 16,
          display: "flex",
          justifyContent: "center",
        }}
      >
        {isShowStatistic ? "Hide Statistic" : "Show Statistic"}
      </Typography>

      <Collapse in={isShowStatistic}>
        <div>
          <p>
            transformTasks сортирует задачи по дате исполнения и обрабатывает их
            в одном цикле, это снижает количество итераций и делает код более
            быстрым.
          </p>
          <p>
            Логика разделена на отдельные функции (getWeekOffset), что делает
            код модульным и более понятным
          </p>
          <p>
            Группировка по неделям: Задачи группируются по неделям с помощью
            динамического подсчета что упрощает добавление новых задач в
            соответствующую категорию.
          </p>
        </div>

        {!isEmpty(stats) ? (
          <EmptyMessage/>
        ) : (
          <Box display="flex" justifyContent="space-around" mb={2}>
            <Box>
              <Typography variant="h6">By Status</Typography>
              <List>{showStatItems(stats?.byStatus)}</List>
            </Box>
            <Box>
              <Typography variant="h6">By Assignee</Typography>
              <List>{showStatItems(stats?.byAssignee)}</List>
            </Box>
            <Box>
              <Typography variant="h6">By Due Date</Typography>
              <List>{showStatItems(stats?.byDueDate)}</List>
            </Box>
          </Box>
        )}
      </Collapse>
    </Box>
  );
};

export default TasksStatistic;
