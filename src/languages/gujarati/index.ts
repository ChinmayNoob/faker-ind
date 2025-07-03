import type { LocalPerson } from '@/languages'
import { femaleFirstNames, lastNames, maleFirstNames, prefix } from '@/languages/gujarati/names'
import { phrases, words } from '@/languages/gujarati/words'
import { arrayElement } from '@/random'
import { Gender } from '@/types/gender'

function gujaratiLocals(): LocalPerson {
  return {
    firstName(gender: Gender): string {
      return arrayElement(
        gender === Gender.MALE ? maleFirstNames : femaleFirstNames,
      ) as string
    },

    lastName(): string {
      return arrayElement(lastNames) as string
    },

    prefix(): string {
      return arrayElement(prefix) as string
    },

    word(): string {
      return arrayElement(words) as string
    },

    phrase(): string {
      return arrayElement(phrases) as string
    },
  }
}

export { gujaratiLocals }
