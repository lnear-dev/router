import { RouterPlugin } from "../Plugin";
export class AppNamePlugin extends RouterPlugin {
  protected static readonly _name: string;
  private __name: string;
  override get name(): string {
    return this.__name;
  }
  constructor(name: string) {
    super();
    this.__name = name;
  }
  beforeNavigation(context: any) {
    context.title = `${this.__name} ${context.title}`
  }
}