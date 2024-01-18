// Local.
import { removeItem } from './remove-item';

/**
 * Removes items from a list based on a predicate function.
 * @param list The list to remove items from.
 * @param predicate A function that will be called for each item
 * to determine whether to remove that item from the list or not.
 */
export function removeWhere<T>(list: T[], predicate: (value: T) => boolean) {
  for (const item of list) {
    const remove = predicate(item);
    if (remove) {
      removeItem(list, item);
    }
  }
}
