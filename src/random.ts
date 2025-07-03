import { alphaNumericChars, hexaDecimalChars } from '@/common/char';

/**
 * Generate a random number between min and max
 *
 * @param min (optional, default: 0)
 * @param max  (optional, default: 9)
 * @returns number
 */
export function number(min: number = 0, max: number = 9): number {
    if (min > max) {
        [min, max] = [max, min];
    }

    // Calculate the range
    const range = max - min + 1;

    // Generate random number and scale it to the range
    const randomInRange = Math.floor(Math.random() * range);

    // Shift the random number to start from the minimum value
    return randomInRange + min;
}

export function boolean(): boolean {
    return Boolean(number(0, 1));
}

export function arrayElement<T>(arr: readonly T[]): T | undefined {
    const randomIndex = number(0, arr.length - 1);
    return arr[randomIndex];
}

export function objectElement<S, T extends string | symbol | number>(
    obj: Record<T, S>,
): T | undefined {
    return arrayElement(Object.keys(obj)) as T;
}

export function alphanumeric(_count: number): string {
    let count: number = _count;
    if (count <= 0) {
        count = 1;
    }

    let alphaChar = '';
    for (var i = 0; i < count; i++) {
        const randomChar = arrayElement(alphaNumericChars);
        alphaChar += randomChar;
    }
    return alphaChar;
}

export function hexadecimal(_count: number): string {
    let count: number = _count;
    if (count <= 0) {
        count = 1;
    }

    let hexChar = '';
    for (var i = 0; i < count; i++) {
        const randomChar = arrayElement(hexaDecimalChars);
        hexChar += randomChar;
    }
    return `0x${hexChar}`;
}
