import type { LocalPerson } from '@/languages'
import type { Language } from '@/types/language'
import { englishLocals } from '@/languages/english'
import { hindiLocals } from '@/languages/hindi'
import { bengaliLocals } from './languages/bengali'
import { gujaratiLocals } from './languages/gujarati'
import { kannadaLocals } from './languages/kannada'
import { malayalamLocals } from './languages/malayalam'
import { marathiLocals } from './languages/marathi'
import { punjabiLocals } from './languages/punjabi'
import { tamilLocals } from './languages/tamil'
import { teleguLocals } from './languages/telegu'
import { urduLocals } from './languages/urdu'

function getLocalPerson(language: Language): LocalPerson {
  switch (language) {
    case 'Hindi':
      return hindiLocals()
    case 'English':
      return englishLocals()
    case 'Bengali':
      return bengaliLocals()
    case 'Tamil':
      return tamilLocals()
    case 'Telugu':
      return teleguLocals()
    case 'Marathi':
      return marathiLocals()
    case 'Gujarati':
      return gujaratiLocals()
    case 'Kannada':
      return kannadaLocals()
    case 'Malayalam':
      return malayalamLocals()
    case 'Urdu':
      return urduLocals()
    case 'Punjabi':
      return punjabiLocals()
    default:
      throw new Error(`Language "${language}" not supported`)
  }
}

export function word(language: Language): string {
  const localPerson = getLocalPerson(language)
  return localPerson.word()
}

export function phrase(language: Language): string {
  const localPerson = getLocalPerson(language)
  return localPerson.phrase()
}
