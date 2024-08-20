import * as React from 'react'
import {InputV2} from './Input'
import {InputGroupV2} from './InputGroup'
import {InputLeftIcon, InputRightIcon} from './InputIcon'
import minusIcon from '../assets/minus-2.svg'
import plusIcon from '../assets/plus.svg'
import {INPUT_COMPONENTS, InputCountProps} from './types'
import classes from './styles.module.css'
import {countRegex} from '../../utils/regex'
import {numberInputAllowedKeys} from '../../utils/text'
import clsx from 'clsx'

/**
 * InputCount is a specialized input component that allows users to increment
 * or decrement a numeric value within a specified range. It includes buttons
 * for incrementing and decrementing the value, and supports keyboard input for
 * adjusting the count.
 *
 * @param {InputCountProps} props - The properties for the InputCount component.
 * @param {(value: number) => void} props.onCountChange - Callback function called when the count value changes.
 * @param {number} [props.min=-Infinity] - The minimum value that the count can be set to.
 * @param {number} [props.max=Infinity] - The maximum value that the count can be set to.
 * @param {number} [props.count=0] - The current count value.
 * @param {string} [props.countContainerClassName] - Additional class names to apply to the container.
 * @param {boolean} [props.disabled] - Whether the input is disabled.
 * @param {React.InputHTMLAttributes<HTMLInputElement>} [props] - Additional HTML input attributes.
 *
 * @returns {JSX.Element} The rendered InputCount component.
 *
 * @example
 * <InputCount
 *   onCountChange={(value) => console.log(value)}
 *   min={0}
 *   max={10}
 *   count={5}
 *   disabled={false}
 * />
 */
export function InputCount({
  onCountChange,
  min = -Infinity,
  max = Infinity,
  count = 0,
  countContainerClassName = '',
  disabled = false,
  ...props
}: InputCountProps) {
  const countHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value

    if (!Number.isNaN(value)) {
      onCountChange?.(value)
    } else {
      onCountChange(0)
    }
  }
  const incrementHandler = () => {
    if (count < max) {
      const value = Math.min(count + 1, max)
      onCountChange(value)
    }
  }

  const decrementHandler = () => {
    if (count > min) {
      const value = Math.max(count - 1, min)
      onCountChange(value)
    }
  }

  const keyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {
    //TODO: @abhishek make it more robust and better / utility function
    const isNumberKey = countRegex.test(e.key)
    const isMinusKey = e.key === '-' && e.currentTarget.selectionStart === 0 && min < 0
    const isSelectAll = (e.ctrlKey || e.metaKey) && e.key === 'a'

    if (e.metaKey) {
      return
    }

    if (e.key === 'ArrowUp') {
      incrementHandler()
    } else if (e.key === 'ArrowDown') {
      decrementHandler()
    } else if (
      !isNumberKey &&
      !numberInputAllowedKeys.includes(e.key) &&
      !isMinusKey &&
      !isSelectAll
    ) {
      e.preventDefault()
    }
  }

  React.useEffect(() => {
    if (count < min) {
      onCountChange(min)
    } else if (count > max) {
      onCountChange(max)
    }
  }, [])

  return (
    <InputGroupV2 className={clsx(classes.countContainer, countContainerClassName)}>
      <InputLeftIcon
        disabled={disabled || count <= min}
        onClick={decrementHandler}
        icon={minusIcon}
        className={classes.decrementIcon}
      />
      <InputV2
        className={classes.countInputContainer}
        {...props}
        disabled={disabled}
        value={count.toString()}
        onChange={countHandler}
        onKeyDown={keyPressHandler}
        placeholder="0"
      />
      <InputRightIcon
        disabled={disabled || count >= max}
        onClick={incrementHandler}
        icon={plusIcon}
        className={classes.incrementIcon}
      />
    </InputGroupV2>
  )
}

InputCount.displayName = INPUT_COMPONENTS.COUNT
