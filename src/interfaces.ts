export interface Message {
  postedAt: Date;
  action: string;
}

export interface BroadcastOptions {
  messageText?: string;
  required?: boolean;
}

export interface IStateMessage<T> {
  value: T;
  key: string;
}
