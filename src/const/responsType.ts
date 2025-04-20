import type { ServerData } from '../type/websocketData';
import { router } from '../router/route';
import { message } from '../states/messageState';
import { userId } from '../states/user';
import { users } from '../states/usersState';

export const responseTypes = {
  USER_LOGIN: (data: ServerData<'USER_LOGIN'>): void => {
    console.log('login', data);
    userId.selfLogin = data.payload.user.login;
    router.go('/messager');
  },
  USER_ACTIVE: (data: ServerData<'USER_ACTIVE'>): void => {
    users.addUsers(data.payload.users);
  },
  USER_INACTIVE: (data: ServerData<'USER_INACTIVE'>): void => {
    users.addUsers(data.payload.users);
  },
  MSG_FROM_USER: (data: ServerData<'MSG_FROM_USER'>): void => {
    if (Array.isArray(data.payload.messages)) {
      message.routMessage(data.payload.messages);
    } else {
      message.routMessage([data.payload.messages]);
    }
  },
  MSG_SEND: (data: ServerData<'MSG_SEND'>): void => {
    message.addMessage(data.payload.message);
  },
  MSG_DELIVER: (data: ServerData<'MSG_DELIVER'>): void => {
    message.updateMessageStatus(data.payload.message);
  },
  MSG_DELETE: (data: ServerData<'MSG_DELETE'>): void => {
    message.deleteMessage(data.payload.message);
  },
  MSG_EDIT: (data: ServerData<'MSG_EDIT'>): void => {
    message.updateMessage(data.payload.message);
  },
  ERROR: (data: ServerData<'ERROR'>): void => {
    console.log('error', data.payload);
  },
  MSG_READ: (data: ServerData<'MSG_READ'>): void => {
    message.updateMessageStatus(data.payload.message);
  },
  USER_EXTERNAL_LOGIN: (data: ServerData<'USER_EXTERNAL_LOGIN'>): void => {
    users.chetacheta(data.payload.user);
  },
  USER_EXTERNAL_LOGOUT: (data: ServerData<'USER_EXTERNAL_LOGOUT'>): void => {
    users.updateUserStatus(data.payload.user);
  },
  USER_LOGOUT: (data: ServerData<'USER_LOGOUT'>): void => {
    console.log('logout', data);
  },
};
