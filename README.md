# faker-ind

A comprehensive fake data generator for Indian People with support for multiple Indian languages.

## Features

- 🇮🇳 **Multi-language support**: Hindi, Bengali, Tamil, Telugu, Gujarati, Marathi, Kannada, Malayalam, Punjabi, Urdu, and English
- 📱 **Indian phone numbers**: Generate realistic Indian mobile numbers
- 🏦 **Banking data**: Indian bank names and account numbers
- 👤 **Names**: Generate Indian names with proper gender support
- 📝 **Lorem text**: Generate placeholder text in various Indian languages
- 🎲 **Random utilities**: Numbers, booleans, arrays, and more

## Installation

```bash
npm install @chinmay/faker-ind
# or
pnpm add @chinmay/faker-ind
# or
yarn add @chinmay/faker-ind
```

## Usage

```typescript
import { fakerInd } from '@chinmay/faker-ind'

// Initialize with default English locale
const faker = fakerInd({ language: 'Hindi' })

// Generate Indian names
console.log(faker.name.firstName()) // Aryan
console.log(faker.name.lastName())  // Sharma
console.log(faker.name.fullName())  // Aryan Sharma

// Generate phone numbers
console.log(faker.phone.number())        // 9876543210
console.log(faker.phone.number(true))    // +91 9876543210

// Generate banking data
console.log(faker.account.bank())           // State Bank of India
console.log(faker.account.accountNumber()) // 1234567890123456

// Generate lorem text
console.log(faker.lorem.word())   // Dhanyawad
console.log(faker.lorem.phrase()) // Aapka Swagat Hai

// Change language dynamically
faker.setLanguage('Bengali')
console.log(faker.name.firstName()) // Soumitro
```

## Supported Languages

- English
- Hindi (हिंदी)
- Bengali (বাংলা)
- Tamil (தமிழ்)
- Telugu (తెలుగు)
- Gujarati (ગુજરાતી)
- Marathi (मराठी)
- Kannada (ಕನ್ನಡ)
- Malayalam (മലയാളം)
- Punjabi (ਪੰਜਾਬੀ)
- Urdu (اردو)

## API Reference

### fakerInd(options)

Initialize the faker instance.

**Options:**
- `language`: The language to use (default: 'English')

### Methods

#### Random
- `faker.random.number(min?, max?)`: Generate random number
- `faker.random.boolean()`: Generate random boolean
- `faker.random.arrayElement(array)`: Pick random array element
- `faker.random.objectElement(object)`: Pick random object value
- `faker.random.alphanumeric(count?)`: Generate alphanumeric string
- `faker.random.hexadecimal(count?)`: Generate hexadecimal string

#### Names
- `faker.name.firstName(gender?)`: Generate first name
- `faker.name.lastName()`: Generate last name
- `faker.name.prefix()`: Generate name prefix
- `faker.name.fullName()`: Generate full name

#### Phone
- `faker.phone.serviceProvider()`: Generate service provider name
- `faker.phone.number(intl?)`: Generate phone number

#### Account
- `faker.account.bank()`: Generate bank name
- `faker.account.accountNumber(count?)`: Generate account number

#### Lorem
- `faker.lorem.word()`: Generate a word
- `faker.lorem.phrase()`: Generate a phrase

## License

MIT