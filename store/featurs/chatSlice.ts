import { api } from "@/app/components/lib/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  chatInfo: SingleCahtType[] | null;
  chatPerson: ConversationItem | null;
  status: string;
}

const initialState: ChatState = {
  chatInfo: null,
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
    setChatPerson: (state, action: PayloadAction<ConversationItem>) => {
      state.chatPerson = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoversationApi.pending, (state) => {
        state.status = "loading";
      })

      .addCase(getCoversationApi.fulfilled, (state, action) => {
        state.chatInfo = action.payload.data;
      })

      .addCase(getCoversationApi.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const { setChatPerson } = chatSlice.actions;
export default chatSlice.reducer;
