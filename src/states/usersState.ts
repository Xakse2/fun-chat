import { socket } from '../api/apiSocket';
import type { user } from '../interface/user';
import type { payloadType } from '../other/type';
import { Observable } from '../util/observble/obserble';
import { message } from './messageState';

type Message = payloadType['MSG_FROM_USER']['messages'];

export class UsersState {
  private _users = new Observable<user[]>([]);

  public get activeUsers(): user[] {
    return this._users.value.filter((user) => user.isLogined);
  }

  public get inactiveUsers(): user[] {
    return this._users.value.filter((user) => !user.isLogined);
  }

  public get users(): Observable<user[]> {
    return this._users;
  }

  public addUsers(usersToAdd: user[]): void {
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

  public updateUserStatus(userNew: user): void {
    this._users.update((usersOld) =>
      usersOld.map((user) => (user.login === userNew.login ? userNew : user)),
    );
  }

  public addUnreadMessage(messages: Message[]): void {
    messages.forEach((message) => {
      if (message.status.isReaded === false) {
        this._users.update((users) =>
          users.map((user) => {
            if (user.login === message.from) {
              return { ...user, unread: (user.unread || 0) + 1 };
            }
            return user;
          }),
        );
      }
    });
  }

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
}

export const users = new UsersState();
