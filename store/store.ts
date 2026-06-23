import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./featurs/uiSlice";
import authSlice from "./featurs/authSlice";
import countriesSlice from "./featurs/getCountriesSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
    countries: countriesSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
