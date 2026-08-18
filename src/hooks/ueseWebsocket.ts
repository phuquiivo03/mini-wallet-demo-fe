"use client";
import { useEffect, useRef } from "react";
import { WebSocketClient } from "@/lib/websocket/websocket.client";
const WS_URL = "ws://localhost:3000/ws";
export function useWebSocket(authToken: string | null) {
  const clientRef = useRef<WebSocketClient | null>(null);
  useEffect(() => {
    if (!authToken) {
      return;
    }
    const client = new WebSocketClient();
    clientRef.current = client;
    const url = new URL(WS_URL);
    url.searchParams.set("authToken", authToken);
    client.connect(url.toString());
    return () => {
      client.disconnect();
      clientRef.current = null;
    };
  }, [authToken]);
  return clientRef;
}
