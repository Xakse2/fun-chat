import { socket } from '../api/apiSocket';
import { session } from '../service/sessionStotrage';
import { Observable } from '../util/observble/obserble';

export class userState {
  public authorased: boolean = false;
  public chatWith = new Observable<string>('');
  private _login: string = '';
  private _password: string = '';

  constructor() {
    const log = session.getDate('login');
    const pass = session.getDate('password');
    if (log && pass) {
      this._login = log;
      this._password = pass;
    }
  }

  public get selfLogin(): string {
    return this._login;
  }

  public get password(): string {
    return this._password;
  }

  public set password(password: string) {
    this._password = password;
  }

  public set selfLogin(login: string) {
    this._login = login;
  }

  public login(): void {
    socket.login(this.selfLogin, this._password);
  }
}

export const userId = new userState();
