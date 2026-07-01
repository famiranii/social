import { api } from "@/app/components/lib/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  chatInfo: Record<number, SingleCahtType[]>;
  chatPerson: ConversationItem | null;
  status: string;
}

const initialState: ChatState = {
  chatInfo: {},
  status: "",
  chatPerson: null,
};

export const getCoversationApi = createAsyncThunk(
  "chat/getConv",
  async (payload: { conv_id: number; paginate: number }, thunkAPI) => {
    try {
      const data: { data: SingleCahtType[]; error: boolean } = await api.post(
        "conversation",
        payload,
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  },
);

const chatSlice = createSlice({
  name: "ui",
  initialState,
  reducers: {
    setChatPerson: (state, action: PayloadAction<ConversationItem | null>) => {
      state.chatPerson = action.payload;
    },
    // clearChatInfo: (state) => {
    //   state.chatInfo = null;
    // },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoversationApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCoversationApi.fulfilled, (state, action) => {
        const { conv_id, paginate } = action.meta.arg;

        if (paginate === 0) {
          state.chatInfo[conv_id] = action.payload.data.reverse();
        } else {
          state.chatInfo[conv_id] = [
            ...action.payload.data.reverse() ,
            ...(state.chatInfo[conv_id] ?? []),
          ];
        }
      })

      .addCase(getCoversationApi.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { setChatPerson } = chatSlice.actions;
export default chatSlice.reducer;
