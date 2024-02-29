export interface KeyValue<T = unknown> {
  [key: string]: T;
}

export interface NumberKeyValue<T = unknown> {
  [key: number]: T;
}
