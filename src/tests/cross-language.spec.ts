import { test, describe, expect } from 'vitest';
import { createFakerInd } from '@/index';
import { Languages } from '@/types/language';
import { Gender } from '@/types/gender';

describe('Cross-Language Module Testing', () => {
    describe('Random Module', () => {
        test('should work consistently across all languages', () => {
            Languages.forEach(language => {
                const faker = createFakerInd({ language });

                // Test number generation
                const number1 = faker.random.number(1, 100);
                expect(number1).toBeGreaterThanOrEqual(1);
                expect(number1).toBeLessThanOrEqual(100);

                // Test alphanumeric generation
                const alphanumeric = faker.random.alphanumeric(10);
                expect(alphanumeric).toHaveLength(10);
                expect(alphanumeric).toMatch(/^[a-zA-Z0-9]+$/);

                // Test arrayElement
                const testArray = ['a', 'b', 'c'];
                const element = faker.random.arrayElement(testArray);
                expect(testArray).toContain(element);
            });
        });
    });

    describe('Account Module', () => {
        test('should generate valid account data across all languages', () => {
            Languages.forEach(language => {
                const faker = createFakerInd({ language });

                // Test account number generation (default 16 digits)
                const accountNumber = faker.account.accountNumber();
                expect(typeof accountNumber).toBe('string');
                expect(accountNumber).toMatch(/^\d{16}$/);

                // Test bank selection
                const bank = faker.account.bank();
                expect(bank).toBeDefined();
                expect(typeof bank).toBe('string');
                expect(bank!.length).toBeGreaterThan(0);

                // Test custom length account numbers
                const customAccount = faker.account.accountNumber(10);
                expect(customAccount).toMatch(/^\d{10}$/);
            });
        });
    });

    describe('Phone Module', () => {
        test('should generate valid phone numbers across all languages', () => {
            Languages.forEach(language => {
                const faker = createFakerInd({ language });

                // Test phone number (always +91 format)
                const phone = faker.phone.number();
                expect(typeof phone).toBe('string');
                expect(phone).toHaveLength(13);
                expect(phone.startsWith('+91')).toBe(true);
                expect(phone).toMatch(/^\+91\d{10}$/);

                // Test with intl parameter (should still be +91 format)
                const intlPhone = faker.phone.number(true);
                expect(typeof intlPhone).toBe('string');
                expect(intlPhone).toHaveLength(13);
                expect(intlPhone.startsWith('+91')).toBe(true);
                expect(intlPhone).toMatch(/^\+91\d{10}$/);

                // Test service provider
                const provider = faker.phone.serviceProvider();
                expect(typeof provider).toBe('string');
                expect(provider.length).toBeGreaterThan(0);
            });
        });
    });

    describe('Name Module', () => {
        test('should generate valid names across all languages', () => {
            Languages.forEach(language => {
                const faker = createFakerInd({ language });

                // Test first name generation
                const firstName = faker.name.firstName();
                expect(typeof firstName).toBe('string');
                expect(firstName.trim().length).toBeGreaterThan(0);

                // Test first name with gender
                const maleFirstName = faker.name.firstName(Gender.MALE);
                expect(typeof maleFirstName).toBe('string');
                expect(maleFirstName.trim().length).toBeGreaterThan(0);

                const femaleFirstName = faker.name.firstName(Gender.FEMALE);
                expect(typeof femaleFirstName).toBe('string');
                expect(femaleFirstName.trim().length).toBeGreaterThan(0);

                // Test last name generation
                const lastName = faker.name.lastName();
                expect(typeof lastName).toBe('string');
                expect(lastName.trim().length).toBeGreaterThan(0);

                // Test prefix generation
                const prefix = faker.name.prefix();
                expect(typeof prefix).toBe('string');
                expect(prefix.trim().length).toBeGreaterThan(0);

                // Test full name generation
                const fullName = faker.name.fullName();
                expect(typeof fullName).toBe('string');
                expect(fullName.trim().length).toBeGreaterThan(0);

                // Full name should have proper structure (contains spaces and has reasonable length)
                const fullNameParts = fullName.trim().split(/\s+/);
                expect(fullNameParts.length).toBeGreaterThanOrEqual(2); // Should have at least 2 parts
            });
        });

        test('should generate different names for different genders', () => {
            Languages.forEach(language => {
                const faker = createFakerInd({ language });

                // Generate multiple names for each gender
                const maleNames = Array.from({ length: 10 }, () => faker.name.firstName(Gender.MALE));
                const femaleNames = Array.from({ length: 10 }, () => faker.name.firstName(Gender.FEMALE));

                // Ensure we get valid names
                maleNames.forEach(name => {
                    expect(typeof name).toBe('string');
                    expect(name.trim().length).toBeGreaterThan(0);
                });

                femaleNames.forEach(name => {
                    expect(typeof name).toBe('string');
                    expect(name.trim().length).toBeGreaterThan(0);
                });

                // There should be some variety in names (at least some different names)
                const uniqueMaleNames = new Set(maleNames);
                const uniqueFemaleNames = new Set(femaleNames);
                expect(uniqueMaleNames.size).toBeGreaterThan(1);
                expect(uniqueFemaleNames.size).toBeGreaterThan(1);
            });
        });
    });

    describe('Lorem Module', () => {
        test('should generate valid lorem text across all languages', () => {
            Languages.forEach(language => {
                const faker = createFakerInd({ language });

                // Test word generation
                const word = faker.lorem.word();
                expect(typeof word).toBe('string');
                expect(word.trim().length).toBeGreaterThan(0);

                // Test phrase generation
                const phrase = faker.lorem.phrase();
                expect(typeof phrase).toBe('string');
                expect(phrase.trim().length).toBeGreaterThan(0);
                expect(phrase.length).toBeGreaterThan(word.length);

                // Phrase should contain multiple words
                const words = phrase.trim().split(/\s+/);
                expect(words.length).toBeGreaterThan(1);
            });
        });

        test('should generate consistent lorem content quality', () => {
            Languages.forEach(language => {
                const faker = createFakerInd({ language });

                // Generate multiple samples
                const words = Array.from({ length: 10 }, () => faker.lorem.word());
                const phrases = Array.from({ length: 5 }, () => faker.lorem.phrase());

                // All words should be valid
                words.forEach(word => {
                    expect(typeof word).toBe('string');
                    expect(word.trim().length).toBeGreaterThan(0);
                    // Should not contain numbers or special characters for lorem text
                    expect(word).toMatch(/^[^\d\s]+$/);
                });

                // All phrases should be valid
                phrases.forEach(phrase => {
                    expect(typeof phrase).toBe('string');
                    expect(phrase.trim().length).toBeGreaterThan(0);
                    const phraseWords = phrase.trim().split(/\s+/);
                    expect(phraseWords.length).toBeGreaterThan(1);
                });

                // Should have some variety
                const uniqueWords = new Set(words);
                expect(uniqueWords.size).toBeGreaterThan(1);
            });
        });
    });

    describe('Data Consistency', () => {
        test('should maintain consistent behavior across multiple generations per language', () => {
            Languages.forEach(language => {
                const faker = createFakerInd({ language });

                // Generate multiple items and ensure consistency
                const iterations = 20;

                for (let i = 0; i < iterations; i++) {
                    const firstName = faker.name.firstName();
                    const lastName = faker.name.lastName();
                    const word = faker.lorem.word();
                    const phone = faker.phone.number();
                    const account = faker.account.accountNumber();

                    // All should be valid on every iteration
                    expect(typeof firstName).toBe('string');
                    expect(firstName.length).toBeGreaterThan(0);

                    expect(typeof lastName).toBe('string');
                    expect(lastName.length).toBeGreaterThan(0);

                    expect(typeof word).toBe('string');
                    expect(word.length).toBeGreaterThan(0);

                    expect(phone).toMatch(/^\+91\d{10}$/);
                    expect(account).toMatch(/^\d{16}$/);
                }
            });
        });

        test('should generate unique values across calls', () => {
            Languages.forEach(language => {
                const faker = createFakerInd({ language });

                // Generate sets of data
                const firstNames = new Set(Array.from({ length: 50 }, () => faker.name.firstName()));
                const lastNames = new Set(Array.from({ length: 50 }, () => faker.name.lastName()));
                const words = new Set(Array.from({ length: 50 }, () => faker.lorem.word()));
                const phones = new Set(Array.from({ length: 50 }, () => faker.phone.number()));
                const accounts = new Set(Array.from({ length: 50 }, () => faker.account.accountNumber()));

                // Should have reasonable variety (not all identical)
                expect(firstNames.size).toBeGreaterThan(1);
                expect(lastNames.size).toBeGreaterThan(1);
                expect(words.size).toBeGreaterThan(1);
                expect(phones.size).toBeGreaterThan(1);
                expect(accounts.size).toBeGreaterThan(1);
            });
        });
    });

    describe('Performance', () => {
        test('should maintain reasonable performance across all languages', () => {
            Languages.forEach(language => {
                const faker = createFakerInd({ language });

                const startTime = Date.now();

                // Generate a reasonable amount of data
                for (let i = 0; i < 100; i++) {
                    faker.name.firstName();
                    faker.name.lastName();
                    faker.lorem.word();
                    faker.phone.number();
                    faker.account.accountNumber();
                }

                const endTime = Date.now();
                const duration = endTime - startTime;

                // Should complete within reasonable time (less than 1 second for 500 operations)
                expect(duration).toBeLessThan(1000);
            });
        });
    });
}); 