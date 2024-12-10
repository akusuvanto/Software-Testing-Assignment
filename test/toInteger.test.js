import toInteger from '../src/toInteger.js';

describe('toInteger function', () => {
  test('should convert a positive float to an integer', () => {
    expect(toInteger(3.2)).toBe(3);
  });

  test('should convert a negative float to an integer', () => {
    expect(toInteger(-4.8)).toBe(-4);
  });

  test('should convert Number.MIN_VALUE to 0', () => {
    expect(toInteger(Number.MIN_VALUE)).toBe(0);
  });

  test('should handle Infinity', () => {
    expect(toInteger(Infinity)).toBe(Number.MAX_VALUE);
    expect(toInteger(-Infinity)).toBe(-Number.MAX_VALUE);
  });

  test('should handle strings representing numbers', () => {
    expect(toInteger('3.2')).toBe(3);
    expect(toInteger('-4.8')).toBe(-4);
  });

  // Coercion in JS can sometimes seem unpredictable, so by using an
  // external library we have determined the expected behaviour when
  // inputting non-number inputs should be to return zero except in some
  // special cases, like boolean values.
  test('should return 0 for null, undefined, or empty strings', () => {
    expect(toInteger(null)).toBe(0);
    expect(toInteger(undefined)).toBe(0);
    expect(toInteger('')).toBe(0);
  });

  test('should handle non-numeric strings by returning 0', () => {
    expect(toInteger('abc')).toBe(0);
    expect(toInteger('123abc')).toBe(0);
  });

  test('should handle boolean values', () => {
    expect(toInteger(true)).toBe(1);
    expect(toInteger(false)).toBe(0);
  });

  test('should handle NaN and return 0', () => {
    expect(toInteger(NaN)).toBe(0);
  });

  test('should handle objects with numeric valueOf', () => {
    const obj = { valueOf: () => 42.5 };
    expect(toInteger(obj)).toBe(42);
  });

  test('should handle arrays with a single numeric element', () => {
    expect(toInteger([4.7])).toBe(4);
    expect(toInteger(['5.3'])).toBe(5);
  });

  test('should return 0 for empty arrays or arrays with multiple elements', () => {
    expect(toInteger([])).toBe(0);
    expect(toInteger([1, 2])).toBe(0);
  });

  test('should handle special numeric values', () => {
    expect(toInteger(0)).toBe(0);
    expect(toInteger(-0)).toBe(0);
    expect(toInteger(1e20)).toBe(1e20); // Large number remains unchanged
  });
});