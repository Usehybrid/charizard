import clsx from 'clsx'
import classes from './styles.module.scss'
import {Inputs} from './types'

interface InputContainerProps {
  children: React.ReactNode
  size?: 'sm' | 'md' | 'adapt' // sm: 270px, md: 360px, adapt: 100%
  customClassName?: string
  customStyles?: React.CSSProperties
}

export function InputContainer({
  size = 'adapt',
  children,
  customClassName,
  customStyles,
}: InputContainerProps) {
  return (
    <div
      className={clsx(classes.inputContainer, classes[size], customClassName)}
      style={customStyles}
    >
      {children}
    </div>
  )
}

InputContainer.displayName = Inputs.INPUT_CONTAINER
InputContainer.id = Inputs.INPUT_CONTAINER
