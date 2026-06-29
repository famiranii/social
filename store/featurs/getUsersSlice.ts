import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../../app/components/lib/api";
import { ResponseType } from "@/types/responseType";

interface UsersState {
  users: [];
  status: "idle" | "loading" | "success";
  error: string | null;
}

const initialState: UsersState = {
  users: [],
  status: "idle",
  error: null,
};

export const getUsersApi = createAsyncThunk(
  "users/users",
  async (_, thunkAPI) => {
    try {
      const result: ResponseType = await api.get("users");
      return result.data;
    } catch (error) {
      console.error(error);
    }
  },
);
export const getFilteredUsersApi = createAsyncThunk(
  "users/filtered",
  async (country: string, thunkAPI) => {
    try {
      const result: ResponseType = await api.post("filter/users", { country });
      return result.data;
    } catch (error) {
      console.error(error);
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUsersApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getUsersApi.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "success";
      })

      .addCase(getUsersApi.rejected, (state, action) => {
        state.status = "idle";
        state.error = (action.payload as string) || "Login failed";
      })
      .addCase(getFilteredUsersApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })
      .addCase(getFilteredUsersApi.fulfilled, (state, action) => {
        state.users = action.payload;
        state.status = "success";
      })
      .addCase(getFilteredUsersApi.rejected, (state, action) => {
        state.status = "idle";
        state.error = (action.payload as string) || "Login failed";
      });
  },
});

export const {} = usersSlice.actions;

export default usersSlice.reducer;
