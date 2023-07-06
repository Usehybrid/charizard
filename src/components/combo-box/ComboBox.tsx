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
  label?: string
  placeholder?: string
  labelClassName?: string
  inputClassName?: string
  required?: boolean
  disabled?: boolean
  defaultOptions?: option[] | []
  isAPIFilter?: boolean
  onChange?: (text: string) => Promise<option[] | []>
  onSelect: (selected?: option) => void
}

export default function Combobox({
  label,
  required = false,
  labelClassName,
  inputClassName,
  disabled = false,
  defaultOptions = [],
  isAPIFilter = false,
  onChange,
  onSelect,
  placeholder,
}: ComboboxProps) {
  const [options, setOptions] = React.useState<option[] | []>(defaultOptions)
  const [optionLoading, setOptionsLoading] = React.useState(false)
  const [searchText, setSearchText] = React.useState('')

  const [state, send] = useMachine(
    combobox.machine({
      id: useId(),
      disabled,
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
          setOptionsLoading(true)
          setOptions([])
          const apiOptions = await onChange(value)
          setOptions(apiOptions)
          setOptionsLoading(false)
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
          <ul {...api.contentProps} className={classes.options}>
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
            <ul {...api.contentProps} className={classes.options}>
              {isAPIFilter && !optionLoading && !options.length && (
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
