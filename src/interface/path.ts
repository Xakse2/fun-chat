import type { BaseComponent } from '../component/baseComponent';

export interface path {
  url: string;
  path: () => Promise<BaseComponent<'div'>>;
}
