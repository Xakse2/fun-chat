import { BaseComponent } from './baseComponent';

const statusColor = {
  true: 'green', // сделать норм цвеа
  false: 'red',
};

export class UserComponent extends BaseComponent {
  constructor(user: any) {
    super({
      className: ['user-wrapper'],
    });

    const statusCircle = new BaseComponent({});
    statusCircle.element.style.backgroundColor = 'black';

    const userName = new BaseComponent({
      tag: 'label',
    });

    userName.element.textContent = user.login;
    const newMessageCount = new BaseComponent({
      tag: 'label',
    });

    if (user.unread) {
      newMessageCount.element.textContent = user.unread;
    }

    this.append(statusCircle, userName, newMessageCount);
  }
}
