import axios from "axios";
const apiUrl = process.env.REACT_APP_API_URL;

const apiClient = axios.create({
  baseURL: apiUrl,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchTasks = async () => {
  try {
    const response = await apiClient.get("/tasks");
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await apiClient.delete(`/tasks/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  try {
    const response = await apiClient.post(`/tasks`, task);
    return response.data;
  } catch (error) {
    console.error("Error fetching tasks:", error);
    throw error;
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await apiClient.put(`/tasks/${id}`, task);
    return response.data;
  } catch (error) {
    console.error(
      "Error updating task:",
      error.response ? error.response.data : error.message
    );
    throw error;
  }
};
