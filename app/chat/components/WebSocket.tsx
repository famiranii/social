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
  const id = person?.id;
  const currentChatId = params.chatId;
  const currentChatIdRef = useRef(currentChatId && +currentChatId);

  useEffect(() => {
    currentChatIdRef.current = currentChatId && +currentChatId;
  }, [currentChatId]);

  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    console.log("run websocket");

    if (!id) return;

    console.log("run websocket after id");

    const brokeL = process.env.NEXT_PUBLIC_STOMP_URL;

    console.log(brokeL);

    const client = new Client({
      brokerURL: process.env.NEXT_PUBLIC_STOMP_URL,
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

    client.onStompError = (frame) => {
      console.error("[STOMP] Broker error:", frame.headers["message"]);
      console.error("[STOMP] Body:", frame.body);
    };

    client.onWebSocketClose = (event) => {
      console.warn("[WS] WebSocket closed:", event.code, event.reason);
    };
    console.log("3 websocket")

    client.onConnect = () => {
      console.log("[STOMP] Connected successfully");
      client.subscribe("/exchange/events/user." + id, (message) => {
        const payload = JSON.parse(message.body);
        console.log("[STOMP] Received event:", payload.event, payload);

        if (payload.event === "message.created") {
          console.log("[STOMP] message.created:", payload.data);
          const data = payload.data;
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
          console.log("[STOMP] chat.created:", payload.data);
          dispatch(addNewChatToChats(payload.data));
        } else if (payload.event === "message.read") {
          console.log("[STOMP] message.read:", payload.data);
          dispatch(
            seenMessageHandler({
              id: payload.data.conv_id,
              seenAt: payload.data.seen_at,
            }),
          );
        } else if (payload.event === "message.deleted") {
          console.log("[STOMP] message.deleted:", payload.data);
          dispatch(
            deleteMessageWithWebsocket({
              id: payload.data.message_id,
              conv_id: payload.data.conv_id,
            }),
          );
        } else if (payload.event === "chat.deleted") {
          console.log("[STOMP] chat.deleted:", payload.data);
          dispatch(deleteChatWithWebsocket(payload.data.conv_id));
          if (currentChatIdRef.current === payload.data.conv_id) {
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
