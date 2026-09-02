import { api } from "@/app/components/lib/api";
import {
  addNewChatToChats,
  addToChatWithWbSocket,
  clearUnreadCount,
  deleteChatWithWebsocket,
  deleteMessageWithWebsocket,
  seenMessageHandler,
} from "@/store/featurs/chatSlice";
import { addOnlineUser, removeOnlineUser } from "@/store/featurs/isOnlineUserSlice";
import { useAppDispatch, useAppSelector } from "@/store/hooks/redux";
import { Client } from "@stomp/stompjs";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useId, useRef } from "react";

export default function WebSocket() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const person = useAppSelector((state) => state.userInfo.userInfo);
  const onlineUsers = useAppSelector((state) => state.onlineUsers.onlineUsers);
  const timers = useRef<Record<string, ReturnType<typeof setTimeout>>>({});
  const params = useParams();
  const id = person?.id;
  const currentChatId = params.chatId;
  const currentChatIdRef = useRef(currentChatId && +currentChatId);

  useEffect(() => {
    currentChatIdRef.current = currentChatId && +currentChatId;
  }, [currentChatId]);

  const clientRef = useRef<Client | null>(null);

  useEffect(() => {
    if (!id) return;


    const brokeL = process.env.NEXT_PUBLIC_STOMP_URL;


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
    console.log("3 websocket");

    client.onConnect = () => {
      client.subscribe("/exchange/events/user." + id, (message) => {
        const payload = JSON.parse(message.body);
        console.log("[STOMP] Received event:", payload.event, payload);

        if (payload.event === "message.created") {
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

        if (payload.event === "user.status") {
          console.log("first")
          console.log(payload.id)
          const userId = payload.id


          if (timers.current[userId]) {
            clearTimeout(timers.current[userId]);
          }

          // کاربر رو به لیست آنلاین‌ها اضافه کن
          dispatch(addOnlineUser(userId));

          // اگر تا 20 ثانیه پیام جدید نیومد
          timers.current[userId] = setTimeout(() => {
            dispatch(removeOnlineUser(userId));

            delete timers.current[userId];
          }, 20_000);
        }
        if (payload.event === "chat.created") {
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
          dispatch(
            deleteMessageWithWebsocket({
              id: payload.data.message_id,
              conv_id: payload.data.conv_id,
            }),
          );
        } else if (payload.event === "chat.deleted") {
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
