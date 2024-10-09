import {SelectedTime, PERIOD} from '../types'

/**
 * The default selected time object used to initialize or reset the time picker state.
 *
 * @constant
 * @type {SelectedTime}
 * @property {string} hour - The selected hour, initialized as an empty string.
 * @property {string} minute - The selected minute, initialized as an empty string.
 * @property {string} second - The selected second, initialized as an empty string.
 * @property {PERIOD} period - The selected period (AM/PM), initialized as an empty string casted to PERIOD type.
 */

export const DEFAULT_SELECTED_TIME: SelectedTime = {
  hour: '',
  minute: '',
  second: '',
  period: '' as PERIOD,
}
