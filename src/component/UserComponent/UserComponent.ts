import { BaseComponent } from '../baseComponent';
import './UserComponent.scss';

const statusColor = {
  true: 'green', // сделать норм цвеа
  false: 'red',
};

export class UserComponent extends BaseComponent {
  constructor(user: any) {
    super({
      className: ['user'],
    });

    const statusCircle = new BaseComponent({
      className: ['status-color'],
    });
    statusCircle.element.style.backgroundColor =
      user.isLogined === true ? statusColor.true : statusColor.false;

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
