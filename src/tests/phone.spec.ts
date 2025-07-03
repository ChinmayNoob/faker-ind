import { describe, test, expect } from 'vitest';
import { serviceProvider, number } from '@/phone';
import { serviceProviders } from '@/common/phone';

describe('Phone', () => {
    describe('serviceProvider', () => {
        test('should return a service provider from the serviceProviders array', () => {
            const result = serviceProvider();
            expect(serviceProviders).toContain(result);
        });
    });

    describe('number', () => {
        test('should generate a local phone number starting with 0', () => {
            const result = number();

            expect(result).toHaveLength(11);
            expect(result.startsWith('0')).toEqual(true);
            expect(result).toMatch(/^0\d+$/);
        });

        test('should generate an international phone number starting with +91', () => {
            const result = number(true);

            expect(result).toHaveLength(13);
            expect(result.startsWith('+91')).toEqual(true);
            expect(result).toMatch(/^\+91\d+$/);
        });
    });
});
