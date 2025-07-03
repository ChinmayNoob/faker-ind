import type { FakerIndOpts } from '@/schema'
import type { Gender } from '@/types/gender'
import type { Language } from '@/types/language'
import { ZodError } from 'zod'
import * as accountUtils from '@/account'
import * as loremUtils from '@/lorem'
import * as nameUtils from '@/name'
import * as phoneUtils from '@/phone'
import * as randomUtils from '@/random'
import { fakerIndOptsSchema } from '@/schema'

export function createFakerInd(opts: FakerIndOpts) {
  try {
    fakerIndOptsSchema.parse(opts)
    let language: Language = opts.language ?? 'English'

    const fakerInd = {
      random: {
        number: randomUtils.number,
        boolean: randomUtils.boolean,
        arrayElement: randomUtils.arrayElement,
        objectElement: randomUtils.objectElement,
        alphanumeric: randomUtils.alphanumeric,
        hexadecimal: randomUtils.hexadecimal,
      },
      account: {
        bank: () => accountUtils.bank(),
        accountNumber: (count?: number) => accountUtils.accountNumber(count),
      },
      phone: {
        serviceProvider: () => phoneUtils.serviceProvider(),
        number: (intl?: boolean) => phoneUtils.number(intl),
      },
      name: {
        firstName: (gender?: Gender) => nameUtils.firstName(language, gender),
        lastName: () => nameUtils.lastName(language),
        prefix: () => nameUtils.prefix(language),
        fullName: () => nameUtils.fullName(language),
      },
      lorem: {
        word: () => loremUtils.word(language),
        phrase: () => loremUtils.phrase(language),
      },
      setLanguage: (newLanguage: Language) => {
        language = newLanguage
        // Update closures to use new language
        fakerInd.name.firstName = (gender?: Gender) => nameUtils.firstName(language, gender)
        fakerInd.name.lastName = () => nameUtils.lastName(language)
        fakerInd.name.prefix = () => nameUtils.prefix(language)
        fakerInd.name.fullName = () => nameUtils.fullName(language)
        fakerInd.lorem.word = () => loremUtils.word(language)
        fakerInd.lorem.phrase = () => loremUtils.phrase(language)
      },
    }

    return fakerInd
  }
  catch (err: unknown) {
    if (err instanceof ZodError) {
      const [firstError] = err.errors
      throw new Error(`Invalid options: ${firstError.message}`)
    }
    throw err
  }
}

export type { Language }
