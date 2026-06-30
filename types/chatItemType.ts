interface Conversation {
  id: number;
  username: string;
  email: string;
  image: string | null;
}

interface LastMessage {
  conversation_id: number;
  sender_id: number;
  body: string;
  created_at: string;
  seen_at: string | null;
}

interface ConversationItem {
  conversation: Conversation;
  last_message: LastMessage;
  unreadCount: number;
}

interface SingleCahtType {
  body: string;
  conversation_id: number;
  created_at: string;
  seen_at: null | string;
  sender_id: number;
}
