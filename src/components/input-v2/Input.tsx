import * as React from 'react'
import classes from './styles.module.css'
import {InputV2Props, INPUT_COMPONENTS} from './types'
import clsx from 'clsx'


/**
 * InputV2 component - A custom input component with extended functionality and built-in error handling.
 * 
 * @param {InputV2Props} props - The props object containing configurations and attributes for the input element.
 * @param {React.Ref<HTMLInputElement>} ref - A React ref that can be used to access the input element directly.
 * 
 * @returns {JSX.Element} A JSX element representing the custom input field.
 *
 * @example
 * <InputV2 placeholder="Enter your name" />
 *
 * @example
 * <InputV2 errorMsg="Name is required" placeholder="Enter your name" />
 * @example
 * with formik
 * <InputV2 {...formik.getFieldProps(key)} placeholder="Enter your name" />
 */
export const InputV2 = React.forwardRef<HTMLInputElement, InputV2Props>(
  (
    {
      errorMsg = '',
      containerClassName = '',
      className = '',
      inputStyles = {},
      containerStyles = {},
      onErrorHeightChange,
      ...props
    },
    ref,
  ) => {
    const errorRef = React.useRef<HTMLSpanElement>(null)

    React.useEffect(() => {
      if (errorRef.current && onErrorHeightChange) {
        onErrorHeightChange(errorRef.current.offsetHeight)
      }
    }, [errorMsg, onErrorHeightChange])

    return (
      <div className={clsx(classes.inputContainer, containerClassName)} style={containerStyles}>
        <input
          {...props}
          ref={ref}
          className={clsx(
            'zap-content-medium',
            classes.input,
            errorMsg && classes.invalid,
            className,
          )}
          style={inputStyles}
        />
        {errorMsg && (
          <span ref={errorRef} className={clsx('zap-subcontent-medium', classes.error)}>
            {errorMsg}
          </span>
        )}
      </div>
    )
  },
)

InputV2.displayName = INPUT_COMPONENTS.INPUT
