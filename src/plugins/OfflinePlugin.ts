import { RouterPlugin, Context } from "../Plugin";

export class OfflinePlugin extends RouterPlugin {
  protected static readonly _name: string = "offline";

  constructor(private offlineRoute: string = "/offline") {
    super();
  }

  shouldNavigate(_context: Context): {
    condition: () => boolean;
    redirect: string;
  } {
    return {
      condition: () => !navigator.onLine,
      redirect: this.offlineRoute,
    };
  }
}
