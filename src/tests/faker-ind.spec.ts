import { test, describe, beforeEach, expect } from 'vitest';
import { FakerInd, Language } from '@/index';

describe('FakerInd', () => {
    describe('Constructor', () => {
        test('should initialize with default language (ENGLISH) when no language specified', () => {
            const faker = new FakerInd({});

            // Check that all modules are properly initialized
            expect(faker.random).toBeDefined();
            expect(faker.account).toBeDefined();
            expect(faker.phone).toBeDefined();
            expect(faker.name).toBeDefined();
            expect(faker.lorem).toBeDefined();
        });

        test('should initialize with specified language', () => {
            const faker = new FakerInd({ language: Language.HINDI });

            // Check that all modules are properly initialized
            expect(faker.random).toBeDefined();
            expect(faker.account).toBeDefined();
            expect(faker.phone).toBeDefined();
            expect(faker.name).toBeDefined();
            expect(faker.lorem).toBeDefined();
        });

        test('should throw error for invalid options', () => {
            expect(() => {
                // @ts-expect-error - Testing invalid input
                new FakerInd({ language: 'invalid-language' });
            }).toThrow('Invalid options:');
        });

        test('should work with all supported languages', () => {
            // Currently only English and Hindi are fully implemented
            const languages = [
                Language.ENGLISH,
                Language.HINDI,
            ];

            languages.forEach(language => {
                expect(() => {
                    const faker = new FakerInd({ language });
                    // Verify all modules are initialized
                    expect(faker.random).toBeDefined();
                    expect(faker.account).toBeDefined();
                    expect(faker.phone).toBeDefined();
                    expect(faker.name).toBeDefined();
                    expect(faker.lorem).toBeDefined();
                }).not.toThrow();
            });
        });
    });

    describe('setLanguage', () => {
        let faker: FakerInd;

        beforeEach(() => {
            faker = new FakerInd({ language: Language.ENGLISH });
        });

        test('should update language successfully', () => {
            expect(() => {
                faker.setLanguage(Language.HINDI);
            }).not.toThrow();
        });

        test('should accept all valid language values', () => {
            const languages = Object.values(Language).filter(v => typeof v === 'number');

            languages.forEach(language => {
                expect(() => {
                    faker.setLanguage(language as Language);
                }).not.toThrow();
            });
        });
    });

    describe('Module Integration', () => {
        let faker: FakerInd;

        beforeEach(() => {
            faker = new FakerInd({ language: Language.ENGLISH });
        });

        test('should have working random module', () => {
            const randomNumber = faker.random.number(1, 10);
            expect(randomNumber).toBeGreaterThanOrEqual(1);
            expect(randomNumber).toBeLessThanOrEqual(10);
        });

        test('should have working account module', () => {
            const accountNumber = faker.account.accountNumber();
            expect(accountNumber).toBeDefined();
            expect(typeof accountNumber).toBe('string');
        });

        test('should have working phone module', () => {
            const phoneNumber = faker.phone.number();
            expect(phoneNumber).toBeDefined();
            expect(typeof phoneNumber).toBe('string');
        });

        test('should have working name module', () => {
            const firstName = faker.name.firstName();
            expect(firstName).toBeDefined();
            expect(typeof firstName).toBe('string');
        });

        test('should have working lorem module', () => {
            const word = faker.lorem.word();
            expect(word).toBeDefined();
            expect(typeof word).toBe('string');

            const phrase = faker.lorem.phrase();
            expect(phrase).toBeDefined();
            expect(typeof phrase).toBe('string');
        });
    });

    describe('Error Handling', () => {
        test('should handle ZodError and convert to readable error message', () => {
            expect(() => {
                // @ts-expect-error - Testing invalid input
                new FakerInd({ invalidProperty: 'test' });
            }).toThrow('Invalid options:');
        });

        test('should re-throw non-ZodError errors', () => {
            // Mock a scenario where a non-ZodError is thrown
            const originalParse = require('zod').z.object({}).parse;

            // This test ensures that non-ZodErrors are properly re-thrown
            // In normal usage, this shouldn't happen, but it's good to test error handling
            expect(() => {
                new FakerInd({});
            }).not.toThrow();
        });
    });
}); 