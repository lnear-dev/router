import {LazyPlugin} from './LazyPlugin.js';
export  class LazyImportPlugin extends LazyPlugin {
  protected static readonly _name: string = 'lazy-import';
  constructor(source: string) {
    super(() => import(/* @vite-ignore */source));
  }
}

