import { test } from 'vitest';

test('Show FakerInd Example Output', async () => {
    // This will import and execute the example file
    await import('./src/tests/faker-ind.example');
}); 