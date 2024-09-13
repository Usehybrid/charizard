import {differenceInCalendarDays, parseISO} from 'date-fns'

export const isDatePassedOrSame = (date?: string) => {
  if (!date) return false
  const today = Date.UTC(new Date().getFullYear(), new Date().getMonth(), new Date().getDate())
  const diffDays = differenceInCalendarDays(parseISO(date), today)
  console.log('passed', {diffDays})

  return diffDays <= 0
}
