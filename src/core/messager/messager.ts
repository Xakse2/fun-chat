import { socket } from '../../api/apiSocket';
import { BaseComponent } from '../../component/baseComponent';
import { ButtonComponent } from '../../component/buttonComponent';
import { InputComponent } from '../../component/InputComponent/InputComponent';
import { MessageComponent } from '../../component/MessageComponent/MessageComponent';
import { UserComponent } from '../../component/UserComponent/UserComponent';
import { router } from '../../router/route';
import { message } from '../../states/messageState';
import { userId } from '../../states/user';
import { users } from '../../states/usersState';
import './messager.scss';

export class Messager extends BaseComponent {
  private count = 0;
  private userWrapper = new BaseComponent({
    className: ['user-wrapper'],
  });
  private messageWrapper = new BaseComponent({
    className: ['message-wrapper'],
  });

  private headerWrapper = new BaseComponent({
    className: ['header-wrapper'],
  });
  constructor() {
    super({
      className: ['messager'],
    });

    this.sub(
      message.messages.subscribe(() => {
        this.drawMessages();
      }),
    );

    this.sub(
      users.users.subscribe(() => {
        this.drawUsers();
      }),
    );

    this.sub(
      message.counetCool.subscribe(() => {
        console.log(message.counetCool);
      }),
    );

    const usersBlock = new BaseComponent({
      className: ['user-block'],
    });

    const messageBlock = new BaseComponent({
      className: ['message-block'],
    });

    const sendBlock = new BaseComponent({
      className: ['send-block'],
    });

    const messageInput = new InputComponent({
      placeholder: 'message',
      type: 'text',
    });

    const sendButton = new ButtonComponent({
      text: 'send',
      onClick: (): void => {
        socket.sendMessage(messageInput.element.value, userId.chatWith.value);
      },
    });

    sendBlock.append(messageInput, sendButton);
    usersBlock.append(this.userWrapper);
    messageBlock.append(this.headerWrapper, this.messageWrapper, sendBlock);
    this.append(usersBlock, messageBlock);

    const logout = new ButtonComponent({
      text: 'logout',
      onClick: (): void => {
        socket.logout(userId.selfLogin, userId.password);
        router.go('/login');
      },
    });

    this.append(logout);

    this.drawMessageHeader();
    // this.drawUsers();
    // this.drawMessages();
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
    console.log(this.count++);
    this.messageWrapper.destroyAllChildren();
    message.messages.value.forEach((message) => {
      console.log(`${message.status.isReaded}`);
      const newMessage = new MessageComponent(message);
      this.messageWrapper.append(newMessage);
    });
  }

  public drawMessageHeader(): void {
    this.headerWrapper.destroyAllChildren();
    const selfName = new BaseComponent({
      tag: 'label',
      text: `you: ${userId.selfLogin}`,
    });
    const partnerName = new BaseComponent({
      tag: 'label',
      text: `not you: ${userId.chatWith.value}`,
    });

    this.headerWrapper.append(selfName, partnerName);
  }
}
