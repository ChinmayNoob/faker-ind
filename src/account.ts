import { banks } from '@/common/banks';
import { arrayElement, number } from '@/random';

/**
 * Returns a random bank name
 */
export function bank(): string | undefined {
    return arrayElement(banks);
}

/**
 * Generates a random account number
 */
export function accountNumber(count: number = 10): string {
    let accountNumber: string = '';

    for (let i = 0; i < count; i++) {
        accountNumber += number(0, 9);
    }

    return accountNumber;
}
