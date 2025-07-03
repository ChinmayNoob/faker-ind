const _Gender = {
  MALE: 'MALE',
  FEMALE: 'FEMALE',
} as const

export { _Gender as Gender }
export type Gender = (typeof _Gender)[keyof typeof _Gender]
