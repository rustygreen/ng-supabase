import { trimEnd } from './trim-end.function';
import { trimStart } from './trim-start.function';

export function trim(value: string, trimValue = ' ') {
  const trimmedStart = trimStart(value, trimValue);
  return trimEnd(trimmedStart, trimValue);
}
