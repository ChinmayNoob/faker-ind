import { serviceProviders } from '@/common/phone'
import { arrayElement, number as randomNumber } from '@/random'

export function serviceProvider(): string {
  return arrayElement(serviceProviders)!
}

export function number(_intl: boolean = false): string {
  let phoneNumber = '+91'

  for (let i = 0; i < 10; i++) {
    phoneNumber += randomNumber(0, 9)
  }
  return phoneNumber
}
