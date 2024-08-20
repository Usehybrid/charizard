import {StylesConfig} from 'react-select'

export const styles: StylesConfig<any> = {
  control: (baseStyles, state) => {
    return {
      ...baseStyles,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '4px',
      minHeight: '32px',
      padding: '4px 12px',
      ':hover': {
        borderColor: '#254DDA',
      },
      borderColor: state.isFocused ? '#254DDA' : '#E5E9FB',
      backgroundColor: '#fff',
      gap: '4px',
      opacity: state.isDisabled ? 0.5 : 1,
    }
  },
  placeholder: baseStyles => {
    return {
      ...baseStyles,
      color: '#9999B3',
    }
  },
  menu: baseStyles => {
    return {
      ...baseStyles,
      maxWidth: '240px',
      borderRadius: '4px',
      boxShadow: '0px 4px 16px 0px rgba(18, 18, 18, 0.04), 0px 2px 8px 0px rgba(18, 18, 18, 0.08)',
      margin: '4px 0',
      backgroundColor: '#fff',
    }
  },
  menuList: baseStyles => {
    return {
      ...baseStyles,
      display: 'flex',
      flexDirection: 'column',
      gap: '2px',
      borderRadius: '4px',
      maxHeight: '273px',
    }
  },
  option: (baseStyles, state) => {
    return {
      ...baseStyles,
      padding: '6px 12px',
      backgroundColor: state.isSelected ? '#F6F8FE' : '#fff',
      ':hover': {
        backgroundColor: '#F6F8FE',
      },
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
    }
  },
  noOptionsMessage: baseStyles => {
    return {
      ...baseStyles,
      padding: '6px 12px',
      minHeight: '30px',
      backgroundColor: '#fff',
      color: '#9999B3',
    }
  },
  valueContainer: baseStyles => {
    return {
      ...baseStyles,
      gap: '4px',
      flexWrap: 'nowrap',
      overflowX: 'scroll',
      scrollbarWidth: 'none',
    }
  },
  multiValue: baseStyles => ({
    ...baseStyles,
    alignItems: 'center',
    gap: '4px',
  }),
  multiValueLabel: baseStyles => ({
    ...baseStyles,
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
  }),
  indicatorsContainer: baseStyles => {
    return {
      ...baseStyles,
      gap: '4px',
    }
  },
  indicatorSeparator: baseStyles => {
    return {
      ...baseStyles,
      display: 'none',
    }
  },
}
