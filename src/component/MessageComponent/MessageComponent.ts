import type { Message, PayloadType } from '../../type/websocketData';
import { BaseComponent } from '../baseComponent';
import './MessageComponent.scss';

export class MessageComponent extends BaseComponent {
  public id: number;
  constructor(messageDate: Message) {
    super({
      className: ['message'],
    });

    this.id = Number(messageDate.id);

    const author = new BaseComponent({
      tag: 'label',
      text: `from: ${messageDate.from}`,
    });

    const message = new BaseComponent({
      tag: 'label',
      text: messageDate.text,
    });

    this.append(author, message);
  }
}
