import filter from '../src/filter.js';

describe('filter function', () => {
  test('should filter elements based on the predicate', () => {
    const users = [
      { user: 'barney', active: true },
      { user: 'fred', active: false },
    ];
    const result = filter(users, ({ active }) => active);
    expect(result).toEqual([{ user: 'barney', active: true }]);
  });

  test('should return an empty array if no elements match the predicate', () => {
    const numbers = [1, 2, 3, 4];
    const result = filter(numbers, (n) => n > 10);
    expect(result).toEqual([]);
  });

  test('should return a copy of the original array if all elements match the predicate', () => {
    const numbers = [1, 2, 3, 4];
    const result = filter(numbers, (n) => n > 0);
    expect(result).toEqual([1, 2, 3, 4]);
  });

  test('should handle an empty array and return an empty array', () => {
    const result = filter([], (n) => n > 0);
    expect(result).toEqual([]);
  });

  test('should correctly filter out removed items', () => {
    const items = [
      { id: 1, name: 'item1', removed: false },
      { id: 2, name: 'item2', removed: true },
      { id: 3, name: 'item3', removed: false },
    ];
    const result = filter(items, (item) => !item.removed);
    expect(result).toEqual([
      { id: 1, name: 'item1', removed: false },
      { id: 3, name: 'item3', removed: false },
    ]);
  });

  test('should correctly pass arguments to the predicate', () => {
    const array = ['a', 'b', 'c'];
    const mockPredicate = jest.fn((value) => value === 'b');
    filter(array, mockPredicate);

    expect(mockPredicate).toHaveBeenCalledTimes(3);
    expect(mockPredicate).toHaveBeenCalledWith('a', 0, array);
    expect(mockPredicate).toHaveBeenCalledWith('b', 1, array);
    expect(mockPredicate).toHaveBeenCalledWith('c', 2, array);
  });

  test('should handle null or undefined arrays gracefully', () => {
    expect(filter(null, (n) => n > 0)).toEqual([]);
    expect(filter(undefined, (n) => n > 0)).toEqual([]);
  });

  test('should handle non-array-like input by returning an empty array', () => {
    const result = filter({ a: 1, b: 2 }, (value) => value > 0);
    expect(result).toEqual([]);
  });
});