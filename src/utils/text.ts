export const pluralize = (count: number, singular: string, plural: string) => {
  return count === 1 || count === 0 || count === undefined || count === null ? singular : plural
}
