import {SVG} from '../svg'
import {INPUT_COMPONENTS, NumberAdornmentProps} from './types'
import classes from './styles.module.css'
import chevronUpIcon from '../assets/chevron-up.svg'
import chevronDownIcon from '../assets/chevron-down.svg'

/**
 * NumberAdornment provides increment and decrement buttons for numeric inputs.
 * It allows users to adjust the numeric value up or down within a controlled component i.e. InputNumber.
 *
 * @param {NumberAdornmentProps} props - The properties for the NumberAdornment component.
 * @param {() => void} [props.onDecrement] - Callback function to be called when the decrement button is clicked.
 * @param {() => void} [props.onIncrement] - Callback function to be called when the increment button is clicked.
 * @param {boolean} [props.disabled=false] - Whether the buttons are disabled or not.
 * @returns {JSX.Element} The rendered NumberAdornment component.
 *
 * @example
 * <NumberAdornment
 *   onIncrement={handleIncrement}
 *   onDecrement={handleDecrement}
 *   disabled={false}
 * />
 */
export default function NumberAdornment({
  onDecrement,
  onIncrement,
  disabled = false,
}: NumberAdornmentProps) {
  return (
    <div className={classes.numberAdornmentContainer}>
      <button onClick={onIncrement} className={classes.incrementBtn} disabled={disabled}>
        <SVG
          path={chevronUpIcon}
          spanClassName={classes.incrementIconContainer}
          svgClassName={classes.incrementIcon}
        />
      </button>
      <button onClick={onDecrement} className={classes.decrementBtn} disabled={disabled}>
        <SVG
          path={chevronDownIcon}
          spanClassName={classes.decrementIconContainer}
          svgClassName={classes.decrementIcon}
        />
      </button>
    </div>
  )
}

NumberAdornment.displayName = INPUT_COMPONENTS.NUMBER_ADORNMENT
