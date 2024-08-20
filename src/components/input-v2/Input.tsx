import * as React from 'react'
import classes from './styles.module.css'
import {InputV2Props, INPUT_COMPONENTS} from './types'
import clsx from 'clsx'

export const InputV2 = React.forwardRef<HTMLInputElement, InputV2Props>(
  (
    {
      errorMsg = '',
      containerClassName = '',
      className = '',
      inputStyles = {},
      containerStyles = {},
      ...props
    },
    ref,
  ) => {
    return (
      <div className={clsx(classes.inputContainer, containerClassName)} style={containerStyles}>
        <input
          {...props}
          ref={ref}
          className={clsx(
            'zap-content-medium',
            classes.input,
            !!errorMsg && classes.invalid,
            className,
          )}
          style={inputStyles}
        />
        {!!errorMsg && (
          <span className={clsx('zap-subcontent-medium ', classes.error)}>{errorMsg}</span>
        )}
      </div>
    )
  },
)

InputV2.displayName = INPUT_COMPONENTS.INPUT
