import clsx from 'clsx'
import classes from './styles.module.scss'
import {Inputs} from './types'

interface InputContainerProps {
  /**
   * Children of the input container
   */
  children: React.ReactNode
  /**
   * Size of the input container
   */
  size?: 'sm' | 'md' | 'adapt' // sm: 270px, md: 360px, adapt: 100%
  /**
   * Custom classes to be applied to the input container
   */
  customClassName?: string
  /**
   * Custom styles to be applied to the input container
   */
  customStyles?: React.CSSProperties
}

export function InputContainer({
  children,
  customClassName,
  customStyles,
  size = 'adapt',
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
