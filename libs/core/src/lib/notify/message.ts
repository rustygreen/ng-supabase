export interface Message {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'success' | 'warn' | 'error' | 'fatal';
  position:
    | 'top-left'
    | 'top-center'
    | 'top-right'
    | 'bottom-left'
    | 'bottom-center'
    | 'bottom-right';
}
