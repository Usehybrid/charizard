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

export function InputCount({
  onCountChange,
  min = -Infinity,
  max = Infinity,
  count = 0,
  countContainerClassName,
  disabled,
  ...props
}: InputCountProps) {
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
