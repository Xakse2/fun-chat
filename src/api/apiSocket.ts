import type { PayloadType, ServerData } from '../type/websocketData';
import { messagingID } from '../const/messagingID';
import { session } from '../service/sessionStotrage';
import { router } from '../router/route';

export class ApiSocket {
  public socket!: WebSocket;

  constructor() {
    this.connect();
  }

  public connect(): void {
    this.socket = new WebSocket('ws://localhost:4000'); // сделать ссылку констой

    this.socket.onopen = (): void => {
      console.log('srabotal raz');
      const log = session.getDate('login');
      const pass = session.getDate('password');
      if (log && pass) {
        router.go(location.pathname);
        console.log('srabotal dwa');
        socket.login(log, pass);
      } else {
        router.go('/login');
      }
    };

    this.socket.onclose = (): void => {
      this.connect();
    };
  }

  public on<T extends keyof PayloadType>(event: T, callback: (data: ServerData<T>) => void): void {
    this.socket.addEventListener('message', (event_) => {
      const data = JSON.parse(event_.data);
      if (data.type === event) {
        callback(data);
      }
    });
  }

  public onClose(): void {
    this.socket.onclose = (): void => {
      console.log('close');
    };
  }

  public login(login: string, password: string): void {
    this.socket.send(
      JSON.stringify({
        id: messagingID,
        type: 'USER_LOGIN',
        payload: {
          user: {
            login: login,
            password: password,
          },
        },
      }),
    );
  }

  public authenticatedUser(): void {
    this.socket.send(
      JSON.stringify({
        id: messagingID,
        type: 'USER_ACTIVE',
        payload: null,
      }),
    );
  }

  public unAuthenticatedUser(): void {
    this.socket.send(
      JSON.stringify({
        id: messagingID,
        type: 'USER_INACTIVE',
        payload: null,
      }),
    );
  }

  public getMessages(login: string): void {
    this.socket.send(
      JSON.stringify({
        id: messagingID,
        type: 'MSG_FROM_USER',
        payload: {
          user: {
            login: login,
          },
        },
      }),
    );
  }

  public sendMessage(text: string, chatWith: string): void {
    this.socket.send(
      JSON.stringify({
        id: messagingID,
        type: 'MSG_SEND',
        payload: {
          message: {
            to: chatWith,
            text: text,
          },
        },
      }),
    );
  }

  public readMessage(id: string): void {
    this.socket.send(
      JSON.stringify({
        id: messagingID,
        type: 'MSG_READ',
        payload: {
          message: {
            id: id,
          },
        },
      }),
    );
  }

  public logout(login: string, password: string): void {
    this.socket.send(
      JSON.stringify({
        id: messagingID,
        type: 'USER_LOGOUT',
        payload: {
          user: {
            login: login,
            password: password,
          },
        },
      }),
    );
  }
}

export const socket = new ApiSocket();
