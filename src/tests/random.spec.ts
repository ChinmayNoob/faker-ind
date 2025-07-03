import { test, describe, expect } from 'vitest';
import { number, arrayElement, objectElement, alphanumeric } from '@/random';

describe('Random', () => {
  describe('number', () => {
    test('random number is never less than the min specified', () => {
      const num = number(3);
      expect(num).toBeGreaterThanOrEqual(3);
    });

    test('random number is never greater than the max specified', () => {
      const num = number(3, 5);
      expect(num).toBeLessThanOrEqual(5);
    });

    test('default argument should be between 0 and 9', () => {
      const num = number();
      expect(num).toBeLessThanOrEqual(9);
      expect(num).toBeGreaterThanOrEqual(0);
    });
  });

  describe('arrayElement', () => {
    const items = ['a', 'b', 'c', 'd'];

    test('should return undefined when an empty array is passed', () => {
      const it = arrayElement([]);
      expect(it).toBeUndefined();
    });

    test('should return a random element from the array passed', () => {
      const it = arrayElement(items);
      expect(items).toContain(it);
    });
  });

  describe('objectElement', () => {
    const itemsObj = {
      firstName: 'Jane',
      lastName: 'Doe',
      age: 292,
    };

    test('returns undefined when an empty object is passed', () => {
      const it = objectElement({});
      expect(it).toBeUndefined();
    });

    test('returns a random key in the object', () => {
      const it = objectElement(itemsObj);
      expect(Object.keys(itemsObj)).toContain(it);
    });
  });

  test('alphanumeric', () => {
    const randId = alphanumeric(6);

    expect(randId).toHaveLength(6);
  });
});
