import { RouterPlugin, Context } from '../Plugin.js';
export class ScrollToTopPlugin extends RouterPlugin {
  protected static readonly _name: string = 'scrollToTop';
  override beforeNavigation(_context: Context): void {
    window.scrollTo(0, 0);
  }
}

export class ScrollToId extends RouterPlugin {
  protected static readonly _name: string = 'scrollToId';
  override beforeNavigation(context: Context): void {
    if (context.path) {
      const element = document.getElementById(context.path);
      if (element) {
        window.scrollTo(0, element.offsetTop);
      }
      return;
    }
  }
}