import ReactSelect from 'react-select'
import clsx from 'clsx'
import {styles} from './styles'
import classes from './styles.module.css'
import {
  CustomDropdownIndicator,
  CustomMenu,
  CustomIndicatorsContainer,
  CustomOption,
  CustomSingleValue,
  CustomMultiValue,
  CustomClearIndicator,
  CustomMultiValueRemove,
} from './Common'
import {
  SELECT_VARIANT,
  SelectActionMeta,
  SelectMultiValue,
  SelectSingleValue,
  SelectV2Props,
  SelectValue,
} from './types'

/**
 * A custom select component based on react-select.
 * @param props - The properties for the SelectV2 component:
 *   - `options` (Array<Option>): An array of options to be displayed in the dropdown. Each option can include a label, value, and optional profile image or icon.
 *   - `mainContainerClassName` (string, optional): A custom CSS class name to apply to the main container for additional styling.
 *   - `variant` (SELECT_VARIANT, optional): Defines the variant of the select component (e.g., 'default', 'users', 'checkbox', 'tags') to control the styling and behavior.
 *   - `errorMsg` (string, optional): An error message to display below the select component for validation purposes.
 *   - `onChange` (function): A callback function that is triggered when the selected value(s) change. It receives the selected value(s) and action meta information.
 * @returns The SelectV2 component.
 */
export function SelectV2(props: SelectV2Props) {
  const {
    options,
    mainContainerClassName,
    variant = SELECT_VARIANT.DEFAULT,
    errorMsg,
    onChange,
    ...restProps
  } = props

  /**
   * Handles the change event for the select component.
   * Processes the selected value(s) and triggers the provided onChange handler.
   * @param value - The selected value(s) from the select component.
   * @param meta - The action meta information from the select event.
   */
  const selectOptionHandler = (value: SelectValue, meta: SelectActionMeta) => {
    if (restProps.isMulti) {
      const selectedValues = (value as SelectMultiValue).map(selected => {
        return selected.value
      })
      onChange(selectedValues, meta)
      return
    }
    onChange((value as SelectSingleValue)?.value || '', meta)
  }
  return (
    <div className={clsx(classes.mainContainer, 'zap-content-medium', mainContainerClassName)}>
      <ReactSelect
        classNamePrefix="react-select"
        options={options}
        unstyled
        styles={styles}
        isClearable
        isSearchable
        hideSelectedOptions={false}
        components={{
          Option: props => <CustomOption {...props} variant={variant} />,
          MultiValue: props => <CustomMultiValue {...props} variant={variant} />,
          MultiValueRemove: props => <CustomMultiValueRemove {...props} variant={variant} />,
          DropdownIndicator: props => <CustomDropdownIndicator {...props} variant={variant} />,
          ClearIndicator: props => <CustomClearIndicator {...props} variant={variant} />,
          SingleValue: props => <CustomSingleValue {...props} variant={variant} />,
          Menu: props => <CustomMenu {...props} variant={variant} />,
          IndicatorsContainer: props => <CustomIndicatorsContainer {...props} variant={variant} />,
        }}
        onChange={selectOptionHandler}
        {...restProps}
      />
      {errorMsg && (
        <span className={clsx(classes.errorMsg, 'zap-subcontent-regular')}>{errorMsg}</span>
      )}
    </div>
  )
}
