import type { ServerMessage } from '../other/type';
import { router } from '../router/route';
import { message } from '../states/messageState';
import { userId } from '../states/user';
import { users } from '../states/usersState';

export class ApiSocket {
  public socket: WebSocket;
  constructor() {
    this.socket = new WebSocket('ws://localhost:4000');

    const responseTypes = {
      USER_LOGIN: (data: ServerMessage<'USER_LOGIN'>): void => {
        console.log('login', data);
        userId.selfLogin = data.payload.user.login;
        router.go('/messager');
      },
      USER_ACTIVE: (data: ServerMessage<'USER_ACTIVE'>): void => {
        users.addUsers(data.payload.users);
      },
      USER_INACTIVE: (data: ServerMessage<'USER_INACTIVE'>): void => {
        users.addUsers(data.payload.users);
      },
      MSG_FROM_USER: (data: ServerMessage<'MSG_FROM_USER'>): void => {
        if (Array.isArray(data.payload.messages)) {
          message.routMessage(data.payload.messages);
        } else {
          message.routMessage([data.payload.messages]);
        }
      },
      MSG_SEND: (data: ServerMessage<'MSG_SEND'>): void => {
        message.addMessage(data.payload.message);
      },
      MSG_DELIVER: (data: ServerMessage<'MSG_DELIVER'>): void => {
        message.updateMessageStatus(data.payload.message);
      },
      MSG_DELETE: (data: ServerMessage<'MSG_DELETE'>): void => {
        message.deleteMessage(data.payload.message);
      },
      MSG_EDIT: (data: ServerMessage<'MSG_EDIT'>): void => {
        message.updateMessage(data.payload.message);
      },
      ERROR: (data: ServerMessage<'ERROR'>): void => {
        console.log('error', data.payload);
      },
      MSG_READ: (data: ServerMessage<'MSG_READ'>): void => {
        message.updateMessageStatus(data.payload.message);
      },
      USER_EXTERNAL_LOGIN: (data: ServerMessage<'USER_EXTERNAL_LOGIN'>): void => {
        users.addUsers([data.payload.user]);
      },
      USER_EXTERNAL_LOGOUT: (data: ServerMessage<'USER_EXTERNAL_LOGOUT'>): void => {
        users.addUsers([data.payload.user]);
      },
      USER_LOGOUT: (data: ServerMessage<'USER_LOGOUT'>): void => {
        console.log('logout', data);
      },
    };

    this.socket.onopen = (): void => {
      console.log('open');
    };
    this.socket.onmessage = (event): void => {
      const data: ServerMessage = JSON.parse(event.data);

      const call = responseTypes[data.type];
      // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
      call(data as any);
    };
  }

  public onClose(): void {
    this.socket.onclose = (): void => {
      console.log('close');
    };
  }

  public login(): void {
    this.socket.send(
      JSON.stringify({
        id: userId.userId,
        type: 'USER_LOGIN',
        payload: {
          user: {
            login: userId.selfLogin,
            password: userId.password,
          },
        },
      }),
    );
  }

  public authenticatedUser(): void {
    this.socket.send(
      JSON.stringify({
        id: userId.userId,
        type: 'USER_ACTIVE',
        payload: null,
      }),
    );
  }

  public unAuthenticatedUser(): void {
    this.socket.send(
      JSON.stringify({
        id: userId.userId,
        type: 'USER_INACTIVE',
        payload: null,
      }),
    );
  }

  public getMessages(login: string): void {
    this.socket.send(
      JSON.stringify({
        id: userId.userId,
        type: 'MSG_FROM_USER',
        payload: {
          user: {
            login: login,
          },
        },
      }),
    );
  }

  public sendMessage(text: string): void {
    this.socket.send(
      JSON.stringify({
        id: userId.userId,
        type: 'MSG_SEND',
        payload: {
          message: {
            to: userId.chatWith.value,
            text: text,
          },
        },
      }),
    );
  }

  public readMessage(id: string): void {
    this.socket.send(
      JSON.stringify({
        id: userId.userId,
        type: 'MSG_READ',
        payload: {
          message: {
            id: id,
          },
        },
      }),
    );
  }

  public logout(): void {
    this.socket.send(
      JSON.stringify({
        id: userId.userId,
        type: 'USER_LOGOUT',
        payload: {
          user: {
            login: userId.selfLogin,
            password: userId.password,
          },
        },
      }),
    );
  }
}

export const socket = new ApiSocket();
