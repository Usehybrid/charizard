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
  CustomLoadingIndicator,
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
 *   - `showDivider` (boolean, optional): Defines whether to add divider between option list.
 *   - `errorMsg` (string, optional): An error message to display below the select component for validation purposes.
 *   - `onChange` (function): A callback function that is triggered when the selected value(s) change. It receives the selected value(s) and action meta information.
 *   - `customStyles` (StylesConfig<any>): custom styles for react select. it will override default styles
 * @returns The SelectV2 component.
 */
export function SelectV2(props: SelectV2Props) {
  const {
    options,
    mainContainerClassName,
    variant = SELECT_VARIANT.DEFAULT,
    errorMsg,
    onChange,
    showDivider = false,
    customStyles = {},
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
    <div
      className={clsx(
        classes.mainContainer,
        props.isDisabled && classes.disabled,
        'zap-content-medium',
        mainContainerClassName,
      )}
    >
      <ReactSelect
        classNamePrefix="react-select"
        options={options}
        unstyled
        styles={{...styles, ...customStyles}}
        isClearable
        isSearchable
        hideSelectedOptions={false}
        components={{
          Option: CustomOption,
          MultiValue: CustomMultiValue,
          MultiValueRemove: CustomMultiValueRemove,
          DropdownIndicator: CustomDropdownIndicator,
          ClearIndicator: CustomClearIndicator,
          SingleValue: CustomSingleValue,
          Menu: CustomMenu,
          IndicatorsContainer: CustomIndicatorsContainer,
          LoadingIndicator: CustomLoadingIndicator,
        }}
        onChange={selectOptionHandler}
        data-variant={variant}
        data-divider={showDivider}
        {...restProps}
      />
      {errorMsg && (
        <span className={clsx('zap-subcontent-medium', classes.errorMsg)}>{errorMsg}</span>
      )}
    </div>
  )
}
