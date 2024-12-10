import add from "../src/add.js"

describe('add function', () => {
  test('should return the sum of two positive numbers', () => {
    expect(add(1, 2)).toBe(3);
    expect(add(101, 605)).toBe(706);
    expect(add(45, 999)).toBe(1044);
  });

  test('should return the sum of a positive and a negative number', () => {
    expect(add(7, -2)).toBe(5);
    expect(add(-8, 10)).toBe(2);
    expect(add(4, -44)).toBe(-40);
  });

  test('should return the sum of two negative numbers', () => {
    expect(add(-3, -4)).toBe(-7);
    expect(add(-100, -33)).toBe(-133);
  });

  test('should return the correct sum when adding zero', () => {
    expect(add(0, 5)).toBe(5);
    expect(add(7, 0)).toBe(7);
  });

  test('should handle floating-point numbers correctly', () => {
    // Five digit accuracy after decimal point
    expect(add(1.2, 2.3)).toBeCloseTo(3.5, 5);
    expect(add(-1.5, 2.5)).toBeCloseTo(1.0, 5);
  });

  test('should return NaN if any argument is not a number', () => {
    expect(add(3, '5')).toBeNaN();
    expect(add('a', 'b')).toBeNaN();
    expect(add(3, undefined)).toBeNaN();
  });
});