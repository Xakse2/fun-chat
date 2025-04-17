import type { payloadType } from '../other/type';
import { BaseComponent } from './baseComponent';

export class MessageComponent extends BaseComponent {
  public id: number;
  constructor(messageDate: payloadType['MSG_FROM_USER']['messages']) {
    super({
      className: ['message-wrapper'],
    });

    this.id = Number(messageDate.id);

    const author = new BaseComponent({
      tag: 'label',
      text: messageDate.from,
    });
    author.element.textContent = messageDate.from;
    const message = new BaseComponent({
      tag: 'label',
      text: messageDate.text,
    });

    this.append(author, message);
  }
}
