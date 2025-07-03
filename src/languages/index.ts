import type { Gender } from '@/types/gender'

export interface LocalPerson {
  firstName: (gender: Gender) => string
  lastName: () => string
  prefix: () => string
  word: () => string
  phrase: () => string
}
