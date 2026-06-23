import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { api } from "../../app/components/lib/api";
import { ResponseType } from "@/types/responseType";

interface countiesState {
  countries: [];
  status: "idle" | "loading" | "success";
  error: string | null;
}

const initialState: countiesState = {
  countries: [],
  status: "idle",
  error: null,
};

export const getCountriesApi = createAsyncThunk(
  "countires/countires",
  async (_, thunkAPI) => {
    try {
      const res: ResponseType = await api.get("countries");
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "there is problem");
    }
  },
);

const countriesSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getCountriesApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getCountriesApi.fulfilled, (state, action) => {
        state.countries = action.payload;
      })

      .addCase(getCountriesApi.rejected, (state, action) => {
        state.status = "idle";
        state.error = (action.payload as string) || "Login failed";
      });
  },
});

export const {} = countriesSlice.actions;

export default countriesSlice.reducer;
