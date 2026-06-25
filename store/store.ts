import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./featurs/uiSlice";
import authSlice from "./featurs/authSlice";
import countriesSlice from "./featurs/getCountriesSlice";
import userInfoSlice from "./featurs/userInfoSlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
    countries: countriesSlice,
    userInfo: userInfoSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
