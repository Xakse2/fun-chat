import type { User } from '../interface/user';

export type PayloadType = {
  USER_LOGIN: { user: User };
  USER_EXTERNAL_LOGOUT: { user: User };
  USER_EXTERNAL_LOGIN: { user: User };
  USER_ACTIVE: { users: User[] };
  USER_INACTIVE: { users: User[] };
  USER_LOGOUT: { user: User };
  MSG_SEND: {
    message: Message;
  };
  MSG_FROM_USER: {
    messages: Message[];
  };
  MSG_DELIVER: {
    message: Message;
  };
  MSG_DELETE: {
    message: Message;
  };
  MSG_EDIT: {
    message: Message;
  };
  MSG_READ: {
    message: Message;
  };
  ERROR: {
    error: string;
  };
};

export type ServerData<T extends keyof PayloadType = keyof PayloadType> = {
  id: string | null;
  type: T;
  payload: PayloadType[T];
};

export interface MessageStatus {
  isDelivered: boolean;
  isReaded: boolean;
  isEdited: boolean;
}

export interface Message {
  id: string;
  from: string;
  to: string;
  text: string;
  datetime: number;
  status: MessageStatus;
}
