import { RouterPlugin, Context } from "../Plugin";

export class DataPlugin extends RouterPlugin {
  protected static readonly _name: string = "data";

  constructor(private promise: (context: Context) => Promise<any>) {
    super();
  }
  async beforeNavigation(context: Context): Promise<void> {
    context.data = await this.promise(context);
  }
}
