import {SVG} from '../svg'
import {INPUT_COMPONENTS, NumberAdornmentProps} from './types'
import classes from './styles.module.css'
import chevronUpIcon from '../assets/chevron-up.svg'
import chevronDownIcon from '../assets/chevron-down.svg'

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
