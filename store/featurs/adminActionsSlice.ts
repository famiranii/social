import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { api } from "../../app/components/lib/api";
import { MapUser } from "@/types/mapUserType";

interface AdminState {
  status: string;
  error: string | null;
  mapUser: MapUser[];
}

const initialState: AdminState = {
  status: "idle",
  error: null,
  mapUser: [],
};

export const loginApi = createAsyncThunk(
  "auth/login",
  async (payload: { username: string; password: string }, thunkAPI) => {
    try {
      const data = await api.post<{
        token: string;
        error: boolean;
        message: string;
        id: number;
      }>("login", payload);

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  },
);

const adminSlice = createSlice({
  name: "admin",
  initialState,

  reducers: {
    setMapUser: (state, action: PayloadAction<MapUser>) => {
      state.mapUser = [action.payload];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {})

      .addCase(loginApi.fulfilled, (state, action) => {})

      .addCase(loginApi.rejected, (state, action) => {});
  },
});

export const { setMapUser } = adminSlice.actions;

export default adminSlice.reducer;
