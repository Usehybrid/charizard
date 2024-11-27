// @ts-nocheck
import {StylesConfig} from 'react-select'
import {Option} from './Common'

// todo @sohhamm, figure out ts generics for styles config

export const colourStyles: StylesConfig<any> = {
  valueContainer: styles => {
    return {
      ...styles,
      gap: '4px',
    }
  },
  option: (styles, {data, isDisabled, isFocused, isSelected}) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? 'var(--neutral-arch-30)'
        : '#ffffff',
      color: 'var(--text-primary)',
      cursor: isDisabled ? 'not-allowed' : 'default',
      padding: '8px 12px',
      fontSize: '16px',
      lineHeight: '24px',
      ':hover': {
        backgroundColor: 'var(--neutral-arch-30)',
      },
    }
  },
  singleValue: (styles, {data}) => {
    return {
      ...styles,
      color: 'var(--text-primary)',
      fontSize: '16px',
      lineHeight: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: 'transparent',
      padding: data.profileImgUrl ? '0px 8px 0 0 !important' : '0 !important',
    }
  },
  multiValue: (styles, {data, isFocused}) => {
    return {
      ...styles,
      backgroundColor: 'var(--neutral-arch-50)',
      padding: data.profileImgUrl ? '0px 8px 0 0' : '0 8px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '4px',
      borderRadius: '24px',
      margin: '0',
    }
  },
  multiValueLabel: (styles, {data}) => ({
    ...styles,
    color: 'var(--text-primary)',
    fontSize: '16px',
    lineHeight: '24px',
    padding: '0 !important',
  }),
  multiValueRemove: (styles, {data}) => ({
    ...styles,
    color: 'var(--neutral-arch-600)',
    padding: '0',
    ':hover': {
      backgroundColor: 'transparent',
      color: 'var(--neutral-arch-600)',
    },
    svg: {
      filter:
        'invert(66%) sepia(16%) saturate(358%) hue-rotate(202deg) brightness(95%) contrast(83%)',
    },
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none',
  }),
  dropdownIndicator: styles => ({
    ...styles,
    svg: {
      filter:
        'invert(66%) sepia(16%) saturate(358%) hue-rotate(202deg) brightness(95%) contrast(83%)',
    },
  }),
  clearIndicator: styles => ({
    ...styles,
    svg: {
      filter:
        'invert(66%) sepia(16%) saturate(358%) hue-rotate(202deg) brightness(95%) contrast(83%)',
    },
  }),
  menu: baseStyles => {
    return {
      ...baseStyles,
      pointerEvents: 'auto',
      zIndex: 9999,
    }
  },
  menuPortal: baseStyles => {
    return {...baseStyles, zIndex: 9999}
  },
}

export const getControlStyles = (
  errorMsg: string | false | string[] | undefined,
): StylesConfig<any> => {
  return {
    control: (styles, {isDisabled, isFocused}) => ({
      ...styles,
      backgroundColor: isDisabled ? 'var(--disabled-50)' : 'transparent',
      color: 'var(--text-primary)',
      border: '1px solid var(--neutral-arch-300)',
      borderColor: errorMsg
        ? 'var(--status-error) !important'
        : isFocused
        ? 'var(--theme-blue) !important'
        : 'var(--neutral-arch-300) !important',
      fontSize: '16px',
      boxShadow: 'none',
      transition: 'all 0.3s ease-in-out',
      ':hover': {
        borderColor: errorMsg ? 'var(--status-error) !important' : 'var(--theme-blue) !important',
      },
      ':focus-within': {
        boxShadow: errorMsg ? 'var(--status-error) !important' : 'var(--theme-blue) !important',
      },
      cursor: !isFocused ? 'pointer' : undefined,
    }),
  }
}
