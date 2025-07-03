import { describe, test, expect } from 'vitest';
import { bank, accountNumber } from '@/account';
import { banks } from '@/common/banks';

describe('Account', () => {
  describe('bank', () => {
    test('should return a bank from the banks array', () => {
      const result = bank();
      expect(banks).toContain(result);
    });
  });

  describe('accountNumber', () => {
    test('should generate an account number with default length of 10', () => {
      const result = accountNumber();
      expect(result).toMatch(/^\d{10}$/);
    });

    test('should generate an account number with specified length', () => {
      const result = accountNumber(15);
      expect(result).toMatch(/^\d{15}$/);
    });

    test('should generate different account numbers on subsequent calls', () => {
      const result1 = accountNumber();
      const result2 = accountNumber();
      expect(result1).not.toBe(result2);
    });
  });
});
