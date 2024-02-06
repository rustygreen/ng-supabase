export function trimStart(value: string, trimValue = ' ') {
  return value.startsWith(trimValue) ? value.substring(1) : value;
}
