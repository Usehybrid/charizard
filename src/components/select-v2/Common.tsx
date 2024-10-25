import closeIcon from '../assets/close.svg'
import chevronDownIcon from '../assets/chevron-down-16.svg'
import checkIcon from '../assets/check.svg'
import {components} from 'react-select'
import {SVG} from '../svg'
import clsx from 'clsx'
import classes from './styles.module.css'
import {SELECT_VARIANT} from './types'
import {AsyncImage} from '../asyncImage'
import {Loader} from '../loader'
import {useColorsFromWord} from '../../hooks'
import {getInitials, lightenHexColor} from '../../utils'

/**
 * Custom Dropdown Indicator component for react-select.
 * Displays a chevron icon indicating the dropdown menu if isDisabled is false.
 * @param props - The props for the DropdownIndicator component, including any react-select specific props.
 * @returns A custom DropdownIndicator component with a chevron icon.
 */
export const CustomDropdownIndicator = (props: any) => {
  const {isDisabled, selectProps} = props

  if (isDisabled || selectProps.isLoading) {
    return null
  }

  return (
    <components.DropdownIndicator {...props}>
      <SVG path={chevronDownIcon} spanClassName={classes.dropdownIcon} />
    </components.DropdownIndicator>
  )
}

/**
 * Custom Loading Indicators component for react-select.
 * @param props - The props for the LoadingIndicator component, including any react-select specific props.
 * @returns The LoadingIndicator component if the select is loading.
 */
export const CustomLoadingIndicator = (props: any) => {
  return <Loader size={14} {...props} />
}

/**
 * Custom Indicators Container component for react-select.
 * Conditionally hides the indicators container if the select is in a loading state.
 * @param props - The props for the IndicatorsContainer component, including any react-select specific props.
 * @returns The IndicatorsContainer component or null if the select is loading.
 */
export const CustomIndicatorsContainer = (props: any) => {
  return <components.IndicatorsContainer {...props} />
}

/**
 * Custom Menu component for react-select.
 * Displays a loading message if the select is in a loading state.
 * @param props - The props for the Menu component, including any react-select specific props.
 * @returns The Menu component with a loading message or the default menu content.
 */
export const CustomMenu = (props: any) => {
  return (
    <components.Menu {...props}>
      {props.selectProps.isLoading ? (
        <div className={classes.loadingMessage}>Loading options...</div>
      ) : (
        props.children
      )}
    </components.Menu>
  )
}

/**
 * Custom Option component for react-select.
 * Renders each option with profile image, icon, and custom styles based on variant and selection state.
 * @param props - The props for the Option component, including any react-select specific props.
 * @returns The custom Option component with profile image, icon, and styled label.
 */
export const CustomOption = (props: any) => {
  const {data, isSelected, isMulti, selectProps} = props
  const variant = selectProps['data-variant']
  const showDivider = selectProps['data-divider']

  const {label, subLabel, profileImgUrl, icon, color} = data

  const {darkerColor, lighterColor} = useColorsFromWord(label)

  return (
    <components.Option
      {...props}
      className={clsx(classes.optionContainer, showDivider && classes.divider)}
    >
      <div
        className={clsx(
          classes.option,
          isMulti ? 'zap-caption-medium' : 'zap-subcontent-medium',
          isMulti && variant === SELECT_VARIANT.TAGS && classes.tagOption,
          isMulti && (variant === SELECT_VARIANT.USERS || profileImgUrl) && classes.userOption,
        )}
        style={
          isMulti && (variant === SELECT_VARIANT.TAGS || variant === SELECT_VARIANT.USERS)
            ? {backgroundColor: color ? lightenHexColor(color) : lighterColor}
            : {}
        }
      >
        {profileImgUrl && (
          <AsyncImage src={profileImgUrl} alt={label} className={classes.profileImg} />
        )}
        {variant === SELECT_VARIANT.USERS && !profileImgUrl && (
          <div className={classes.initials}>{getInitials(label)}</div>
        )}
        {icon && <SVG path={icon} spanClassName={classes.icon} />}
        <div className={classes.labelContainer}>
          <span
            className={clsx(classes.label, isSelected && classes.selectedLabel)}
            style={
              isMulti && (variant === SELECT_VARIANT.TAGS || variant === SELECT_VARIANT.USERS)
                ? {color: color || darkerColor}
                : {}
            }
          >
            {label}
          </span>
          {subLabel && <div className={clsx(classes.info, 'zap-caption-regular')}>{subLabel}</div>}
        </div>
      </div>
      {isSelected && <SVG path={checkIcon} spanClassName={classes.selectedIcon} />}
    </components.Option>
  )
}

/**
 * Custom Single Value component for react-select.
 * Displays the selected single value with profile image or icon.
 * @param props - The props for the SingleValue component, including any react-select specific props.
 * @returns The custom SingleValue component with profile image or icon.
 */
export const CustomSingleValue = (props: any) => {
  const {data} = props
  const {label, profileImgUrl, icon} = data
  return (
    <components.SingleValue {...props}>
      <div className={clsx(classes.option, classes.selectedOption)}>
        {profileImgUrl && (
          <AsyncImage src={profileImgUrl} alt={label} className={classes.profileImg} />
        )}
        {icon && <SVG path={icon} spanClassName={classes.icon} />}
        <div className={classes.labelContainer}>
          <span className={classes.label}>{label}</span>
        </div>
      </div>
    </components.SingleValue>
  )
}

/**
 * Custom Multi Value component for react-select.
 * Displays the selected multi-value items with custom styles and profile image or icon.
 * @param props - The props for the MultiValue component, including any react-select specific props.
 * @returns The custom MultiValue component with profile image, icon, and styled label.
 */
export const CustomMultiValue = (props: any) => {
  const {data, selectProps} = props
  const {label, profileImgUrl, icon, color} = data
  const {isMulti} = selectProps
  const variant = selectProps['data-variant']

  const {darkerColor, lighterColor} = useColorsFromWord(label)
  return (
    <div
      className={clsx(
        classes.option,
        classes.multiOptionValue,
        isMulti && 'zap-caption-medium',
        isMulti && (variant === SELECT_VARIANT.USERS || profileImgUrl) && classes.userOptionValue,
      )}
      style={
        isMulti && (variant === SELECT_VARIANT.TAGS || variant === SELECT_VARIANT.USERS)
          ? {backgroundColor: color ? lightenHexColor(color) : lighterColor}
          : {}
      }
    >
      <components.MultiValue {...props}>
        {profileImgUrl && (
          <AsyncImage src={profileImgUrl} alt={label} className={classes.profileImg} />
        )}
        {variant === SELECT_VARIANT.USERS && !profileImgUrl && (
          <div className={classes.initials}>{getInitials(label)}</div>
        )}
        {icon && <SVG path={icon} spanClassName={classes.icon} />}
        <div className={classes.labelContainer}>
          <span
            className={classes.label}
            style={
              isMulti && (variant === SELECT_VARIANT.TAGS || variant === SELECT_VARIANT.USERS)
                ? {color: color || darkerColor}
                : {}
            }
          >
            {label}
          </span>
        </div>
      </components.MultiValue>
    </div>
  )
}

/**
 * Custom Multi Value Remove component for react-select.
 * Provides a remove icon for multi-value items.
 * @param props - The props for the MultiValueRemove component, including any react-select specific props.
 * @returns The custom MultiValueRemove component with a close icon.
 */
export const CustomMultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove {...props}>
      <SVG path={closeIcon} spanClassName={classes.removeIcon} />
    </components.MultiValueRemove>
  )
}

/**
 * Custom Clear Indicator component for react-select.
 * Displays a clear icon for single value selects when applicable.
 * @param props - The props for the ClearIndicator component, including any react-select specific props.
 * @returns The custom ClearIndicator component with a close icon or null if multi-select.
 */
export const CustomClearIndicator = (props: any) => {
  const {isMulti} = props
  if (isMulti) {
    return null
  }

  return (
    <components.ClearIndicator {...props}>
      <SVG path={closeIcon} spanClassName={classes.clearIcon} />
    </components.ClearIndicator>
  )
}
