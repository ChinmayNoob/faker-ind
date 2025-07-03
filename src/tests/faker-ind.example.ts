import { createFakerInd, type Language } from '@/index';
import { Languages } from '@/types/language';

// Example usage of FakerInd for manual testing
console.log('=== FakerInd Manual Testing Examples ===\n');

// Test with default language (English)
console.log('1. Testing with default language (English):');
const fakerEn = createFakerInd({});

console.log('Random number:', fakerEn.random.number(1, 100));
console.log('Account number:', fakerEn.account.accountNumber());
console.log('Phone number:', fakerEn.phone.number());
console.log('First name:', fakerEn.name.firstName());
console.log('Last name:', fakerEn.name.lastName());
console.log('Full name:', fakerEn.name.fullName());
console.log('Name prefix:', fakerEn.name.prefix());
console.log('Lorem word:', fakerEn.lorem.word());
console.log('Lorem phrase:', fakerEn.lorem.phrase());

console.log('\n2. Testing all supported languages:');
console.log('='.repeat(50));

// Test each language
Languages.forEach((language, index) => {
    console.log(`\n${index + 1}. Testing ${language} language:`);
    console.log('-'.repeat(30));

    try {
        const faker = createFakerInd({ language });

        console.log('Random number:', faker.random.number(1, 100));
        console.log('Account number:', faker.account.accountNumber());
        console.log('Phone number:', faker.phone.number());
        console.log('International phone:', faker.phone.number(true));
        console.log('Phone service provider:', faker.phone.serviceProvider());
        console.log('First name (male):', faker.name.firstName());
        console.log('First name (female):', faker.name.firstName());
        console.log('Last name:', faker.name.lastName());
        console.log('Full name:', faker.name.fullName());
        console.log('Name prefix:', faker.name.prefix());
        console.log('Lorem word:', faker.lorem.word());
        console.log('Lorem phrase:', faker.lorem.phrase());
        console.log('Alphanumeric ID:', faker.random.alphanumeric(8));

    } catch (error) {
        console.log(`❌ Error testing ${language}:`, (error as Error).message);
    }
});

console.log('\n3. Testing language switching:');
console.log('='.repeat(50));
const faker = createFakerInd({ language: "English" });
console.log('Initial language (English) - First name:', faker.name.firstName());

// Test switching between different languages
const testLanguages: Language[] = ["Hindi", "Bengali", "Tamil", "Telugu", "Marathi"];
testLanguages.forEach(lang => {
    try {
        faker.setLanguage(lang);
        console.log(`After switching to ${lang} - First name:`, faker.name.firstName());
        console.log(`${lang} lorem word:`, faker.lorem.word());
    } catch (error) {
        console.log(`❌ Error switching to ${lang}:`, (error as Error).message);
    }
});

console.log('\n4. Testing error handling:');
console.log('='.repeat(50));

// Test invalid options
try {
    const invalidFaker = createFakerInd({ invalidProperty: 'test' } as any);
} catch (error) {
    console.log('✅ Caught schema validation error:', (error as Error).message);
}

// Test unsupported language operations
try {
    const testFaker = createFakerInd({ language: "English" });
    // Try to use an invalid language that might not be fully implemented
    console.log('Testing edge cases...');
} catch (error) {
    console.log('✅ Caught error:', (error as Error).message);
}

console.log('\n5. Performance and consistency testing:');
console.log('='.repeat(50));

// Test generating multiple items for consistency
Languages.slice(0, 3).forEach(language => {
    console.log(`\n${language} - Multiple generations:`);
    const languageFaker = createFakerInd({ language });

    console.log('5 First names:', Array.from({ length: 5 }, () => languageFaker.name.firstName()).join(', '));
    console.log('5 Last names:', Array.from({ length: 5 }, () => languageFaker.name.lastName()).join(', '));
    console.log('5 Lorem words:', Array.from({ length: 5 }, () => languageFaker.lorem.word()).join(', '));
});

console.log('\n6. Cross-language feature comparison:');
console.log('='.repeat(50));

// Compare same features across languages
const features = ['firstName', 'lastName', 'fullName', 'prefix'] as const;
features.forEach(feature => {
    console.log(`\n${feature.toUpperCase()} across languages:`);
    Languages.slice(0, 5).forEach(language => {
        try {
            const languageFaker = createFakerInd({ language });
            let result = '';

            switch (feature) {
                case 'firstName':
                    result = languageFaker.name.firstName();
                    break;
                case 'lastName':
                    result = languageFaker.name.lastName();
                    break;
                case 'fullName':
                    result = languageFaker.name.fullName();
                    break;
                case 'prefix':
                    result = languageFaker.name.prefix();
                    break;
            }

            console.log(`${language}: ${result}`);
        } catch (error) {
            console.log(`${language}: ❌ Error - ${(error as Error).message}`);
        }
    });
});

console.log('\n=== Testing Complete ===');
console.log(`Total languages tested: ${Languages.length}`);
console.log('Languages:', Languages.join(', ')); 