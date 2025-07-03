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
        test('should generate a phone number starting with +91', () => {
            const result = number();

            expect(result).toHaveLength(13);
            expect(result.startsWith('+91')).toEqual(true);
            expect(result).toMatch(/^\+91\d+$/);
        });

        test('should generate an international phone number starting with +91 when intl is true', () => {
            const result = number(true);

            expect(result).toHaveLength(13);
            expect(result.startsWith('+91')).toEqual(true);
            expect(result).toMatch(/^\+91\d+$/);
        });

        test('should generate consistent format regardless of intl parameter', () => {
            const localResult = number(false);
            const intlResult = number(true);

            expect(localResult).toHaveLength(13);
            expect(intlResult).toHaveLength(13);
            expect(localResult.startsWith('+91')).toEqual(true);
            expect(intlResult.startsWith('+91')).toEqual(true);
        });
    });
});
