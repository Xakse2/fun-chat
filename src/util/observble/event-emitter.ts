type listener<T> = (function_: T) => void;

export class EventEmitter<T> {
  private listeners: listener<T>[] = [];

  public notify(value: T): void {
    this.listeners.forEach((listener) => listener(value));
  }

  public subscribe(listener: listener<T>): () => void {
    this.listeners.push(listener);
    return this.unsubscribe.bind(this, listener);
  }

  public unsubscribe(callback: listener<T>): void {
    this.listeners = this.listeners.filter((item) => item != callback);
  }
}
