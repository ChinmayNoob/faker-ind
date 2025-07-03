import { serviceProviders } from '@/common/phone';
import { arrayElement, number as randomNumber } from '@/random';

export function serviceProvider(): string {
  return arrayElement(serviceProviders)!;
}

export function number(intl: boolean = false): string {
  let phoneNumber = '+91';

  for (var i = 0; i < 10; i++) {
    phoneNumber += randomNumber(0, 9);
  }
  return phoneNumber;
}
