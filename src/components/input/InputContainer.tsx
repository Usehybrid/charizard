import clsx from 'clsx'
import classes from './styles.module.scss'
import {Inputs} from './types'

interface InputContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' // sm: 270px, md: 360px
}

export function InputContainer({size = 'sm', children}: InputContainerProps) {
  return <div className={clsx(classes.inputContainer, classes[size])}>{children}</div>
}

InputContainer.displayName = Inputs.INPUT_CONTAINER
InputContainer.id = Inputs.INPUT_CONTAINER
