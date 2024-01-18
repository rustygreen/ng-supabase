export function trimEnd(value: string, trimValue = ' ') {
  return value.endsWith(trimValue)
    ? value.substring(0, value.length - 1)
    : value;
}
