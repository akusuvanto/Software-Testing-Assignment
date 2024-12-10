import map from '../src/map.js';

describe('map function', () => {
  test('should apply the iteratee to each element of the array', () => {
    const square = n => n * n;
    expect(map([4, 8], square)).toEqual([16, 64]);
    expect(map([1, 2, 3, 4], square)).toEqual([1, 4, 9, 16]);
  });

  test('should return an empty array if the input array is null or undefined', () => {
    const iteratee = x => x * 2;
    expect(map(null, iteratee)).toEqual([]);
    expect(map(undefined, iteratee)).toEqual([]);
  });

  test('should handle an empty array', () => {
    const iteratee = x => x * 2;
    expect(map([], iteratee)).toEqual([]);
  });

  test('should pass value, index, and array to the iteratee', () => {
    const mockIteratee = jest.fn();
    const inputArray = [1, 2, 3];
    map(inputArray, mockIteratee);

    expect(mockIteratee).toHaveBeenCalledTimes(3);
    expect(mockIteratee).toHaveBeenCalledWith(1, 0, inputArray);
    expect(mockIteratee).toHaveBeenCalledWith(2, 1, inputArray);
    expect(mockIteratee).toHaveBeenCalledWith(3, 2, inputArray);
  });

  test('should handle arrays with different types of elements', () => {
    const iteratee = value => (typeof value === 'string' ? value.toUpperCase() : value);
    expect(map([1, 'hello', true], iteratee)).toEqual([1, 'HELLO', true]);
  });

  test('should not mutate the original array', () => {
    const inputArray = [1, 2, 3];
    const result = map(inputArray, x => x * 2);
    expect(inputArray).toEqual([1, 2, 3]);
    expect(result).toEqual([2, 4, 6]);
  });
});