import { api } from "@/app/components/lib/api";
import {
  addNewChatToChats,
  addToChatWithWbSocket,
  clearUnreadCount,
  deleteChatWithWebsocket,
  deleteMessageWithWebsocket,
  seenMessageHandler,
} from "@/store/featurs/chatSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { Client } from "@stomp/stompjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

export default function WebSocket() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const person = useAppSelector((state) => state.userInfo.userInfo);
  const params = useParams();
  const id = person.id;
  const currentChatId = params.chatId;
  const currentChatIdRef = useRef(currentChatId && +currentChatId);

  useEffect(() => {
    currentChatIdRef.current = currentChatId && +currentChatId;
  }, [currentChatId]);

  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    const client = new Client({
      brokerURL: "ws://195.181.41.139:15674/ws",

      connectHeaders: {
        login: "websocket",
        passcode: "123456",
      },

      reconnectDelay: 5000,

      debug: console.log,
    });
    client.onStompError = (frame) => {
      console.error("Broker error:", frame.headers["message"]);
      console.error(frame.body);
    };

    client.onWebSocketError = (event) => {
      console.error("WebSocket error:", event);
    };

    client.onWebSocketClose = (event) => {
    };
    client.onConnect = () => {
      client.subscribe("/exchange/events/user." + id, (message) => {
        const payload = JSON.parse(message.body);

        if (payload.event === "message.created") {
          const data = JSON.parse(message.body).data;
          dispatch(addToChatWithWbSocket(data));
          if (
            currentChatIdRef.current &&
            +currentChatIdRef.current === data.conversation_id
          ) {
            api.post("read/messages", { conv_id: data.conversation_id });
            dispatch(clearUnreadCount(data.conversation_id));
          }
        }
        if (payload.event === "chat.created") {
          const data = JSON.parse(message.body).data;
          dispatch(addNewChatToChats(data));
        } else if (payload.event === "message.read") {
          const seen_at = JSON.parse(message.body).data.seen_at;
          const id = JSON.parse(message.body).data.conv_id;
          dispatch(seenMessageHandler({ id, seenAt: seen_at }));
        } else if (payload.event === "message.deleted") {
          const { message_id, conv_id } = JSON.parse(message.body).data;
          dispatch(deleteMessageWithWebsocket({ id: message_id, conv_id }));
        } else if (payload.event === "chat.deleted") {
          const { conv_id } = JSON.parse(message.body).data;
          dispatch(deleteChatWithWebsocket(conv_id));
          if (currentChatIdRef.current === conv_id) {
            router.push("/chat");
          }
        }
      });
    };

    client.activate();

    clientRef.current = client;

    return () => {
      client.deactivate();
    };
  }, [id]);
  return <></>;
}
