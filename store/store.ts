import { configureStore } from "@reduxjs/toolkit";
import uiSlice from "./featurs/uiSlice";
import authSlice from "./featurs/authSlice";
import countriesSlice from "./featurs/getCountriesSlice";
import userInfoSlice from "./featurs/userInfoSlice";
import usersSlice from "./featurs/getUsersSlice";
import chatSlice from "./featurs/chatSlice";
import imagesGallerySlice from "./featurs/imagesGallerySlice";

export const store = configureStore({
  reducer: {
    ui: uiSlice,
    auth: authSlice,
    countries: countriesSlice,
    userInfo: userInfoSlice,
    users: usersSlice,
    chats: chatSlice,
    imagesGallery: imagesGallerySlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
