import {StylesConfig} from 'react-select'

export const colourStyles: StylesConfig<any> = {
  control: styles => ({
    ...styles,
    backgroundColor: '#ffffff',
    color: '#37373D',
    border: '1px solid #E2E8F0',
    fontSize: '14px',
  }),
  option: (styles, {data, isDisabled, isFocused, isSelected}) => {
    return {
      ...styles,
      backgroundColor: isDisabled
        ? undefined
        : isSelected
        ? data.color
        : isFocused
        ? '#f7f1ff'
        : '#ffffff',
      color: isFocused ? '#37373d' : '#37373d',
      cursor: isDisabled ? 'not-allowed' : 'default',
      padding: '5px',
      fontWeight: 'bold',
      fontSize: '14px',
    }
  },

  multiValue: (styles, {data, isFocused}) => {
    return {
      ...styles,
      backgroundColor: '#f7f1ff',
      color: isFocused ? 'white' : 'black',
    }
  },
  multiValueLabel: (styles, {data}) => ({
    ...styles,
    color: '#734daf',
    fontWeight: '700',
  }),
  multiValueRemove: (styles, {data}) => ({
    ...styles,
    color: '#734daf',
    ':hover': {
      backgroundColor: '#ca281a',
      color: '#ffffff',
    },
  }),
  indicatorSeparator: styles => ({
    ...styles,
    display: 'none',
  }),
}
