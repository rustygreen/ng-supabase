export function trimStart(value: string, trimValue = ' ') {
  const trimLength = trimValue.length;
  return value.startsWith(trimValue) ? value.substring(trimLength) : value;
}
