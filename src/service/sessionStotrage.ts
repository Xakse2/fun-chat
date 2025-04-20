import { prefix } from '../const/prefix';

export class SessionStorage {
  private readonly prefix: string = prefix;

  public setDate(key: string, value: string): void {
    sessionStorage.setItem(this.keyGenerate(key), value);
  }

  public getDate(key: string): string | null {
    const date = sessionStorage.getItem(this.keyGenerate(key));
    return date;
  }

  public keyGenerate(key: string): string {
    return this.prefix + key;
  }

  public clear(): void {
    sessionStorage.clear();
  }

  public removeDate(key: string): void {
    sessionStorage.removeItem(this.keyGenerate(key));
  }
}

export const session = new SessionStorage();
