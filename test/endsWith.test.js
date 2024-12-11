import endsWith from '../src/endsWith.js';

describe('endsWith function', () => {
  test('should return true if string ends with the target', () => {
    expect(endsWith('abc', 'c')).toBe(true);
  });

  test('should return false if string does not end with the target', () => {
    expect(endsWith('abc', 'b')).toBe(false);
  });

  test('should consider the position parameter', () => {
    expect(endsWith('abc', 'b', 2)).toBe(true);
    expect(endsWith('abc', 'c', 2)).toBe(false);
  });

  test('should return false if position is less than the target length', () => {
    expect(endsWith('abc', 'abc', 2)).toBe(false);
  });

  test('should return false if target is longer than the string', () => {
    expect(endsWith('abc', 'abcd')).toBe(false);
  });

  test('should handle an empty string correctly', () => {
    expect(endsWith('', 'a')).toBe(false);
    expect(endsWith('', '')).toBe(true);
  });

  test('should handle an empty target string', () => {
    expect(endsWith('abc', '')).toBe(true); // Any string ends with an empty target
  });

  test('should handle null or undefined inputs gracefully', () => {
    expect(() => endsWith(null, 'c')).toThrow(TypeError);
    expect(() => endsWith(undefined, 'c')).toThrow(TypeError);
  });

  test('should handle NaN, negative, or overly large position values', () => {
    expect(endsWith('abc', 'a', NaN)).toBe(false);
    expect(endsWith('abc', 'c', -1)).toBe(false);
    expect(endsWith('abc', 'c', 10)).toBe(true);
  });

  test('should handle strings with repeated characters', () => {
    expect(endsWith('aaa', 'a')).toBe(true);
    expect(endsWith('aaa', 'aa')).toBe(true);
    expect(endsWith('aaa', 'aaa')).toBe(true);
    expect(endsWith('aaa', 'b')).toBe(false);
  });

  test('should be case-sensitive', () => {
    expect(endsWith('abc', 'C')).toBe(false);
    expect(endsWith('abc', 'c')).toBe(true);
  });

  test('should handle strings with special characters', () => {
    expect(endsWith('abc$', '$')).toBe(true);
    expect(endsWith('abc$', 'c$')).toBe(true);
    expect(endsWith('abc$', 'abc$')).toBe(true);
    expect(endsWith('abc$', '!')).toBe(false);
  });

  test('should handle whitespace correctly', () => {
    expect(endsWith('abc ', ' ')).toBe(true);
    expect(endsWith('abc ', 'c ')).toBe(true);
    expect(endsWith('abc ', 'abc')).toBe(false);
  });
});