import { socket } from '../api/apiSocket';
import type { User } from '../interface/user';
import type { PayloadType, ServerData } from '../type/websocketData';
import { Observable } from '../util/observble/obserble';
import { message } from './messageState';

type Message = PayloadType['MSG_FROM_USER']['messages'];

export class UsersState {
  private _users = new Observable<User[]>([]);

  constructor() {
    socket.on('USER_ACTIVE', (data: ServerData<'USER_ACTIVE'>) => {
      this.addUsers(data.payload.users);
    });

    socket.on<'USER_INACTIVE'>('USER_INACTIVE', (data: ServerData<'USER_INACTIVE'>) => {
      this.addUsers(data.payload.users);
    });

    socket.on<'USER_EXTERNAL_LOGIN'>(
      'USER_EXTERNAL_LOGIN',
      (data: ServerData<'USER_EXTERNAL_LOGIN'>) => {
        this.chetacheta(data.payload.user);
      },
    );

    socket.on<'USER_EXTERNAL_LOGOUT'>(
      'USER_EXTERNAL_LOGOUT',
      (data: ServerData<'USER_EXTERNAL_LOGOUT'>) => {
        this.updateUserStatus(data.payload.user);
      },
    );
  }

  public get activeUsers(): User[] {
    return this._users.value.filter((user) => user.isLogined);
  }

  public get inactiveUsers(): User[] {
    return this._users.value.filter((user) => !user.isLogined);
  }

  public get users(): Observable<User[]> {
    return this._users;
  }

  public addUsers(usersToAdd: User[]): void {
    this._users.update((currentUsers) => {
      const logins = new Set(currentUsers.map((user) => user.login));
      const newUniqueUsers = usersToAdd.filter((user) => !logins.has(user.login));

      return [...currentUsers, ...newUniqueUsers];
    });
  }

  public callAuthenticatedUser(): void {
    socket.authenticatedUser();
  }

  public callUnAuthenticatedUser(): void {
    socket.unAuthenticatedUser();
  }

  public updateUserStatus(userNew: User): void {
    this._users.update((usersOld) =>
      usersOld.map((user) => (user.login === userNew.login ? userNew : user)),
    );
  }

  // public addUnreadMessage(messages: Message[]): void {
  //   messages.forEach((message) => {
  //     if (message.status.isReaded === false) {
  //       this._users.update((users) =>
  //         users.map((user) => {
  //           if (user.login === message.from) {
  //             return { ...user, unread: (user.unread || 0) + 1 };
  //           }
  //           return user;
  //         }),
  //       );
  //     }
  //   });
  // }

  public getMessageEachUser(): void {
    this.users.value.forEach((user) => {
      socket.getMessages(user.login);
    });
    message.messages.set([]);
  }

  public readMessage(login: string): void {
    this._users.update((users) =>
      users.map((user) => {
        if (user.login === login) {
          return { ...user, unread: 0 }; // ne kak inache
        }
        return user;
      }),
    );
  }

  public chetacheta(userNew: User): void {
    const user = this._users.value.find((user) => user.login === userNew.login);

    if (user) {
      this.updateUserStatus(userNew);
    } else {
      this.addUsers([userNew]);
    }
  }
}

export const users = new UsersState();
