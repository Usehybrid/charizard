import CreatableSelect from 'react-select/creatable'
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
  SelectValue,
  CreatableSelectV2Props,
} from './types'

/**
 * A custom creatable select component based on react-select/creatable.
 * Allows users to create new options when they don't exist in the predefined options list.
 *
 * @param props - The properties for the CreatableSelectV2 component:
 *   - `options` (Array<Option>): An array of options to be displayed in the dropdown.
 *   - `mainContainerClassName` (string, optional): A custom CSS class name for the main container.
 *   - `variant` (SELECT_VARIANT, optional): Defines the variant of the select component.
 *   - `showDivider` (boolean, optional): Defines whether to add divider between option list.
 *   - `errorMsg` (string, optional): An error message to display below the select component.
 *   - `onChange` (function): Callback function triggered when selected value(s) change.
 *   - `onCreateOption` (function): Callback function triggered when a new option is created.
 *   - `customStyles` (StylesConfig<any>): Custom styles for react select.
 * @returns The CreatableSelectV2 component.
 */
export function CreatableSelectV2(props: CreatableSelectV2Props) {
  const {
    options,
    mainContainerClassName,
    variant = SELECT_VARIANT.DEFAULT,
    errorMsg,
    onChange,
    onCreateOption,
    showDivider = false,
    customStyles = {},
    isLoading,
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

  /**
   * Handles the creation of a new option.
   * Calls the provided onCreateOption handler with the input value.
   * @param inputValue - The input value for the new option.
   */
  const handleCreateOption = async (inputValue: string) => {
    if (inputValue.trim() === '') return

    try {
      await onCreateOption(inputValue)
    } catch (error) {
      console.error('Error creating option:', error)
    }
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
      <CreatableSelect
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
        onCreateOption={handleCreateOption}
        data-variant={variant}
        data-divider={showDivider}
        menuPortalTarget={document.body}
        menuPosition="fixed"
        isLoading={isLoading}
        formatCreateLabel={inputValue => `Create "${inputValue}"`}
        {...restProps}
      />
      {errorMsg && (
        <span className={clsx('zap-subcontent-medium', classes.errorMsg)}>{errorMsg}</span>
      )}
    </div>
  )
}
