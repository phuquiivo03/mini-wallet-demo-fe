export interface WebSocketMessage<T = unknown> {
  event: string;
  data: T;
}
