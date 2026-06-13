import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { api } from "../../app/components/lib/api";

interface AuthState {
  token: string;
  status: "idle" | "loading" | "success" | "failed";
  error: string | null;
}

const initialState: AuthState = {
  token: "",
  status: "idle",
  error: null,
};

export const loginApi = createAsyncThunk(
  "auth/login",
  async (payload: { email: string; password: string }, thunkAPI) => {
    try {
      const data = await api.post<{ token: string }>("/login", payload);

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
      const data = await api.post<{ token: string }>("/sign-up", payload);

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
        state.status = "success";
        state.token = action.payload.token;

        if (typeof window !== "undefined") {
          localStorage.setItem("token", action.payload.token);
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
        state.status = "success";
        state.token = action.payload.token;

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
