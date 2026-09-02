import { createSlice, PayloadAction } from "@reduxjs/toolkit";



interface IsOnlineState {
  onlineUsers: number[];
}

const initialState: IsOnlineState = {
  onlineUsers: [],
};

const isOnlineSlice = createSlice({
  name: "isOnline",
  initialState,
  reducers: {
    addOnlineUser: (state, action: PayloadAction<number>) => {
      const exists = state.onlineUsers.some(
        (id) => id === action.payload,
      );

      if (!exists) {
        state.onlineUsers.push(action.payload);
      }
    },

    removeOnlineUser: (state, action: PayloadAction<number>) => {
      state.onlineUsers = state.onlineUsers.filter(
        (user) => user !== action.payload,
      );
    },
  },
});

export const { addOnlineUser, removeOnlineUser } = isOnlineSlice.actions;

export default isOnlineSlice.reducer;
