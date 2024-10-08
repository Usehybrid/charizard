import {TIME_PICKER_FORMAT} from '../types'

/**
 * Converts a time string (e.g., "12:30 PM") to a timestamp
 * @param {string} timeString - The time string to convert
 * @returns {number} - The timestamp in milliseconds
 */
export const convertToTimestamp = (timeString: string): number => {
  const [time, period] = timeString.split(' ')
  const [h = '0', m = '0', s = '0'] = time.split(':').map(num => num || '0')

  const hours = Number(h)
  const minutes = Number(m)
  const seconds = Number(s)

  let adjustedHour = hours

  if (period === 'PM') {
    if (adjustedHour < 12) {
      adjustedHour += 12
    }
  }

  const now = new Date()
  now.setHours(adjustedHour)
  now.setMinutes(minutes)
  now.setSeconds(seconds)

  return now.getTime()
}

/**
 * Array of hours (1-12) formatted as strings
 * @type {string[]}
 */
export const hours = Array.from({length: 12}, (_, i) => String(i + 1).padStart(2, '0'))
/**
 * Array of minutes (0-59) formatted as strings
 * @type {string[]}
 */
export const minutes = Array.from({length: 60}, (_, i) => String(i).padStart(2, '0'))
/**
 * Array of seconds (0-59) formatted as strings
 * @type {string[]}
 */
export const seconds = Array.from({length: 60}, (_, i) => String(i).padStart(2, '0'))
/**
 * Array representing AM/PM values
 * @type {string[]}
 */
export const amPm = ['AM', 'PM']

/**
 * Formats a given value (hours, minutes, seconds) based on the time format (12-hour or 24-hour)
 * @param {number} value - The value to format
 * @param {TIME_PICKER_FORMAT} format - The time format (12-hour or 24-hour)
 * @param {boolean} [isHour=false] - Whether the value is an hour (affects formatting logic)
 * @returns {string} - The formatted time value
 */
export const getFormattedTime = (value: number, format: TIME_PICKER_FORMAT, isHour = false) => {
  if (isHour) {
    return format === TIME_PICKER_FORMAT.STANDARD
      ? value % 12 === 0
        ? '12'
        : String(value % 12).padStart(2, '0')
      : String(value).padStart(2, '0')
  }
  return String(value).padStart(2, '0')
}
