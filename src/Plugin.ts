import { Context } from "./Context.js";

interface RouterPluginInterface {
  name: string;
  shouldNavigate?: (context: Context) => {
    redirect: string;
    condition: () => boolean | (() => Promise<Boolean>);
  };
  beforeNavigation?: (context: Context) => void;
  afterNavigation?: (context: Context) => void;
}

abstract class RouterPlugin implements RouterPluginInterface {
  protected static readonly _name: string;
  get name(): string {
    return RouterPlugin._name;
  }
  beforeNavigation(_context: Context): void { }
  afterNavigation(_context: Context): void { }
  shouldNavigate(_context: Context): {
    redirect: string;
    condition: () => boolean | (() => Promise<boolean>);
  } {
    return {
      redirect: "",
      condition: () => true,
    };
  }
}

export { RouterPlugin, type Context, type RouterPluginInterface };
