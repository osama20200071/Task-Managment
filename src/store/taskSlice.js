import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../appwrite/databases";
import { getImageUrl } from "../appwrite/config";

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await db.tasks.list();
      response.documents.forEach(
        (task) => (task.imageKey = getImageUrl(task.imageKey))
      );
      return response.documents;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for adding a task
export const createTask = createAsyncThunk(
  "tasks/createTask",
  async (taskData, { rejectWithValue }) => {
    try {
      console.log(taskData);
      //* : Add the task data to our tasks
      const response = await db.tasks.create(taskData);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for deleting a task
export const deleteTask = createAsyncThunk(
  "tasks/deleteTask",
  async (taskId, { rejectWithValue }) => {
    try {
      const response = await db.tasks.delete(taskId);
      // Todo : update our tasks
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Async thunk for updating a specific task
export const updateTask = createAsyncThunk(
  "tasks/updateTask",
  // contains only the updated
  async (update, { rejectWithValue }) => {
    try {
      console.log("taskData:", update);
      // Todo : Add the updateTask data to our tasks
      const response = await db.tasks.update(update.taskId, { ...update.data });
      console.log("updating task request :", response);
      return response;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const tasksSlice = createSlice({
  name: "tasks",
  initialState: {
    tasks: [],
    status: "idle", // "idle" | "loading" | "succeeded" | "failed"
    error: null,
  },
  reducers: {
    // we can make it more generic to update any value of the task
    updateTasksState(state, action) {
      const { taskId, newState } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.$id === taskId ? { ...task, state: newState } : task
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(createTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.tasks.push(action.payload);
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.error = action.payload;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = "succeeded";
      });
  },
});

export const { updateTasksState } = tasksSlice.actions;

export default tasksSlice;
