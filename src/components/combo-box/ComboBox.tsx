import * as React from 'react'
import * as combobox from '@zag-js/combobox'
import classes from './style.module.css'
import clsx from 'clsx'
import {useMachine, normalizeProps} from '@zag-js/react'
import {useId} from 'react'

export type option = {
  disabled?: boolean
  label: string
  value: string
  listComponent?: React.ReactNode
}
export type ComboboxProps = {
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

  // const [state, send] = useMachine(
  //   combobox.machine({
  //     id: useId(),
  //     disabled,
  //     inputValue: value,
  //     placeholder,
  //     onOpen() {
  //       setOptions(defaultOptions)
  //     },
  //     async onInputChange({value}) {
  //       setSearchText(value)
  //       if (!isAPIFilter) {
  //         const filtered = options.filter(item =>
  //           item.label.toLowerCase().includes(value.toLowerCase()),
  //         )
  //         setOptions(filtered)
  //         return
  //       }
  //       if (value && onChange) {
  //         setOptions([])
  //         onChange(value)
  //       }
  //     },
  //     onSelect({details}) {
  //       if (details.label && details.value) {
  //         onSelect({value: details.value, label: details.label})
  //       }
  //     },
  //   }),
  // )

  const collection = combobox.collection({
    items: defaultOptions,
    itemToValue: item => item.value,
    itemToString: item => item.label,
  })

  const [state, send] = useMachine(
    combobox.machine({
      id: useId(),
      collection,
      onOpenChange(details) {
        if (!details.open) return
        setOptions(defaultOptions)
      },
      async onInputValueChange({value}) {
        setSearchText(value[0])
        if (!isAPIFilter) {
          const filtered = options.filter(item =>
            item.label.toLowerCase().includes(value[0].toLowerCase()),
          )
          setOptions(filtered)
          return
        }
        if (value[0] && onChange) {
          setOptions([])
          onChange(value[0])
        }
      },
      disabled,
      inputValue: value,
      // when multiple is allowed the onValueChange function will change
      multiple: false,
      onValueChange(details) {
        // if (details.label && details.value) {
        //   onSelect({value: details.value, label: details.label})
        // }
      },
    }),
    {
      context: {collection},
    },
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
                {...api.getItemProps({
                  item,
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
                  {...api.getItemProps({
                    item: {label: '', value: ''},
                  })}
                >
                  No result found
                </li>
              )}
              {!isAPIFilter && !options.length && (
                <li
                  className={classes.option}
                  {...api.getItemProps({
                    item: {label: 'No result found', value: 'No result found', disabled: true},
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
