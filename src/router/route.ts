import { BaseComponent } from '../component/baseComponent';
import type { path } from '../interface/path';
import { outlet } from '../other/other';
import { URL } from '../url/url';

export class route extends BaseComponent {
  constructor() {
    super({});
    window.addEventListener('popstate', () => {
      this.go(location.pathname);
    });
  }

  public onLoad(): void {
    const path = location.pathname;
    if (path === '/' || path === '/index.html' || path === '/dist/index.html' || path === '/dist') {
      this.go('/login');
    } else {
      this.go(path);
    }
  }

  public async go(url: string): Promise<void> {
    history.pushState({}, '', url);
    const rout = URL.find((item) => item.url === url);
    if (rout) {
      this.draw(rout);
    }
  }

  private async draw(url: path): Promise<void> {
    outlet.destroyAllChildren();
    const component = await url.path();
    outlet.append(component);
  }
}

export const router = new route();
