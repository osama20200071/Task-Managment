import { configureStore } from "@reduxjs/toolkit";
import taskSlices from "./taskSlice";

const store = configureStore({
  devTools: true, // to make the extension work
  reducer: {
    tasks: taskSlices.reducer,
  },
});

export default store;
