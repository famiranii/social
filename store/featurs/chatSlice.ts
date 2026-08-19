import { api } from "@/app/components/lib/api";
import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ChatState {
  chatInfo: Record<number, SingleCahtType[]>;
  chatPerson: ConversationItem | null;
  status: string;
  chat: ConversationItem[];
}

const initialState: ChatState = {
  chatInfo: {},
  status: "",
  chatPerson: null,
  chat: [],
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
export const getConversationsApi = createAsyncThunk(
  "chat/getConvs",
  async (_, thunkAPI) => {
    try {
      const data: { data: ConversationItem[]; error: boolean } =
        await api.get("conversations");
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
  },
);
export const deleteChatApi = createAsyncThunk(
  "chat/delete",
  async (conv_id: number, thunkAPI) => {
    try {
      const data: { data: ConversationItem[]; error: boolean } = await api.post(
        "delete/chat",
        { conv_id },
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Can not delete");
    }
  },
);

export const deleteMessageApi = createAsyncThunk(
  "chat/delete-message",
  async ({ conv_id, id }: { conv_id: number; id: number }, thunkAPI) => {
    try {
      const data: { data: ConversationItem[]; error: boolean } = await api.post(
        "delete/message",
        { message_id: id, conv_id },
      );
      return data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.message || "Can not delete");
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
    addToChatWithWbSocket: (state, action: PayloadAction<SingleCahtType>) => {
      const conversationId = action.payload.conversation_id;

      if (!state.chatInfo[conversationId]) {
        state.chatInfo[conversationId] = [];
      }

      state.chatInfo[conversationId].push(action.payload);
      const chat = state.chat.find(
        (chat) => chat.last_message.conversation_id === conversationId,
      );

      if (chat) {
        chat.unreadCount += 1;
        chat.last_message.body = action.payload.body;
        chat.last_message.created_at = action.payload.created_at;
      }
    },
    addNewChatToChats: (state, action: PayloadAction<ConversationItem>) => {
      state.chat.unshift(action.payload);
    },
    addnewMessageToMessage: (state, action: PayloadAction<SingleCahtType>) => {
      state.chatInfo[action.payload.conversation_id].push(action.payload);
    },
    deleteChatWithWebsocket: (state, action: PayloadAction<number>) => {
     state.chat =  state.chat.filter(
        (chat) => chat.last_message.conversation_id !== action.payload,
      );
    },
    deleteMessageWithWebsocket: (
      state,
      action: PayloadAction<{ conv_id: number; id: number }>,
    ) => {
      const { conv_id, id } = action.payload;
      if (state.chatInfo[conv_id]) {
        state.chatInfo[conv_id] = state.chatInfo[conv_id].filter(
          (message) => message.id !== id,
        );
      }
    },
    clearUnreadCount: (state, action: PayloadAction<number>) => {
      const chat = state.chat.find(
        (chat) => chat.last_message.conversation_id === action.payload,
      );

      if (chat) {
        chat.unreadCount = 0;
      }
    },
    seenMessageHandler: (
      state,
      action: PayloadAction<{
        id: number;
        seenAt: string | null;
      }>,
    ) => {
      const { id, seenAt } = action.payload;
      state.chatInfo[id]
        .filter((message) => !message.seen_at)
        .forEach((message) => {
          message.seen_at = seenAt;
        });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCoversationApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCoversationApi.fulfilled, (state, action) => {
        const { conv_id, paginate } = action.meta.arg;
        if (action.payload.data.length === 0) {
          state.status = "endOfMessages";
        }

        if (paginate === 0) {
          state.chatInfo[conv_id] = action.payload.data.reverse();
        } else {
          state.chatInfo[conv_id] = [
            ...action.payload.data.reverse(),
            ...(state.chatInfo[conv_id] ?? []),
          ];
        }
      })

      .addCase(getCoversationApi.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(getConversationsApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getConversationsApi.fulfilled, (state, action) => {
        state.chat = action.payload.data;
      })

      .addCase(getConversationsApi.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteChatApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteChatApi.fulfilled, (state, action) => {
        state.chat = state.chat.filter(
          (chat) => chat.last_message.conversation_id !== action.meta.arg,
        );
      })

      .addCase(deleteChatApi.rejected, (state, action) => {
        state.status = "failed";
      })
      .addCase(deleteMessageApi.pending, (state) => {
        state.status = "loading";
      })
      .addCase(deleteMessageApi.fulfilled, (state, action) => {
        const { conv_id, id } = action.meta.arg;
        if (state.chatInfo[conv_id]) {
          state.chatInfo[conv_id] = state.chatInfo[conv_id].filter(
            (message) => message.id !== id,
          );
        }
      })

      .addCase(deleteMessageApi.rejected, (state, action) => {
        state.status = "failed";
      });
  },
});

export const {
  setChatPerson,
  addToChatWithWbSocket,
  addNewChatToChats,
  clearUnreadCount,
  seenMessageHandler,
  addnewMessageToMessage,
  deleteChatWithWebsocket,
  deleteMessageWithWebsocket
} = chatSlice.actions;
export default chatSlice.reducer;
