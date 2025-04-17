import { socket } from '../api/apiSocket';
import type { payloadType } from '../other/type';
import { Observable } from '../util/observble/obserble';
import { userId } from './user';
import { users } from './usersState';

type Message = payloadType['MSG_FROM_USER']['messages'];

export class MessageState {
  private _messages = new Observable<Message[]>([]);

  public get messages(): Observable<Message[]> {
    return this._messages;
  }

  public set messages(messages: Message[]) {
    this._messages.set(messages);
  }

  public routMessage(data: Message[]): void {
    if (data.length === 0) {
      this._messages.set([]);
      return;
    }
    if (data[0].from === userId.chatWith.value || data[0].from === userId.selfLogin) {
      this._messages.set(data);
    } else {
      users.addUnreadMessage(data);
    }
  }

  public addMessage(message: Message): void {
    if (message.from != userId.chatWith.value && message.to != userId.chatWith.value) {
      users.addUnreadMessage([message]);
      return;
    }
    this._messages.update((value) => [...value, message]);
  }

  public updateMessage(data: payloadType['MSG_EDIT']['message']): void {
    this._messages.update((messages) =>
      messages.map((message) => {
        if (message.id === data.id) {
          return {
            ...message,
            text: data.text,
            status: { ...message.status, ...data.status },
          };
        }
        return message;
      }),
    );
  }

  public updateMessageStatus(data: payloadType['MSG_DELIVER']['message']): void {
    this._messages.update((messages) =>
      messages.map((message) => {
        if (message.id === data.id) {
          return {
            ...message,
            status: { ...message.status, ...data.status },
          };
        }
        return message;
      }),
    );
  }

  public deleteMessage(data: payloadType['MSG_DELETE']['message']): void {
    this._messages.update((messages) => messages.filter((message) => message.id != data.id));
  }

  public getMessage(login: string): void {
    socket.getMessages(login);
  }
}

export const message = new MessageState();
