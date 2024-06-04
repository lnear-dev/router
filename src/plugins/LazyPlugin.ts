import { RouterPlugin, Context } from "../Plugin";

export  class LazyPlugin extends RouterPlugin {
  protected static readonly _name: string = "lazy";
  constructor(private fn: any) {
    super();
  }
  beforeNavigation(context: Context): void {
    this.fn(context);
  }
}
