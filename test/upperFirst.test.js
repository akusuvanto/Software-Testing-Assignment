import upperFirst from '../src/upperFirst.js';

describe('upperFirst function', () => {
  test('should capitalize the first letter of a lowercase string', () => {
    expect(upperFirst('fred')).toBe('Fred');
  });

  test('should not modify the first letter if it is already uppercase', () => {
    expect(upperFirst('Fred')).toBe('Fred');
    expect(upperFirst('FRED')).toBe('FRED');
  });

  test('should handle single-character strings', () => {
    expect(upperFirst('f')).toBe('F');
    expect(upperFirst('F')).toBe('F');
  });

  test('should return an empty string when input is an empty string', () => {
    expect(upperFirst('')).toBe('');
  });

  test('should handle strings with leading spaces', () => {
    expect(upperFirst('  fred')).toBe('  fred'); // Leading space is preserved
  });

  test('should handle strings with non-alphabetic first characters', () => {
    expect(upperFirst('123abc')).toBe('123abc'); // Numbers remain unchanged
    expect(upperFirst('#hashtag')).toBe('#hashtag'); // Special characters remain unchanged
  });

  test('should return an empty string when input is null', () => {
    expect(upperFirst(null)).toBe('');
  });
  
  test('should return an empty string when input is undefined', () => {
    expect(upperFirst(undefined)).toBe('');
  });
  
  test('should handle numbers as input', () => {
    expect(upperFirst(42)).toBe('42');
  });
  
  test('should return an empty string when input is an empty array', () => {
    expect(upperFirst([])).toBe('');
  });

  test('should handle multi-word strings, affecting only the first character of the first word', () => {
    expect(upperFirst('hello world')).toBe('Hello world');
    expect(upperFirst('hello World')).toBe('Hello World');
  });

  test('should work with non-English characters', () => {
    expect(upperFirst('äbc')).toBe('Äbc'); // Accented character
    expect(upperFirst('ñandú')).toBe('Ñandú');
    expect(upperFirst('漢字')).toBe('漢字'); // Asian characters remain unchanged
  });
});