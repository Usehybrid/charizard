import clsx from 'clsx'
import classes from './styles.module.css'
import {InputControlPropsV2, INPUT_COMPONENTS} from './types'

/**
 * InputControlV2 is a wrapper component that provides a container for form control elements.
 * It applies consistent styling to its children, typically used for grouping form elements like
 * labels, inputs, and additional controls.
 *
 * @param {InputControlPropsV2} props - The properties for the InputControlV2 component.
 * @param {string} [props.className=''] - Additional class names to apply to the control container.
 * @param {React.ReactNode} props.children - The content to be rendered within the control container.
 * @param {React.HTMLAttributes<HTMLDivElement>} [props] - Additional HTML attributes to apply to the control container.
 * 
 * @returns {JSX.Element} The rendered control container with the specified children.
 * 
 * @example
 * <InputControlV2>
 *   <LabelV2>Username</LabelV2>
 *   <InputV2
 *   placeholder="Enter"
 *   errorMsg="This field is required"
 *  />
 * </InputControlV2>
 */
export function InputControlV2({className = '', children, ...props}: InputControlPropsV2) {
  return (
    <div {...props} className={clsx(classes.control, className)}>
      {children}
    </div>
  )
}

InputControlV2.displayName = INPUT_COMPONENTS.CONTROL
