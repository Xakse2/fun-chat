import { socket } from '../api/apiSocket';
import { BaseComponent } from '../component/baseComponent';
import { ButtonComponent } from '../component/buttonComponent';
import { InputComponent } from '../component/InputComponent';
import { MessageComponent } from '../component/MessageComponent';
import { UserComponent } from '../component/UserComponent';
import { message } from '../states/messageState';
import { userId, userState } from '../states/user';
import { users } from '../states/usersState';

export class Messager extends BaseComponent {
  private userWrapper = new BaseComponent({
    className: ['user-wrapper'],
  });
  private messageWrapper = new BaseComponent({
    className: ['message-wrapper'],
  });
  constructor() {
    super({
      className: ['messager'],
    });

    users.users.subscribe(() => {
      this.drawUsers();
    });

    message.messages.subscribe(() => {
      this.drawMessages();
    });

    const messageInput = new InputComponent({
      placeholder: 'message',
      type: 'text',
    });

    const sendButton = new ButtonComponent({
      text: 'send',
      onClick: (): void => {
        socket.sendMessage(messageInput.element.value);
      },
    });
    this.append(this.userWrapper, this.messageWrapper, messageInput, sendButton);

    users.callAuthenticatedUser();
    users.callUnAuthenticatedUser();
  }

  public drawUsers(): void {
    this.userWrapper.destroyAllChildren();
    users.users.value.forEach((user) => {
      if (user.login === userId.selfLogin) {
        return;
      }
      const userComponent = new UserComponent(user);
      userComponent.element.addEventListener('click', () => {
        userId.chatWith.set(user.login);
        message.getMessage(user.login);
        users.readMessage(user.login);
      });
      this.userWrapper.append(userComponent);
    });
  }

  public drawMessages(): void {
    this.messageWrapper.destroyAllChildren();
    message.messages.value.forEach((message) => {
      const newMessage = new MessageComponent(message);
      this.messageWrapper.append(newMessage);
    });
  }
}
