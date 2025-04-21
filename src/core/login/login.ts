import { socket } from '../../api/apiSocket';
import { BaseComponent } from '../../component/baseComponent';
import { ButtonComponent } from '../../component/buttonComponent';
import { InputComponent } from '../../component/InputComponent/InputComponent';
import type { ServerData } from '../../type/websocketData';
import { router } from '../../router/route';
import { userId } from '../../states/user';
import { session } from '../../service/sessionStotrage';
import { users } from '../../states/usersState';
import { message } from '../../states/messageState';

export class Login extends BaseComponent {
  private validMessage;
  private validator: {
    login: boolean;
    password: boolean;
  } = {
    login: false,
    password: false,
  };
  constructor() {
    super({
      className: ['login-wrapper'],
    });

    socket.on<'USER_LOGIN'>('USER_LOGIN', (data: ServerData<'USER_LOGIN'>) => {
      session.setDate('login', userId.selfLogin);
      session.setDate('password', userId.password);
      router.go('/messager');
    });

    const loginButton = new ButtonComponent({
      text: 'login',
      onClick: (): void => {
        userId.password = passwordInput.element.value;
        userId.selfLogin = loginInput.element.value;
        this.authorased();
      },
    });

    const loginInput = new InputComponent({
      placeholder: 'login',
    });

    const passwordInput = new InputComponent({
      placeholder: 'password',
    });

    passwordInput.element.addEventListener('input', () => {
      this.passwordValidator(passwordInput);
    });

    loginInput.element.addEventListener('input', () => {
      this.loginValidator(loginInput);
    });

    this.validMessage = new BaseComponent({
      tag: 'label',
    });

    this.append(loginInput, passwordInput, this.validMessage, loginButton);

    const logOutButton = new ButtonComponent({
      onClick: (): void => {
        socket.logout(userId.selfLogin, userId.password);
      },
    });

    this.append(logOutButton);
  }

  public authorased(): void {
    if (this.validator.login === true && this.validator.password === true) {
      userId.login();
    }
  }

  public loginValidator(login: InputComponent): void {
    if (login.element.value.length < 3) {
      this.validator.login = false;
      this.validMessage.element.textContent = 'error';
    } else {
      this.validMessage.element.textContent = 'correct';
      this.validator.login = true;
    }
  }

  public passwordValidator(password: InputComponent): void {
    if (password.element.value.length < 3) {
      this.validator.password = false;
      this.validMessage.element.textContent = 'error';
    } else {
      this.validMessage.element.textContent = 'correct';
      this.validator.password = true;
    }
  }
}
