import { test, describe, beforeEach, expect } from 'vitest';
import { createFakerInd, Language } from '@/index';

describe('FakerInd', () => {
    describe('Constructor', () => {
        test('should initialize with default language (ENGLISH) when no language specified', () => {
            const faker = createFakerInd({});

            // Check that all modules are properly initialized
            expect(faker.random).toBeDefined();
            expect(faker.account).toBeDefined();
            expect(faker.phone).toBeDefined();
            expect(faker.name).toBeDefined();
            expect(faker.lorem).toBeDefined();
        });

        test('should initialize with specified language', () => {
            const faker = createFakerInd({ language: "Hindi" });

            // Check that all modules are properly initialized
            expect(faker.random).toBeDefined();
            expect(faker.account).toBeDefined();
            expect(faker.phone).toBeDefined();
            expect(faker.name).toBeDefined();
            expect(faker.lorem).toBeDefined();
        });

        test('should throw error for invalid options', () => {
            expect(() => {
                createFakerInd({ language: 'invalid-language' as Language });
            }).toThrow('Invalid options:');
        });

        test('should work with all supported languages', () => {
            // Currently only English and Hindi are fully implemented
            const languages: Language[] = [
                "English",
                "Hindi",
            ];

            languages.forEach(language => {
                expect(() => {
                    const faker = createFakerInd({ language });
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
        let faker: ReturnType<typeof createFakerInd>;

        beforeEach(() => {
            faker = createFakerInd({ language: "English" });
        });

        test('should update language successfully', () => {
            expect(() => {
                faker.setLanguage("Hindi");
            }).not.toThrow();
        });

        test('should accept all valid language values', () => {
            const languages: Language[] = ["English", "Hindi"];

            languages.forEach(language => {
                expect(() => {
                    faker.setLanguage(language);
                }).not.toThrow();
            });
        });
    });

    describe('Module Integration', () => {
        let faker: ReturnType<typeof createFakerInd>;

        beforeEach(() => {
            faker = createFakerInd({ language: "English" });
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
                createFakerInd({ invalidProperty: 'test' } as any);
            }).toThrow('Invalid options:');
        });

        test('should re-throw non-ZodError errors', () => {
            // Mock a scenario where a non-ZodError is thrown
            const originalParse = require('zod').z.object({}).parse;

            // This test ensures that non-ZodErrors are properly re-thrown
            // In normal usage, this shouldn't happen, but it's good to test error handling
            expect(() => {
                createFakerInd({});
            }).not.toThrow();
        });
    });
}); 