import {StylesConfig} from 'react-select'

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
        ? '#f7f7f7'
        : '#ffffff',
      color: '#171718',
      cursor: isDisabled ? 'not-allowed' : 'default',
      padding: '8px 12px',
      fontSize: '16px',
      lineHeight: '24px',
      ':hover': {
        backgroundColor: '#f7f7f7',
      },
    }
  },
  singleValue: (styles, {data}) => {
    return {
      ...styles,
      color: '#171718',
      fontSize: '16px',
      lineHeight: '24px',
      display: 'flex',
      alignItems: 'center',
      gap: '4px',
      backgroundColor: data.profileImgUrl ? '#f5f5f8' : 'transparent',
      padding: data.profileImgUrl ? '0px 8px 0 0 !important' : '0 !important',
    }
  },
  multiValue: (styles, {data, isFocused}) => {
    return {
      ...styles,
      backgroundColor: '#f5f5f8',
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
    color: '#171718',
    fontSize: '16px',
    lineHeight: '24px',
    padding: '0 !important',
  }),
  multiValueRemove: (styles, {data}) => ({
    ...styles,
    color: '#b3b2b8',
    padding: '0',
    ':hover': {
      backgroundColor: 'transparent',
      color: '#b3b2b8',
    },
    svg: {
      filter:
        'invert(76%) sepia(5%) saturate(209%) hue-rotate(210deg) brightness(95%) contrast(89%)',
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
        'invert(76%) sepia(5%) saturate(209%) hue-rotate(210deg) brightness(95%) contrast(89%)',
    },
  }),
  clearIndicator: styles => ({
    ...styles,
    svg: {
      filter:
        'invert(76%) sepia(5%) saturate(209%) hue-rotate(210deg) brightness(95%) contrast(89%)',
    },
  }),
}

export const getControlStyles = (
  errorMsg: string | false | string[] | undefined,
): StylesConfig<any> => {
  return {
    control: (styles, {isDisabled, isFocused}) => ({
      ...styles,
      backgroundColor: isDisabled ? '#f5f5f8' : 'transparent',
      color: '#171718',
      border: '1px solid #e2e0eb',
      borderColor: errorMsg
        ? '#de350b !important'
        : isFocused
        ? '#6c5bd2 !important'
        : '#e2e0eb !important',
      fontSize: '16px',
      boxShadow: 'none',
      transition: 'all 0.3s ease-in-out',
      ':hover': {
        borderColor: errorMsg ? '#de350b !important' : '#6c5bd2 !important',
      },
      ':focus-within': {
        boxShadow: errorMsg ? '#de350b !important' : '#6c5bd2 !important',
      },
    }),
  }
}
