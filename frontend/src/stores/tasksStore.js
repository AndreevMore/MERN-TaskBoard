import { makeAutoObservable, runInAction } from "mobx";
import {
  fetchTasks,
  createTask,
  deleteTask,
  updateTask,
} from "../service/httpService";

class TasksStore {
  tasks = [];
  filters = {
    assignee: "",
    status: "",
    week: "",
  };

  constructor() {
    makeAutoObservable(this);
  }

  getTasks = async () => {
    try {
      const tasks = await fetchTasks();

      runInAction(() => {
        this.setTasks(tasks);
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  taskCreate = async (task) => {
    try {
      await createTask(task);

      runInAction(() => {
        this.getTasks();
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  taskDelete = async (id) => {
    try {
      await deleteTask(id);

      runInAction(() => {
        this.getTasks();
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  taskUpdate = async (id, task) => {
    try {
      await updateTask(id, task);

      runInAction(() => {
        this.getTasks();
      });
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  setTasks = (tasks) => {
    runInAction(() => {
      this.tasks = tasks;
    });
  };

  setFilter(name, value) {
    this.filters[name] = value;
  }

  get filteredTasks() {
    const { assignee, status, week } = this.filters;

    let filtered = this.tasks;

    if (assignee) {
      filtered = filtered.filter((task) => task.assignee === assignee);
    }

    if (status) {
      filtered = filtered.filter((task) => task.status === status);
    }

    if (week) {
      const currentDate = new Date();
      const weekNumber = parseInt(week, 10);

      const startOfWeek = new Date(
        currentDate.setDate(
          currentDate.getDate() - currentDate.getDay() - (weekNumber - 1) * 7
        )
      );
      const endOfWeek = new Date(startOfWeek);
      endOfWeek.setDate(startOfWeek.getDate() + 6);

      filtered = filtered.filter(
        (task) =>
          new Date(task.dueDate) >= startOfWeek &&
          new Date(task.dueDate) <= endOfWeek
      );
    }

    return filtered;
  }
}

export const taskStore = new TasksStore();
