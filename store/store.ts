import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./featurs/uiSlice";
import authSlice from "./featurs/authSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
  },
});

// 👇 این مهمه
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
