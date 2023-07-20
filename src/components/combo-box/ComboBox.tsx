import * as React from 'react'
import * as combobox from '@zag-js/combobox'
import {useId} from 'react'
import {useMachine, normalizeProps} from '@zag-js/react'
import classes from './style.module.css'
import clsx from 'clsx'

export type option = {
  disabled?: boolean
  label: string
  value: string
  listComponent?: React.ReactNode
}
export interface ComboboxProps {
  value: string
  label?: string
  isLoading?: boolean
  placeholder?: string
  labelClassName?: string
  inputClassName?: string
  required?: boolean
  disabled?: boolean
  defaultOptions?: option[] | []
  isAPIFilter?: boolean
  onChange?: (text: string) => void
  onSelect: (selected?: option) => void
  optionsMaxHeight?: string
}

export function Combobox({
  label,
  isLoading = false,
  required = false,
  labelClassName,
  inputClassName,
  disabled = false,
  defaultOptions = [],
  isAPIFilter = false,
  onChange,
  onSelect,
  placeholder,
  optionsMaxHeight = '300px',
  value,
}: ComboboxProps) {
  const [options, setOptions] = React.useState<option[] | []>(defaultOptions)
  const [searchText, setSearchText] = React.useState('')

  const [state, send] = useMachine(
    combobox.machine({
      id: useId(),
      disabled,
      inputValue: value,
      placeholder,
      onOpen() {
        setOptions(defaultOptions)
      },
      async onInputChange({value}) {
        setSearchText(value)
        if (!isAPIFilter) {
          const filtered = options.filter(item =>
            item.label.toLowerCase().includes(value.toLowerCase()),
          )
          setOptions(filtered)
          return
        }
        if (value && onChange) {
          setOptions([])
          onChange(value)
        }
      },
      onSelect(details) {
        if (details.label && details.value) {
          onSelect({value: details.value, label: details.label})
        }
      },
    }),
  )

  const api = combobox.connect(state, send, normalizeProps)

  React.useEffect(() => {
    if (defaultOptions) {
      setOptions(defaultOptions)
    }
  }, [defaultOptions])

  return (
    <div>
      <div {...api.rootProps}>
        {label && (
          <label
            {...api.labelProps}
            className={clsx(classes.inputLabel, labelClassName, required && classes.required)}
          >
            {label}
          </label>
        )}
        <div {...api.controlProps} className={classes.container}>
          <input {...api.inputProps} className={inputClassName} />
          {/* <button {...api.triggerProps}>▼</button> */}
        </div>
      </div>
      <div {...api.positionerProps}>
        {options.length > 0 ? (
          <ul
            {...api.contentProps}
            className={classes.options}
            style={{maxHeight: optionsMaxHeight}}
          >
            {options.map((item, index) => (
              <li
                className={classes.option}
                key={`${item.value}:${index}`}
                {...api.getOptionProps({
                  label: item.label,
                  value: item.value,
                  index,
                  disabled: item.disabled,
                })}
              >
                {item.listComponent ? item.listComponent : item.label}
              </li>
            ))}
          </ul>
        ) : (
          searchText && (
            <ul
              {...api.contentProps}
              className={classes.options}
              style={{maxHeight: optionsMaxHeight}}
            >
              {isAPIFilter && !isLoading && !options.length && (
                <li
                  className={classes.option}
                  {...api.getOptionProps({
                    label: '',
                    value: '',
                    disabled: true,
                  })}
                >
                  No result found
                </li>
              )}
              {!isAPIFilter && !options.length && (
                <li
                  className={classes.option}
                  {...api.getOptionProps({
                    label: 'No result found',
                    value: 'No result found',
                    disabled: true,
                  })}
                >
                  No result found
                </li>
              )}
            </ul>
          )
        )}
      </div>
    </div>
  )
}
