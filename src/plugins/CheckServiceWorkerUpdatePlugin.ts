import { RouterPlugin, Context } from "../Plugin";

export class CheckServiceWorkerUpdatePlugin extends RouterPlugin {
  protected static readonly _name: string = 'CheckServiceWorkerUpdate';
  beforeNavigation(_context: Context): void {
    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.getRegistration().then((registration) => {
        if (registration) {
          registration.update();
        }
      });
    }
  }
}

