// lib/websocket/websocket-client.ts

import { WS_EVENT } from "./websocket.event";
import type { WebSocketMessage } from "./websocket.types";
type MessageListener = (message: WebSocketMessage) => void;

export class WebSocketClient {
  private socket: WebSocket | null = null;
  private listeners = new Set<MessageListener>();
  connect(url: string) {
    if (this.socket?.readyState === WebSocket.OPEN) {
      return;
    }

    this.socket = new WebSocket(url);
    this.socket.onmessage = (event) => {
      console.log("🔥 SOCKET MESSAGE", event.data);
    };
    this.socket.onopen = () => {
      console.log("WebSocket connected");
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    this.socket.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(JSON.parse(event.data));
        this.listeners.forEach((listener) => {
          listener(message);
        });
      } catch (error) {
        console.error("Invalid WebSocket message", error);
      }
    };
  }

  send(message: WebSocketMessage) {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      return;
    }

    this.socket.send(JSON.stringify(message));
  }
  subscribe(listener: MessageListener) {
    this.listeners.add(listener);
    return () => {
      this.listeners.delete(listener);
    };
  }

  disconnect() {
    this.socket?.close();
    this.socket = null;
  }

  private handleMessage(message: WebSocketMessage) {
    console.log("Received:", message);
  }
}
