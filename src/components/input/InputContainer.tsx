import clsx from 'clsx'
import classes from './styles.module.scss'
import {Inputs} from './types'

interface InputContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'adapt' // sm: 270px, md: 360px, adapt: 100%
}

export function InputContainer({size = 'adapt', children}: InputContainerProps) {
  return <div className={clsx(classes.inputContainer, classes[size])}>{children}</div>
}

InputContainer.displayName = Inputs.INPUT_CONTAINER
InputContainer.id = Inputs.INPUT_CONTAINER
