export interface Context {
  title?: string;
  query: Record<string, string>;
  params: Record<string, string>;
  url: URL;
  [key: string]: any;
}

