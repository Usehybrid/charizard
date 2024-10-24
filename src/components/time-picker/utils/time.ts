import {PERIOD, TIME_PICKER_FORMAT} from '../types'

/**
 * Converts a timestamp to a formatted time string.
 *
 * @param {number} timestamp - The timestamp to convert (in milliseconds).
 * @param {TIME_PICKER_FORMAT} [timeFormat=TIME_PICKER_FORMAT.STANDARD] - The desired time format (12-hour or 24-hour).
 * @param {boolean} [enableSeconds=false] - Whether to include seconds in the formatted time string.
 * @returns {string} - The formatted time string.
 *
 * @example
 * // Returns "02:30 PM"
 * convertFromTimestamp(1620000000000, TIME_PICKER_FORMAT.STANDARD);
 *
 * @example
 * // Returns "14:30:45"
 * convertFromTimestamp(1620000000000, TIME_PICKER_FORMAT.MILITARY, true);
 */
export const convertFromTimestamp = (
  timestamp: number,
  timeFormat: TIME_PICKER_FORMAT = TIME_PICKER_FORMAT.STANDARD,
  enableSeconds: boolean = false,
): string => {
  const date = new Date(timestamp)

  let hours = date.getHours()
  const minutes = date.getMinutes()
  const seconds = date.getSeconds()

  let period = ''

  if (timeFormat === TIME_PICKER_FORMAT.STANDARD) {
    period = hours >= 12 ? 'PM' : 'AM'
    hours = hours % 12 || 12
  }

  const formattedHours = hours.toString().padStart(2, '0')
  const formattedMinutes = minutes.toString().padStart(2, '0')
  const formattedSeconds = seconds.toString().padStart(2, '0')

  let timeString = `${formattedHours}:${formattedMinutes}`

  if (enableSeconds) {
    timeString += `:${formattedSeconds}`
  }

  if (timeFormat === TIME_PICKER_FORMAT.STANDARD) {
    timeString += ` ${period}`
  }

  return timeString
}

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

  if (period === PERIOD.PM) {
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
export const amPm = [PERIOD.AM, PERIOD.PM]

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
