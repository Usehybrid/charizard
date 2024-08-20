import clsx from 'clsx'
import classes from './styles.module.css'
import {InputControlPropsV2, INPUT_COMPONENTS} from './types'

export function InputControlV2({className = '', children, ...props}: InputControlPropsV2) {
  return (
    <div {...props} className={clsx(classes.control, className)}>
      {children}
    </div>
  )
}

InputControlV2.displayName = INPUT_COMPONENTS.CONTROL
