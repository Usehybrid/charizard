export const pluralize = (count: number, singular: string, plural: string) => {
  return count === 1 || count === 0 || count === undefined || count === null ? singular : plural
}

export const truncate = (text: string, max?: number) => {
  if (!max) {
    return text
  }
  return text.length > max ? `${text.substring(0, max)}...` : text
}

export const getInitials = (name: string) => {
  const nameParts = name.split(' ').filter(Boolean)
  return nameParts.slice(0, 2).reduce((acc, part) => acc + (part[0] || '').toUpperCase(), '')
}