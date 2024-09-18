import {TooltipV2Props} from '../tooltip-v2/TooltipV2'

/**
 * Enum representing the different components within the input system.
 * This can be used to identify and manage the different subcomponents
 * of a more complex and nested input structure.
 */
export enum INPUT_COMPONENTS {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  CONTROL = 'control',
  LABEL = 'label',
  GROUP = 'group',
  LEFT_ICON = 'leftIcon',
  RIGHT_ICON = 'rightIcon',
  LEFT_ADORNMENT = 'leftAdornment',
  RIGHT_ADORNMENT = 'rightAdornment',
  COUNT = 'count',
  NUMBER = 'number',
  NUMBER_ADORNMENT = 'numberAdornment',
}

/**
 * Props for the InputV2 component, which extends the standard HTML input element
 * with additional styling and error handling.
 *
 * @interface InputV2Props
 * @extends {React.InputHTMLAttributes<HTMLInputElement>}
 *
 * @property {string} [errorMsg] - Error message to display below the input if there is a validation error.
 * @property {string} [containerClassName] - Additional class name(s) for the input container div.
 * @property {never} [inputStyles] - Used for internal styling when grouping it with multiple components. use className for styling input.
 * @property {never} [containerStyles] - Used for internal styling when grouping it with multiple components. use containerClassName for styling input container.
 *
 * @example
 * <InputV2
 *   placeholder="Enter"
 *   errorMsg="This field is required"
 * />
 * @example
 * with formik
 * <InputV2
 *   {...formik.getFieldProps(key)}
 *   placeholder="Enter"
 *   errorMsg="This field is required"
 * />
 */
export interface InputV2Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMsg?: string
  containerClassName?: string
  inputStyles?: never
  containerStyles?: never
}

/**
 * Props for the TextareaV2 component, which extends the standard HTML textarea element
 * with additional styling and error handling.
 *
 * @interface InputV2Props
 * @extends {React.TextareaHTMLAttributes<HTMLTextAreaElement>}
 *
 *
 * @property {string} [errorMsg] - Error message to display below the textarea if there is a validation error.
 * @property {string} [containerClassName] - Additional class name(s) for the textarea container div.
 * @property {never} [inputStyles] - Used for internal styling when grouping it with multiple components. use className for styling textarea.
 * @property {never} [containerStyles] - Used for internal styling when grouping it with multiple components. use containerClassName for styling textarea container.
 *
 * @example
 * <TextareaV2
 *   placeholder="Enter"
 *   errorMsg="This field is required"
 * />
 * @example
 * with formik
 * <TextareaV2
 *   {...formik.getFieldProps(key)}
 *   placeholder="Enter"
 *   errorMsg="This field is required"
 * />
 */
export interface TextareaV2Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMsg?: string
  containerClassName?: string
  inputStyles?: never
  containerStyles?: never
}

/**
 * Props for the InputControl component, used as a wrapper to group multiple input-related components.
 *
 * @interface InputControlPropsV2
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 *
 * @property {React.ReactNode} children - The elements that will be rendered inside the control.
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
export interface InputControlPropsV2 extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * Props for the Label component, used to provide descriptive text for form inputs.
 *
 * @interface LabelPropsV2
 * @extends {React.LabelHTMLAttributes<HTMLLabelElement>}
 *
 * @property {React.ReactNode} children - The text or elements inside the label.
 * @property {string} [info] - Additional info to display, such as help text in tooltip.
 * @property {boolean} [disabled] - Whether the associated input is disabled.
 * @property {boolean} [required] - Whether the field is required (red * will be shown beside label).
 * @property {Partial<TooltipV2Props>} [tooltipProps] - Props for the tooltip, if additional information is provided and want to customize tooltip styles.
 *
 * @example
 * <LabelV2 info="Your full name">Name</LabelV2>
 */
export interface LabelPropsV2 extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  info?: string
  disabled?: boolean
  required?: boolean
  tooltipProps?: Partial<TooltipV2Props>
}

/**
 * Props for the InputGroup component, which groups input icons and adornments elements together.
 *
 * @interface InputGroupPropsV2
 * @extends {React.HTMLAttributes<HTMLDivElement>}
 *
 * @property {React.ReactNode} children - The elements to be grouped together.
 *
 * @example
 * <InputGroupV2>
 *   <InputLeftAdornment>+</InputLeftAdornment>
 *   <InputV2 />
 *   <InputRightAdornment>-</InputRightAdornment>
 * </InputGroupV2>
 * @example
 * with label
 * <InputControlV2>
 *   <LabelV2>Username</LabelV2>
 *   <InputGroupV2>
 *     <InputLeftAdornment>+</InputLeftAdornment>
 *     <InputV2 />
 *     <InputRightAdornment>-</InputRightAdornment>
 *   </InputGroupV2>
 * </InputControlV2>
 */
export interface InputGroupPropsV2 extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

/**
 * Props for the InputIcon component, which is used to display an icon within an input field. It can be left, right or both.
 *
 * @interface InputIconProps
 *
 * @property {string} icon - The icon to display.
 * @property {() => void} [onClick] - Optional click handler for the icon.
 * @property {never} [iconStyles] - Used for internal styling when grouping it with multiple components. use className for styling icon if clickable.
 * @property {boolean} [disabled] - Whether the icon should be disabled with input.
 * @property {string} [className] - Additional classNames for the icon if it is clickable.
 *
 * @example
 *  <InputGroupV2>
 *   <InputLeftIcon icon={...} />
 *   <InputV2 />
 *   <InputRightIcon icon={...} />
 * </InputGroupV2>
 */
export interface InputIconProps {
  icon: string
  onClick?: () => void
  iconStyles?: never
  disabled?: boolean
  className?: string
}

/**
 * Represents an option in a dropdown menu for adornment.
 *
 * @interface DropdownOption
 *
 * @property {string} value - The value associated with the dropdown option.
 * @property {string} label - The label displayed for the dropdown option.
 *
 * @example
 * const options: DropdownOption[] = [
 *   { value: '1', label: 'Option 1' },
 *   { value: '2', label: 'Option 2' },
 * ];
 */
export interface DropdownOption {
  value: string
  label: string
}

/**
 * Base props for input adornment components. It can be dropdown or non actionable
 *
 * @interface BaseInputAdornmentProps
 *
 * @property {React.ReactNode} children - The elements or text inside the adornment.
 * @property {boolean} [disabled] - Whether the adornment is disabled.
 */
export interface BaseInputAdornmentProps {
  children: React.ReactNode
  disabled?: boolean
}

/**
 * Props for a dropdown adornment.
 *
 * @interface DropdownProps
 * @extends {BaseInputAdornmentProps}
 *
 * @property {true} isDropdown - Indicates this adornment is a dropdown.
 * @property {DropdownOption[]} options - List of options available in the dropdown.
 * @property {(value: string) => void} onOptionSelect - Callback function when an option is selected.
 * @property {boolean} [hideSearch] - Whether to hide the search bar within the dropdown.
 * @property {boolean} [isLoading] - Whether the dropdown is currently loading options.
 *
 * @example
 *  <InputGroupV2>
 *   <InputLeftAdornment isDropdown options={options} onOptionSelect={handleSelect}>...</InputLeftAdornment>
 *   <InputV2 />
 * </InputGroupV2>
 */
export interface DropdownProps extends BaseInputAdornmentProps {
  isDropdown: true
  options: DropdownOption[]
  onOptionSelect: (value: string) => void
  hideSearch?: boolean
  isLoading?: boolean
}

/**
 * Props for a non-dropdown adornment within an input field, such as an icon.
 *
 * @interface NonDropdownProps
 * @extends {BaseInputAdornmentProps}
 *
 * @property {false} [isDropdown] - Indicates this adornment is not a dropdown.
 * @property {never} [options] - Options are not applicable to non-dropdown adornments.
 * @property {never} [hideSearch] - Search hiding is not applicable to non-dropdown adornments.
 * @property {never} [onOptionSelect] - Option selection is not applicable to non-dropdown adornments.
 * @property {never} [isLoading] - Loading state is not applicable to non-dropdown adornments.
 *
 * @example
 * @example
 *  <InputGroupV2>
 *   <InputV2 />
 *   <InputRightAdornment>...</InputRightAdornment>
 * </InputGroupV2>
 */
export interface NonDropdownProps extends BaseInputAdornmentProps {
  isDropdown?: false
  options?: never
  hideSearch?: never
  onOptionSelect?: never
  isLoading?: never
}

/**
 * Type representing the possible props for input adornments, which can either be a dropdown or non actionable.
 */
export type InputAdornmentProps = DropdownProps | NonDropdownProps

/**
 * Props for an input field which can be use as counter i.e. product count.
 *
 * @interface InputCountProps
 * @extends {InputV2Props}
 *
 * @property {(value: number) => void} onCountChange - Callback when the count changes.
 * @property {never} [onChange] - `onChange` is disabled for this component; use `onCountChange`.
 * @property {number} [min] - Minimum allowable value for the count (by default Infinity).
 * @property {number} [max] - Maximum allowable value for the count (by default Infinity).
 * @property {number} [count] - Current count value (enable for two way binding).
 * @property {string} [countContainerClassName] - Additional className for the count container.
 *
 * @example
 * <InputCount onCountChange={(value) => ...} count={10} min={0} max={100} />
 */
export interface InputCountProps extends InputV2Props {
  onCountChange: (value: number) => void
  onChange?: never
  min?: number
  max?: number
  count?: number
  countContainerClassName?: string
}

/**
 * Props for an input field designed to accept numeric values.
 *
 * @interface InputNumberProps
 * @extends {InputV2Props}
 *
 * @property {(value: number) => void} onCountChange - Callback when the numeric value changes.
 * @property {never} [onChange] - `onChange` is disabled for this component; use `onCountChange`.
 * @property {number} [min] - Minimum allowable value for the input (by default Infinity)
 * @property {number} [max] - Maximum allowable value for the input (by default Infinity)
 * @property {number} [count] - Current numeric value (enable for two way binding).
 * @property {string} [countContainerClassName] -Additional className for the count container.
 *
 * @example
 * <InputNumber onCountChange={(value) => ...)} count={5} min={0} max={10} />
 */
export interface InputNumberProps extends InputV2Props {
  onCountChange: (value: number) => void
  onChange?: never
  min?: number
  max?: number
  count?: number
  countContainerClassName?: string
}

/**
 * Props for a number increment/decrement adornment in an InputNumber field.
 *
 * @interface NumberAdornmentProps
 *
 * @property {() => void} onIncrement - Callback when the increment button is clicked.
 * @property {() => void} onDecrement - Callback when the decrement button is clicked.
 * @property {boolean} [disabled] - Whether the increment/decrement buttons are disabled.
 * @property {never} [incrementBtnStyles] - Used for internal styling when grouping it with multiple components.
 * @property {never} [decrementBtnStyles] - Used for internal styling when grouping it with multiple components.
 *
 * @example
 * <NumberAdornment onIncrement={() => increment()} onDecrement={() => decrement()} />
 */
export interface NumberAdornmentProps {
  onIncrement: () => void
  onDecrement: () => void
  disabled?: boolean
  incrementBtnStyles?: never
  decrementBtnStyles?: never
}
