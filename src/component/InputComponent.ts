import type { Props } from './baseComponent';
import { BaseComponent } from './baseComponent';
export interface InputProps extends Props<'input'> {
  type?: string;
  name?: string;
  placeholder?: string;
}

export class InputComponent extends BaseComponent<'input'> {
  constructor(props: InputProps) {
    super({
      tag: 'input',
      ...props,
    });

    if (props.type) {
      this.element.type = props.type;
    }

    if (props.name) {
      this.element.name = props.name;
    }

    if (props.placeholder) {
      this.element.placeholder = props.placeholder;
    }
  }
}
