export function trimEnd(value: string, trimValue = ' ') {
  const trimLength = trimValue.length;
  return value.endsWith(trimValue)
    ? value.substring(0, value.length - trimLength)
    : value;
}
