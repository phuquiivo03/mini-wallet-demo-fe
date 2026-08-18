"use client";

import { useEffect, useRef } from "react";

export default function WebSocketClient() {
  const socketRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:3000/ws");

    socketRef.current = socket;

    socket.onopen = () => {
      console.log("WebSocket connected");

      socket.send(
        JSON.stringify({
          type: "AUTH",
          token: "your-token",
        }),
      );
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      console.log("Received:", data);
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = (event) => {
      console.log("WebSocket disconnected", event.code);
    };

    return () => {
      socket.close();
      socketRef.current = null;
    };
  }, []);

  return <div>WebSocket Client</div>;
}
