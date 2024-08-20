import * as React from 'react'
import classes from './styles.module.css'
import {TextareaV2Props, INPUT_COMPONENTS} from './types'
import clsx from 'clsx'

export const TextareaV2 = React.forwardRef<HTMLTextAreaElement, TextareaV2Props>(
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
      <div className={clsx(classes.textareaContainer, containerClassName)} style={containerStyles}>
        <textarea
          {...props}
          ref={ref}
          className={clsx(
            'zap-content-medium',
            classes.input,
            classes.textarea,
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

TextareaV2.displayName = INPUT_COMPONENTS.TEXTAREA
