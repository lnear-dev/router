import { RouterPlugin, Context } from "../Plugin";

export class RedirectPlugin extends RouterPlugin {
  protected  static readonly _name: string = 'redirect';

  constructor(private path: string) {
    super();
  }

  shouldNavigate(_context: Context): { condition: () => boolean; redirect: string } {
    return {
      condition: () => false,
      redirect: this.path,
    };
  }
}
