import type { LocalPerson } from '@/languages'
import { femaleFirstNames, lastNames, maleFirstNames, prefix } from '@/languages/malayalam/names'
import { phrases, words } from '@/languages/malayalam/words'
import { arrayElement } from '@/random'
import { Gender } from '@/types/gender'

function malayalamLocals(): LocalPerson {
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

export { malayalamLocals }
