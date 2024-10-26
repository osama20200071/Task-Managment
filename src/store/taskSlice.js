import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { db } from "../appwrite/databases";

// Async thunk for fetching tasks
export const fetchTasks = createAsyncThunk(
  "tasks/fetchTasks",
  async (userId, { rejectWithValue }) => {
    try {
      const response = await db.tasks.list();
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
      return taskId;
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
      // @desc: newTaskState : the updated values
      const { taskId, newTaskState } = action.payload;
      // when removing item
      if (!newTaskState) {
        state.tasks = state.tasks.filter((task) => task.$id !== taskId);
      }
      // when updating item
      else {
        state.tasks = state.tasks.map((task) =>
          task.$id === taskId ? { ...task, ...newTaskState } : task
        );
      }
    },
  },
  extraReducers: (builder) => {
    builder

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
        state.loading = false;
        console.log("case deleteTask fulfilled", action.payload);
        state.tasks = state.tasks.filter((task) => task.$id !== action.payload); // Remove task by id
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const updatedTask = action.payload; // This is the updated task object returned by Appwrite
        console.log("update case", updateTask);
        const taskIndex = state.tasks.findIndex(
          (task) => task.$id === updatedTask.$id
        );

        if (taskIndex !== -1) {
          // Update the task in the tasks array
          state.tasks[taskIndex] = {
            ...state.tasks[taskIndex],
            ...updatedTask, // Spread the updated fields onto the existing task
          };
        }
      });
  },
});

export const { updateTasksState } = tasksSlice.actions;

export default tasksSlice;
