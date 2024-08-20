import * as React from 'react'
import {InputV2} from './Input'
import {InputGroupV2} from './InputGroup'
import {INPUT_COMPONENTS, InputNumberProps} from './types'
import classes from './styles.module.css'
import {countRegex} from '../../utils/regex'
import {numberInputAllowedKeys} from '../../utils/text'
import clsx from 'clsx'
import NumberAdornment from './NumberAdornment'

export function InputNumber({
  onCountChange,
  min = -Infinity,
  max = Infinity,
  count = 0,
  countContainerClassName,
  disabled = false,
  ...props
}: InputNumberProps) {
  const countHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = +e.target.value

    if (!isNaN(value)) {
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
    <InputGroupV2 className={clsx(classes.numberContainer, countContainerClassName)}>
      <InputV2
        className={classes.countInputContainer}
        {...props}
        disabled={disabled}
        value={count.toString()}
        onChange={countHandler}
        onKeyDown={keyPressHandler}
        placeholder="0"
      />
      <NumberAdornment
        disabled={disabled}
        onIncrement={incrementHandler}
        onDecrement={decrementHandler}
      />
    </InputGroupV2>
  )
}

InputNumber.displayName = INPUT_COMPONENTS.NUMBER
