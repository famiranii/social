import { UserImage } from "@/types/userImage";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface imagesGalleryType {
  images: UserImage[];
}

const initialState: imagesGalleryType = {
  images: [],
};

const imagesGallerySlice = createSlice({
  name: "images",
  initialState,
  reducers: {
    setImagesGallery: (state, action: PayloadAction<UserImage[]>) => {
      state.images = action.payload;
    },
  },
});

export const { setImagesGallery } = imagesGallerySlice.actions;
export default imagesGallerySlice.reducer;
