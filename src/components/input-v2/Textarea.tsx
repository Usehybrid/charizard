import * as React from 'react'
import classes from './styles.module.css'
import {TextareaV2Props, INPUT_COMPONENTS} from './types'
import clsx from 'clsx'

/**
 * TextareaV2 is a styled textarea component with optional error message display.
 * It provides a flexible way to render a textarea with custom styles and error handling.
 *
 * @param {TextareaV2Props} props - The properties for the TextareaV2 component.
 * @param {string} [props.errorMsg=''] - Error message to display below the textarea.
 * @param {string} [props.containerClassName=''] - Additional CSS classes to apply to the container.
 * @param {string} [props.className=''] - Additional CSS classes to apply to the textarea.
 * @param {React.CSSProperties} [props.inputStyles={}] - Used for internal styling when grouping it with multiple components. use className for styling textarea.
 * @param {React.CSSProperties} [props.containerStyles={}] -Used for internal styling when grouping it with multiple components. use containerClassName for styling textarea container.
 * @param {React.TextareaHTMLAttributes<HTMLTextAreaElement>} [props] - Other standard textarea attributes.
 * @param {React.Ref<HTMLTextAreaElement>} ref - Ref to the underlying textarea element.
 * @returns {JSX.Element} The rendered TextareaV2 component.
 *
 * @example
 * <TextareaV2
 *   errorMsg="This field is required."
 *   placeholder="Enter text..."
 * />
 */
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
