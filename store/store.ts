import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./featurs/uiSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
  },
});

// 👇 این مهمه
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;