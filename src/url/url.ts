import type { BaseComponent } from '../component/baseComponent';

export const URL = [
  {
    url: '/login',
    path: (): Promise<BaseComponent<'div'>> =>
      import('../core/login').then((module) => new module.Login()),
  },
  {
    url: '/messager',
    path: (): Promise<BaseComponent<'div'>> =>
      import('../core/messager').then((module) => new module.Messager()),
  },
];
