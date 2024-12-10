import defaultTo from '../src/defaultTo.js';

describe('defaultTo function', () => {
  test('should return the provided value if it is neither null, undefined, nor NaN', () => {
    expect(defaultTo(5, 10)).toBe(5);
    expect(defaultTo(6.7, 9.8)).toBe(6.7);
    expect(defaultTo('hello', 'default')).toBe('hello');
    expect(defaultTo(false, true)).toBe(false);
  });

  test('should return the default value if the provided value is null', () => {
    expect(defaultTo(null, 10)).toBe(10);
  });

  test('should return the default value if the provided value is undefined', () => {
    expect(defaultTo(undefined, 20)).toBe(20);
  });

  test('should return the default value if the provided value is NaN', () => {
    expect(defaultTo(NaN, 'default')).toBe('default');
  });

  test('should handle possible edge cases correctly', () => {
    expect(defaultTo('', 'default')).toBe(''); // Empty string is valid
    expect(defaultTo(0, 100)).toBe(0); // Zero is valid
    expect(defaultTo(false, true)).toBe(false); // False is valid
  });

  test('should be able to return null, undefined or NaN', () => {
    expect(defaultTo(null, null)).toBe(null);
    expect(defaultTo(null, undefined)).toBe(undefined);
    expect(defaultTo(null, NaN)).toBe(NaN);
  });
});