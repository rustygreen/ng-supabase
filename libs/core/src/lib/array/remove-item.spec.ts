import { removeItem } from './remove-item';

describe('removeItem', () => {
  describe('when item is in list', () => {
    it('should remove it', () => {
      const item1 = { id: 1 };
      const item2 = { id: 2 };
      const item3 = { id: 3 };
      const list = [item1, item2, item3];

      removeItem(list, item2);
      expect(list).toEqual([item1, item3]);
    });
  });
});
