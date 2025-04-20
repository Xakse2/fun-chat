import { socket } from '../api/apiSocket';
import { BaseComponent } from '../component/baseComponent';
import { outlet } from '../other/other';
import { router } from '../router/route';
import { session } from '../service/sessionStotrage';
import { userId } from '../states/user';
import { users } from '../states/usersState';
import type { ServerData } from '../type/websocketData';
export class App extends BaseComponent {
  // классы с большой
  constructor() {
    super({
      className: ['outlet'],
    });

    socket.on<'ERROR'>('ERROR', (date: ServerData<'ERROR'>) => {
      alert(date.payload.error); // всплывающее сделать
    });

    socket.on<'USER_LOGOUT'>('USER_LOGOUT', (date: ServerData<'USER_LOGOUT'>) => {});

    this.append(outlet);
  }
}
