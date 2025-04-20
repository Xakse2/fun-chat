// import { User } from '../interface/user';
// import { Message } from '../type/websocketData';
// import { Observable } from '../util/observble/obserble';

// export class UserConversation {
//   public readonly unreadedMessages = new Observable(0);
//   public readonly messages = new Observable<Map<string, Message>>([]);
//   public readonly isViewed = new Observable(false);

//   constructor(private readonly user: User) {}

//   public addMessage(message: Message): void {
//     if (!message.status.isReaded) {
//       this.unreadedMessages.update((count) => count + 1);
//     }
//     this.messages.update((messages) => [...messages, message]);
//   }
// }
