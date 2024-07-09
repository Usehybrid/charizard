export const pluralize = (count: number, singular: string, plural: string) => {
  return count === 1 || count === 0 || count === undefined || count === null ? singular : plural
}

export const truncate = (text: string, max?: number) => {
  if (!max) {
    return text
  }
  return text.length > max ? `${text.substring(0, max)}...` : text
}
