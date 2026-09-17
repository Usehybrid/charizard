import {StylesConfig} from 'react-select'

export const styles: StylesConfig<any> = {
  input: base => ({...base, color: 'var(--text-primary)'}),
  singleValue: base => ({...base, color: 'var(--text-primary)'}),
  control: (baseStyles, state) => {
    return {
      ...baseStyles,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '4px',
      minHeight: '32px',
      padding: '4px 12px',
      ':hover': {
        borderColor: 'var(--action-border)',
      },
      borderColor: state.isFocused ? 'var(--action-border)' : 'var(--stroke-border)',
      backgroundColor: 'var(--surface-default)',
      gap: '4px',
      opacity: state.isDisabled ? 0.5 : 1,
    }
  },
  placeholder: baseStyles => {
    return {
      ...baseStyles,
      color: 'var(--text-tertiary)',
    }
  },
  menu: baseStyles => {
    return {
      ...baseStyles,
      maxWidth: '240px',
      borderRadius: '4px',
      boxShadow: '0px 4px 16px 0px rgba(18, 18, 18, 0.04), 0px 2px 8px 0px rgba(18, 18, 18, 0.08)',
      margin: '4px 0',
      backgroundColor: 'var(--surface-raised)',
      pointerEvents: 'auto',
      zIndex: 9999,
    }
  },
  menuList: baseStyles => {
    return {
      ...baseStyles,
      display: 'flex',
      flexDirection: 'column',
      borderRadius: '4px',
      maxHeight: '273px',
    }
  },
  option: (baseStyles, state) => {
    return {
      ...baseStyles,
      padding: '6px 12px',
      color: 'var(--text-primary)',
      backgroundColor:
        state.isSelected || state.isFocused ? 'var(--fill-selection)' : 'var(--surface-default)',
      ':hover': {
        backgroundColor: 'var(--fill-selection)',
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
      backgroundColor: 'var(--surface-default)',
      color: 'var(--text-tertiary)',
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
    backgroundColor: 'var(--surface-muted)',
    color: 'var(--text-primary)',
    alignItems: 'center',
    gap: '4px',
  }),
  multiValueLabel: baseStyles => ({
    ...baseStyles,
    color: 'var(--text-primary)',
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
  menuPortal: baseStyles => {
    return {...baseStyles, zIndex: 9999}
  },
}
