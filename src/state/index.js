import postsSlice from "./postsSlice";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
  reducer: {
    postsReducer: postsSlice,
  },
});

export default store;
