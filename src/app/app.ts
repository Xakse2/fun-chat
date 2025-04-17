import { BaseComponent } from '../component/baseComponent';
import { outlet } from '../other/other';
import { router } from '../router/route';
import { userId } from '../states/user';

export class App extends BaseComponent {
  // классы с большой
  constructor() {
    super({
      className: ['outlet'],
    });

    console.log(userId.userId);
    router.go('/login');
    this.append(outlet);
  }
}
