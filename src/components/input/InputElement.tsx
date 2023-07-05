import clsx from 'clsx'
import classes from './styles.module.scss'
import {Inputs, Placement} from './types'

interface InputElementProps {
  children: React.ReactNode
  placement?: Placement
}

function InputElement({children, placement = 'left'}: InputElementProps) {
  const attr = placement === 'left' ? 'left' : 'right'

  return <div className={clsx(classes.inputElement, classes[attr])}>{children}</div>
}

interface InputDirectionElementProps {
  children: React.ReactNode
}

export function InputLeftElement({children}: InputDirectionElementProps) {
  return <InputElement placement="left">{children}</InputElement>
}

export function InputRightElement({children}: InputDirectionElementProps) {
  return <InputElement placement="right">{children}</InputElement>
}

InputElement.displayName = Inputs.INPUT_ELEMENT
InputElement.id = Inputs.INPUT_ELEMENT

InputLeftElement.displayName = Inputs.INPUT_LEFT_ELEMENT
InputLeftElement.id = Inputs.INPUT_LEFT_ELEMENT

InputRightElement.displayName = Inputs.INPUT_RIGHT_ELEMENT
InputRightElement.id = Inputs.INPUT_RIGHT_ELEMENT
