import { socket } from '../api/apiSocket';
import { Observable } from '../util/observble/obserble';

export class userState {
  public authorased: boolean = false;
  public chatWith = new Observable<string>('');
  private _userId: string = self.crypto.randomUUID();
  private _login: string = '';
  private _password: string = '';

  public get selfLogin(): string {
    return this._login;
  }

  public get userId(): string | null {
    return this._userId;
  }

  public get password(): string {
    return this._password;
  }

  public set userId(id: string) {
    this._userId = id;
  }

  public set password(password: string) {
    this._password = password;
  }

  public set selfLogin(login: string) {
    this._login = login;
  }

  public login(): void {
    socket.login();
  }
}

export const userId = new userState();
