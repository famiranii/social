import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { api } from "../../app/components/lib/api";
import { ResponseType } from "@/types/responseType";
import { likeUserApi, saveUserApi } from "../featurs/userActionsSlice";
import { User } from "@/types/user";
import { UserImage } from "@/types/userImage";

interface UsersState {
  users: User[];
  singleUser: User;
  status: string;
  error: string | null;
  images: UserImage[];
  selectedCountry: string;

  // pagination
  page: number;
  hasMore: boolean;
}

const initialState: UsersState = {
  selectedCountry: "All",
  users: [],
  status: "loading",
  error: null,

  // pagination
  page: 0,
  hasMore: true,

  singleUser: {
    id: 0,
    username: "",
    email: "",

    first_name: "",
    last_name: "",

    age: 0,
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
    hobbies: [],
    is_liked: false,
    is_saved: false,
    like_count: 0,
  },

  images: [],
};

export const getUsersApi = createAsyncThunk(
  "users/users",
  async ({ page }: { page: number }, thunkAPI) => {
    try {
      const result: ResponseType = await api.get(`users/${page}`);

      return {
        users: result.data,
        page,
      };
    } catch (error) {
      throw error;
    }
  },
);

interface FilterUsersPayload {
  country: string;
  is_saved: boolean;
  page: number;
}

export const getFilteredUsersApi = createAsyncThunk(
  "users/filtered",
  async ({ country, is_saved, page }: FilterUsersPayload) => {
    try {
      const result: ResponseType = await api.post("filter/users", {
        country,
        follows: is_saved,
        page,
      });

      return {
        users: result.data,
        page,
      };
    } catch (error) {
      throw error;
    }
  },
);

export const getSingleUserInfoApi = createAsyncThunk(
  "users/single-user",
  async (payload: { id?: number; username?: string }) => {
    try {
      const res: { user: User; message: string } = await api.post(
        "user",
        payload,
      );

      const images: { data: [] } = await api.post("images", {
        user_id: payload.id,
        username: payload.username,
      });

      return { ...res, images };
    } catch (err: any) {
      throw err;
    }
  },
);

const usersSlice = createSlice({
  name: "users",
  initialState,

  reducers: {
    handleRemoveImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter((img) => img.image !== action.payload);
    },
    setSelectedCountry: (state, action: PayloadAction<string>) => {
      state.selectedCountry = action.payload;
    },

    handleAddImage: (state, action: PayloadAction<string>) => {
      state.images = state.images.filter((img) => img.image !== action.payload);

      state.images = [
        {
          id: 0,
          user_id: 0,
          image: action.payload,
          profile: 2,
        },
        ...state.images,
      ];
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(getUsersApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getUsersApi.fulfilled, (state, action) => {
        const { users, page } = action.payload;

        // صفحه اول
        if (page === 0) {
          state.users = users;
        }

        // صفحات بعدی
        else {
          state.users.push(...users);
        }

        state.page = page;

        // اگر صفحه خالی بود یعنی صفحه بعدی نداریم
        state.hasMore = users.length > 0;

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
        const { users, page } = action.payload;

        if (page === 0) {
          state.users = users;
        } else {
          state.users.push(...users);
        }

        state.page = page;

        state.hasMore = users.length > 0;

        state.status = "success";
      })

      .addCase(getFilteredUsersApi.rejected, (state) => {
        state.status = "idle";
      })

      .addCase(getSingleUserInfoApi.pending, (state) => {
        state.status = "loading";
        state.error = null;
      })

      .addCase(getSingleUserInfoApi.fulfilled, (state, action) => {
        if (action.payload.message === "not found") {
          state.status = "user-not-found";
          return;
        }

        state.images = action.payload.images.data;
        state.singleUser = action.payload.user;
        state.status = "success";
      })

      .addCase(getSingleUserInfoApi.rejected, (state) => {
        state.status = "idle";
      })

      .addCase(likeUserApi.fulfilled, (state, action) => {
        const user = state.users.find((u) => u.id === action.meta.arg);

        if (user) {
          if (user.is_liked) {
            user.like_count -= 1;
          } else {
            user.like_count += 1;
          }

          user.is_liked = !user.is_liked;
        }

        if (state.singleUser.id === action.meta.arg) {
          if (state.singleUser.is_liked) {
            state.singleUser.like_count -= 1;
          } else {
            state.singleUser.like_count += 1;
          }

          state.singleUser.is_liked = !state.singleUser.is_liked;
        }
      })

      .addCase(saveUserApi.fulfilled, (state, action) => {
        const user = state.users.find((u) => u.id === action.meta.arg);

        if (user) {
          user.is_saved = !user.is_saved;
        }
      });
  },
});

export const { handleRemoveImage, handleAddImage, setSelectedCountry } =
  usersSlice.actions;

export default usersSlice.reducer;
