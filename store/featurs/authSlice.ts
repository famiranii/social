import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { api } from "../../app/components/lib/api";

interface AuthState {
  token: string;
  status:
    | "idle"
    | "loading"
    | "success"
    | "failed"
    | "notMatch"
    | "successSignUP"
    | "invalid email"
    | "invalid username"
    | "Something went wrong"
    | "re password not match";
  error: string | null;
  userId: number | null;
}

const initialState: AuthState = {
  token: "",
  status: "idle",
  error: null,
  userId: null,
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
export const signupApi = createAsyncThunk(
  "auth/signup",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const data = await api.post<{
        token: string;
        message: string;
        error: boolean;
      }>("register", payload);

      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,

  reducers: {
    setToken: (state, action: PayloadAction<string>) => {
      state.token = action.payload;
      state.status = "success";

      if (typeof window !== "undefined") {
        localStorage.setItem("token", action.payload);
      }
    },

    logout: (state) => {
      state.token = "";
      state.status = "idle";
      state.error = null;

      if (typeof window !== "undefined") {
        localStorage.removeItem("token");
      }
    },

    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload as any;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(loginApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(loginApi.fulfilled, (state, action) => {
        if (action.payload.error && action.payload.message === "notMatch") {
          state.status = action.payload.message;
          return;
        }
        if (action.payload.error) {
          state.status === action.payload.message;
          return;
        }
        state.status = "success";
        state.token = action.payload.token;
        state.userId = action.payload.id || 2;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
          localStorage.setItem("id", action.payload.id.toString());
        }
      })

      .addCase(loginApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Login failed";
      })
      .addCase(signupApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(signupApi.fulfilled, (state, action) => {
        switch (action.payload.message) {
          case "invalid email":
            state.status = "invalid email";
            break;

          case "invalid username":
            state.status = "invalid username";
            break;
          case "re password not match":
            state.status = "re password not match";
            break;

          default:
            state.error = "Something went wrong";
            break;
        }
        if (action.payload.error === false) {
          state.status = "successSignUP";
          state.token = action.payload.token;
        }

        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
        }
      })

      .addCase(signupApi.rejected, (state, action) => {
        state.status = "failed";
        state.error = (action.payload as string) || "Login failed";
      });
  },
});

export const { logout, setStatus } = authSlice.actions;

export default authSlice.reducer;
