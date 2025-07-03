import { createFakerInd, Language } from '@/index';

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
console.log('Lorem word:', fakerEn.lorem.word());
console.log('Lorem phrase:', fakerEn.lorem.phrase());

console.log('\n2. Testing with Hindi language:');
const fakerHi = createFakerInd({ language: "Hindi" });

console.log('Random number:', fakerHi.random.number(1, 100));
console.log('Account number:', fakerHi.account.accountNumber());
console.log('Phone number:', fakerHi.phone.number());
console.log('First name:', fakerHi.name.firstName());
console.log('Last name:', fakerHi.name.lastName());
console.log('Lorem word:', fakerHi.lorem.word());
console.log('Lorem phrase:', fakerHi.lorem.phrase());

console.log('\n3. Testing language switching:');
const faker = createFakerInd({ language: "English" });
console.log('Before switching - First name:', faker.name.firstName());

faker.setLanguage("Hindi");
console.log('After switching to Hindi - First name:', faker.name.firstName());

console.log('\n4. Testing error handling:');

// Test invalid options
try {
    const invalidFaker = createFakerInd({ invalidProperty: 'test' } as any);
} catch (error) {
    console.log('Caught schema validation error:', (error as Error).message);
}

// Test unsupported language (after initialization)
try {
    const testFaker = createFakerInd({ language: "English" });
    testFaker.setLanguage("Tamil" as Language); // This will cause error when using name/lorem
    testFaker.name.firstName(); // This line will throw
} catch (error) {
    console.log('Caught unsupported language error:', (error as Error).message);
}

console.log('\n5. Additional examples:');
const exampleFaker = createFakerInd({ language: "Hindi" });
console.log('Full name:', exampleFaker.name.fullName());
console.log('Name prefix:', exampleFaker.name.prefix());
console.log('Phone service provider:', exampleFaker.phone.serviceProvider());
console.log('International phone:', exampleFaker.phone.number(true));
console.log('Alphanumeric ID:', exampleFaker.random.alphanumeric(8));

console.log('\n=== Testing Complete ==='); 