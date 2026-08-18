"use client";
import { useWebSocket } from "@/hooks/ueseWebsocket";
import { WS_EVENT } from "@/lib/websocket/websocket.event";
import { WebSocketMessage } from "@/lib/websocket/websocket.types";
import { useAppSelector } from "@/store/hook";
import { useEffect, useState } from "react";

type Notificatinon = {
  title: string;
  description: string;
};
type Props = {
  className?: string;
};
function Notification(props: Props) {
  const [notify, setNotify] = useState<Notificatinon | undefined>(undefined);
  const [mount, setMount] = useState<boolean>(false);
  const { authToken } = useAppSelector((state) => state.auth);
  const ws = useWebSocket(authToken);
  useEffect(() => {
    const client = ws.current;
    if (!client) return;
    const unsub = client.subscribe((message: WebSocketMessage) => {
      if (message.event == WS_EVENT.SEND_NOTIFICATION) {
        setNotify({
          title: (message.data as Notificatinon).title,
          description: (message.data as Notificatinon).description,
        });
      }
    });
    return unsub;
  }, []);

  useEffect(() => {
    if (!notify) return;
    setMount(true);
    const mountTimeOut = setTimeout(() => {
      setMount(false);
    }, 3700);
    const job = setTimeout(() => {
      setNotify(undefined);
      setMount(false);
    }, 4000);
    return () => {
      clearTimeout(job);
      clearTimeout(mountTimeOut);
    };
  }, [notify]);
  return notify ? (
    <div
      className={`${props.className} w-full rounded  -[8px] shadow-2xl bg-secondary px-3 py-2 flex flex-col gap-1 transition-all duration-300 ease-in  ${mount ? "translate-x-[0] opacity-100" : "translate-x-[-100px]   opacity-50"}`}
    >
      <span className="text-[13px] font-semibold text-foreground">
        {notify.title}
      </span>
      <span className="text-[10px] text-foreground">{notify.description}</span>
    </div>
  ) : (
    <></>
  );
}

export default Notification;
