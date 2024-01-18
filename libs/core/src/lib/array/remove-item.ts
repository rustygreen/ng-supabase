/**
 * Removes an item from an array.
 * @param list The list to remove the item from.
 * @param item The item to remove out of the list.
 */
export function removeItem(list: unknown[], item: unknown): void {
  const index = list.findIndex((i) => i === item);
  list.splice(index, 1);
}
