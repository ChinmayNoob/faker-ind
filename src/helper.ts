import { getYear, isValid, parseISO, subDays } from 'date-fns'
import { number } from '@/random'

export function slugify(str: string): string {
  return str.replace(/ /g, '-').replace(/[^\w.-]+/g, '')
}

export function pastYear(years: number, refDate: string): number {
  /**
   * If we ever decide to generate dates we
   * can move this function into a date class.
   * For now, this can remain as a helper
   */

  // Parse the reference date, fallback to current date if invalid
  let date: Date
  try {
    const parsedDate = parseISO(refDate)
    date = isValid(parsedDate) ? parsedDate : new Date()
  }
  catch {
    date = new Date()
  }

  // Generate a random number of days in the past (1 day to N years)
  const maxDays = (years || 1) * 365
  const randomDays = number(1, maxDays)

  // Subtract random days from the reference date
  const pastDate = subDays(date, randomDays)

  return getYear(pastDate)
}
