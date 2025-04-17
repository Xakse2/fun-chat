import type { Props } from './baseComponent';
import { BaseComponent } from './baseComponent';

interface ButtonProps extends Props<'button'> {
  onClick?: () => void;
}

export class ButtonComponent extends BaseComponent<'button'> {
  constructor(p: ButtonProps = {}) {
    super({
      tag: 'button',
      ...p,
    });

    if (p.onClick) {
      this.element.addEventListener('click', p.onClick);
    }
  }
}
