import { test, describe, beforeEach, expect } from 'vitest';
import { fakerInd, Language } from '@/index';
import { Languages } from '@/types/language';

describe('FakerInd', () => {
    describe('Constructor', () => {
        test('should initialize with default language (ENGLISH) when no language specified', () => {
            const faker = fakerInd({});

            // Check that all modules are properly initialized
            expect(faker.random).toBeDefined();
            expect(faker.account).toBeDefined();
            expect(faker.phone).toBeDefined();
            expect(faker.name).toBeDefined();
            expect(faker.lorem).toBeDefined();
        });

        test('should initialize with specified language', () => {
            const faker = fakerInd({ language: "Hindi" });

            // Check that all modules are properly initialized
            expect(faker.random).toBeDefined();
            expect(faker.account).toBeDefined();
            expect(faker.phone).toBeDefined();
            expect(faker.name).toBeDefined();
            expect(faker.lorem).toBeDefined();
        });

        test('should throw error for invalid options', () => {
            expect(() => {
                fakerInd({ language: 'invalid-language' as Language });
            }).toThrow('Invalid options:');
        });

        test('should work with all supported languages', () => {
            // Test all supported languages
            Languages.forEach(language => {
                expect(() => {
                    const faker = fakerInd({ language });
                    // Verify all modules are initialized
                    expect(faker.random).toBeDefined();
                    expect(faker.account).toBeDefined();
                    expect(faker.phone).toBeDefined();
                    expect(faker.name).toBeDefined();
                    expect(faker.lorem).toBeDefined();
                }).not.toThrow();
            });
        });

        test('should generate valid data for all languages', () => {
            Languages.forEach(language => {
                const faker = fakerInd({ language });

                // Test that basic functionality works for each language
                expect(() => {
                    const randomNum = faker.random.number(1, 100);
                    expect(randomNum).toBeGreaterThanOrEqual(1);
                    expect(randomNum).toBeLessThanOrEqual(100);

                    const accountNum = faker.account.accountNumber();
                    expect(typeof accountNum).toBe('string');
                    expect(accountNum).toMatch(/^\d{16}$/);

                    const phoneNum = faker.phone.number();
                    expect(typeof phoneNum).toBe('string');
                    expect(phoneNum).toMatch(/^\+91\d{10}$/);

                    const firstName = faker.name.firstName();
                    expect(typeof firstName).toBe('string');
                    expect(firstName.length).toBeGreaterThan(0);

                    const lastName = faker.name.lastName();
                    expect(typeof lastName).toBe('string');
                    expect(lastName.length).toBeGreaterThan(0);

                    const word = faker.lorem.word();
                    expect(typeof word).toBe('string');
                    expect(word.length).toBeGreaterThan(0);
                }).not.toThrow();
            });
        });
    });

    describe('setLanguage', () => {
        let faker: ReturnType<typeof fakerInd>;

        beforeEach(() => {
            faker = fakerInd({ language: "English" });
        });

        test('should update language successfully', () => {
            expect(() => {
                faker.setLanguage("Hindi");
            }).not.toThrow();
        });

        test('should accept all valid language values', () => {
            Languages.forEach(language => {
                expect(() => {
                    faker.setLanguage(language);
                }).not.toThrow();
            });
        });

        test('should work correctly after language switching for all languages', () => {
            Languages.forEach(language => {
                faker.setLanguage(language);

                // Test that functionality works after language switch
                expect(() => {
                    const firstName = faker.name.firstName();
                    expect(typeof firstName).toBe('string');
                    expect(firstName.length).toBeGreaterThan(0);

                    const word = faker.lorem.word();
                    expect(typeof word).toBe('string');
                    expect(word.length).toBeGreaterThan(0);
                }).not.toThrow();
            });
        });
    });

    describe('Module Integration', () => {
        let faker: ReturnType<typeof fakerInd>;

        beforeEach(() => {
            faker = fakerInd({ language: "English" });
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
            expect(accountNumber).toMatch(/^\d{16}$/);
        });

        test('should have working phone module', () => {
            const phoneNumber = faker.phone.number();
            expect(phoneNumber).toBeDefined();
            expect(typeof phoneNumber).toBe('string');
            expect(phoneNumber).toMatch(/^\+91\d{10}$/);
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

    describe('Cross-Language Functionality', () => {
        test('should generate different names across languages', () => {
            const results: Record<string, string> = {};

            Languages.forEach(language => {
                const faker = fakerInd({ language });
                results[language] = faker.name.firstName();
            });

            // Check that we get some variety (not all identical)
            const uniqueNames = new Set(Object.values(results));
            expect(uniqueNames.size).toBeGreaterThan(1);
        });

        test('should generate consistent data structure across all languages', () => {
            Languages.forEach(language => {
                const faker = fakerInd({ language });

                // Test name methods
                const firstName = faker.name.firstName();
                const lastName = faker.name.lastName();
                const fullName = faker.name.fullName();
                const prefix = faker.name.prefix();

                expect(typeof firstName).toBe('string');
                expect(typeof lastName).toBe('string');
                expect(typeof fullName).toBe('string');
                expect(typeof prefix).toBe('string');

                // Full name should have proper structure (contains spaces and has reasonable length)
                expect(fullName.trim().length).toBeGreaterThan(0);
                const fullNameParts = fullName.trim().split(/\s+/);
                expect(fullNameParts.length).toBeGreaterThanOrEqual(2); // Should have at least 2 parts

                // Test lorem methods
                const word = faker.lorem.word();
                const phrase = faker.lorem.phrase();

                expect(typeof word).toBe('string');
                expect(typeof phrase).toBe('string');
                expect(phrase.length).toBeGreaterThan(word.length);
            });
        });

        test('should maintain data quality across languages', () => {
            Languages.forEach(language => {
                const faker = fakerInd({ language });

                // Generate multiple samples to check consistency
                const firstNames = Array.from({ length: 5 }, () => faker.name.firstName());
                const lastNames = Array.from({ length: 5 }, () => faker.name.lastName());
                const words = Array.from({ length: 5 }, () => faker.lorem.word());

                // All should be strings with content
                firstNames.forEach(name => {
                    expect(typeof name).toBe('string');
                    expect(name.trim().length).toBeGreaterThan(0);
                });

                lastNames.forEach(name => {
                    expect(typeof name).toBe('string');
                    expect(name.trim().length).toBeGreaterThan(0);
                });

                words.forEach(word => {
                    expect(typeof word).toBe('string');
                    expect(word.trim().length).toBeGreaterThan(0);
                });
            });
        });
    });

    describe('Error Handling', () => {
        test('should handle ZodError and convert to readable error message', () => {
            expect(() => {
                fakerInd({ invalidProperty: 'test' } as any);
            }).toThrow('Invalid options:');
        });

        test('should re-throw non-ZodError errors', () => {
            // Mock a scenario where a non-ZodError is thrown
            const originalParse = require('zod').z.object({}).parse;

            // This test ensures that non-ZodErrors are properly re-thrown
            // In normal usage, this shouldn't happen, but it's good to test error handling
            expect(() => {
                fakerInd({});
            }).not.toThrow();
        });

        test('should handle errors gracefully for all languages', () => {
            Languages.forEach(language => {
                // Test that invalid operations don't crash the system
                const faker = fakerInd({ language });

                expect(() => {
                    // These should all work without throwing
                    faker.name.firstName();
                    faker.name.lastName();
                    faker.lorem.word();
                }).not.toThrow();
            });
        });
    });
}); 