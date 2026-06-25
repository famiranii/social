import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import { api } from "../../app/components/lib/api";
import { User } from "@/types/user";

interface countiesState {
  userInfo: User;
  status: "idle" | "loading" | "success";
  error: string | null;
}

const initialState: countiesState = {
  userInfo: {
    id: 0,
    username: "",
    email: "",

    first_name: "",
    last_name: "",

    age: null,
    birthday: "",
    job: "",

    country: "",
    city: "",
    sex: "",
    biography: "",

    lat: "",
    lon: "",
    ip: "",

    image: "",
  },
  status: "idle",
  error: null,
};

export const getUserInfoApi = createAsyncThunk(
  "user/user-info",
  async (payload: { id: number }, thunkAPI) => {
    try {
      const res: { user: User } = await api.post("user", payload);
      return res;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "there is problem");
    }
  },
);

const userInfoSlice = createSlice({
  name: "user",
  initialState,

  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(getUserInfoApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getUserInfoApi.fulfilled, (state, action) => {
        console.log(action.payload);
        state.userInfo = action.payload.user;
      })

      .addCase(getUserInfoApi.rejected, (state, action) => {
        state.status = "idle";
        state.error = (action.payload as string) || "Login failed";
      });
  },
});

export const {} = userInfoSlice.actions;

export default userInfoSlice.reducer;
