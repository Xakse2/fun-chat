export type Props<T extends keyof HTMLElementTagNameMap> = {
  tag?: T;
  className?: string[];
  text?: string;
};

export class BaseComponent<T extends keyof HTMLElementTagNameMap = 'div'> {
  protected _element: HTMLElementTagNameMap[T];
  private _children: BaseComponent<keyof HTMLElementTagNameMap>[] = [];
  private subscribers: (() => void)[] = [];

  constructor(p: Props<T>) {
    // eslint-disable-next-line @typescript-eslint/consistent-type-assertions
    this._element = document.createElement(p.tag ?? 'div') as HTMLElementTagNameMap[T];

    if (p.text) {
      this._element.textContent = p.text;
    }

    if (p.className) {
      p.className.forEach((name) => {
        this._element.classList.add(name);
      });
    }
  }

  public get element(): HTMLElementTagNameMap[T] {
    return this._element;
  }

  public get children(): BaseComponent<keyof HTMLElementTagNameMap>[] {
    return this._children;
  }

  public append(...chilren: BaseComponent<keyof HTMLElementTagNameMap>[]): void {
    chilren.forEach((child) => {
      this._element.appendChild(child._element);
      this.children.push(child);
    });
  }

  public destroy(): void {
    this._children.forEach((child) => {
      child.destroy();
    });
    this._element.remove();
    this._children = [];
    this.unSub();
  }

  public destroyAllChildren(): void {
    this._children.forEach((child) => {
      child.destroy();
    });
    this._children = []; // надо ли у дестрой это?
  }

  public unSub(): void {
    this.subscribers.forEach((sub) => {
      sub();
    });
  }

  public sub(sub: () => void): void {
    this.subscribers.push(sub);
  }
  // добавить метод для листенеров что бы они удалялись потом
}
