import { socket } from '../api/apiSocket';
import { BaseComponent } from '../component/baseComponent';
import { ButtonComponent } from '../component/buttonComponent';
import { InputComponent } from '../component/InputComponent';
import { router } from '../router/route';
import { userId } from '../states/user';
import { Observable } from '../util/observble/obserble';

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
        socket.logout();
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
