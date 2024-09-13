import {differenceInCalendarDays, parseISO} from 'date-fns'

export const isDatePassed = (date?: string) => {
  if (!date) return false
  const today = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
  const diffDays = differenceInCalendarDays(parseISO(date), today)
  return diffDays < 0
}
