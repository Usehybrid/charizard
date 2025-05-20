import AsyncSelect from 'react-select/async'
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
} from './types'
import {Props as ReactSelectProps} from 'react-select'
import {Option} from './types'

export interface AsyncSelectV2Props extends Omit<ReactSelectProps<any, boolean>, 'options'> {
  /**
   * Function that returns a promise with options to be rendered
   */
  loadOptions: (inputValue: string) => Promise<Option[]>

  /**
   * Handle change events on the select
   */
  onChange: (value: string | string[], actionMeta: SelectActionMeta) => void

  /**
   * Custom class name for the main container
   */
  mainContainerClassName?: string

  /**
   * Select variant type
   */
  variant?: SELECT_VARIANT

  /**
   * Whether to show dividers between options
   */
  showDivider?: boolean

  /**
   * Error message to display
   */
  errorMsg?: string

  /**
   * Custom styles to override default styles
   */
  customStyles?: ReactSelectProps['styles']

  /**
   * Default options to display when the menu is first opened
   */
  defaultOptions?: boolean | Option[]

  /**
   * Whether to cache option results
   */
  cacheOptions?: boolean
}

/**
 * A custom async select component based on react-select/async.
 * Loads options asynchronously with support for searching/filtering.
 *
 * @param props - The properties for the AsyncSelectV2 component:
 *   - `loadOptions` (function): A function that returns a promise with options.
 *   - `mainContainerClassName` (string, optional): A custom CSS class name for the main container.
 *   - `variant` (SELECT_VARIANT, optional): Defines the variant of the select component.
 *   - `showDivider` (boolean, optional): Defines whether to add divider between option list.
 *   - `errorMsg` (string, optional): An error message to display below the select component.
 *   - `onChange` (function): Callback function triggered when selected value(s) change.
 *   - `customStyles` (StylesConfig<any>): Custom styles for react select.
 *   - `defaultOptions` (boolean | Option[]): Initial options to display.
 *   - `cacheOptions` (boolean): Whether to cache option results.
 * @returns The AsyncSelectV2 component.
 */
export function AsyncSelectV2(props: AsyncSelectV2Props) {
  const {
    loadOptions,
    mainContainerClassName,
    variant = SELECT_VARIANT.DEFAULT,
    errorMsg,
    onChange,
    showDivider = false,
    customStyles = {},
    defaultOptions = true,
    cacheOptions = true,
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
      <AsyncSelect
        classNamePrefix="react-select"
        loadOptions={loadOptions}
        defaultOptions={defaultOptions}
        cacheOptions={cacheOptions}
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
        menuPortalTarget={document.body}
        menuPosition="fixed"
        {...restProps}
      />
      {errorMsg && (
        <span className={clsx('zap-subcontent-medium', classes.errorMsg)}>{errorMsg}</span>
      )}
    </div>
  )
}
