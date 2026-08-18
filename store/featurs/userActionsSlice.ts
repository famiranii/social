import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../../app/components/lib/api";
import { ResponseType } from "@/types/responseType";

interface UsersState {
  status: "idle" | "loading" | "success";
  error: string | null;
}

const initialState: UsersState = {
  status: "idle",
  error: null,
};

export const saveUserApi = createAsyncThunk(
  "save/user",
  async (following_id: number) => {
    try {
      const result: ResponseType = await api.post("follow/user", {
        following_id,
      });

      return result.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  },
);
export const likeUserApi = createAsyncThunk(
  "like/user",
  async (likeduser_id: number, thunkAPI) => {
    try {
      const result: ResponseType = await api.post("like/user", {
        likeduser_id,
      });
      return result.data;
    } catch (error) {
      throw error;
    }
  },
);

const userActionsSlice = createSlice({
  name: "userActions",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(saveUserApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(saveUserApi.fulfilled, (state, action) => {
        state.status = "success";
      })

      .addCase(saveUserApi.rejected, (state, action) => {
        state.status = "idle";
        state.error = (action.payload as string) || "Login failed";
      })
      .addCase(likeUserApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(likeUserApi.fulfilled, (state, action) => {
        state.status = "success";
      })
      .addCase(likeUserApi.rejected, (state, action) => {
        state.status = "idle";
        state.error = (action.payload as string) || "Login failed";
      });
  },
});

export const {} = userActionsSlice.actions;

export default userActionsSlice.reducer;
