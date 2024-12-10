import reduce from '../src/reduce.js';

describe('reduce function', () => {
  test('should sum an array of numbers with an initial accumulator', () => {
    const result = reduce([1, 2, 3, 4], (sum, n) => sum + n, 0);
    expect(result).toBe(10);
  });

  test('should sum an array of numbers without an initial accumulator', () => {
    const result = reduce([1, 2, 3, 4], (sum, n) => sum + n);
    expect(result).toBe(10);
  });

  test('should reduce arrays with floating-point numbers correctly', () => {
    const result = reduce([1.1, 2.2, 3.3], (sum, n) => sum + n, 0);
    expect(result).toBeCloseTo(6.6, 5); // Five digit accuracy after decimal point
  });

  test('should work with objects as collections', () => {
    const input = { a: 1, b: 2, c: 3 };
    const result = reduce(input, (sum, n) => sum + n, 0);
    expect(result).toBe(6);
  });

  test('should group object values by their value', () => {
    const input = { a: 1, b: 2, c: 1 };
    const result = reduce(
      input,
      (result, value, key) => {
        (result[value] || (result[value] = [])).push(key);
        return result;
      },
      {}
    );
    expect(result).toEqual({ '1': ['a', 'c'], '2': ['b'] });
  });

  test('should handle empty arrays with an initial accumulator', () => {
    const result = reduce([], (sum, n) => sum + n, 0);
    expect(result).toBe(0);
  });

  test('should return undefined for empty arrays without an initial accumulator', () => {
    const result = reduce([], (sum, n) => sum + n);
    expect(result).toBeUndefined();
  });

  test('should handle edge cases with falsy values in the collection', () => {
    const result = reduce([0, null, false, 3], (sum, n) => sum + (n || 0), 0);
    expect(result).toBe(3);
  });

  test('should invoke iteratee with correct arguments for arrays', () => {
    const mockIteratee = jest.fn((acc, value) => acc + value);
    reduce([1, 2, 3], mockIteratee, 0);

    expect(mockIteratee).toHaveBeenCalledTimes(3);
    expect(mockIteratee).toHaveBeenCalledWith(0, 1, 0, [1, 2, 3]);
    expect(mockIteratee).toHaveBeenCalledWith(1, 2, 1, [1, 2, 3]);
    expect(mockIteratee).toHaveBeenCalledWith(3, 3, 2, [1, 2, 3]);
  });

  test('should invoke iteratee with correct arguments for objects', () => {
    const mockIteratee = jest.fn((acc, value) => acc + value);
    reduce({ a: 1, b: 2 }, mockIteratee, 0);

    expect(mockIteratee).toHaveBeenCalledTimes(2);
    expect(mockIteratee).toHaveBeenCalledWith(0, 1, 'a', { a: 1, b: 2 });
    expect(mockIteratee).toHaveBeenCalledWith(1, 2, 'b', { a: 1, b: 2 });
  });
});