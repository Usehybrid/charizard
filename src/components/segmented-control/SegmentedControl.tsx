import * as React from 'react'
import * as radio from '@zag-js/radio-group'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import clsx from 'clsx'

type SegmentedControlProps = {
  /**
   * items to show in segmented control
   */
  items: Array<{label: string; value: string; component: React.ReactNode}>
  /**
   * default value to be selected on first render
   */
  defaultValue?: string
  /**
   * handle on change
   * use this if you are controlling the behavior of segmented control from an external entity
   */
  handleOnChange?: (value: string) => void
  /**
   * custom classes to override segmented control default styles
   */
  customStyles?: Record<string, string>
  /**
   * custom class name to override segmented control default styles
   */
  customClassName?: string
}

export function SegmentedControl({
  items,
  defaultValue,
  handleOnChange,
  customClassName,
  customStyles,
}: SegmentedControlProps) {
  const [state, send] = useMachine(
    radio.machine({
      id: React.useId(),
      value: defaultValue ?? items?.[0]?.value,
      onValueChange(details) {
        handleOnChange && handleOnChange(details.value)
      },
    }),
  )
  const api = radio.connect(state, send, normalizeProps)

  React.useEffect(() => {
    if (defaultValue && defaultValue !== api.value) {
      api.setValue(defaultValue)
    }
  }, [defaultValue])

  return (
    <div className={clsx(classes.segmentedControl, customClassName)} style={customStyles}>
      <div {...api.rootProps} className={classes.root}>
        <div {...api.indicatorProps} className={classes.indicator} />
        {items.map(opt => (
          <label
            key={opt.value}
            {...api.getItemProps({value: opt.value})}
            className={classes.radio}
            style={{width: `${(100 / items.length).toFixed(2)}%`}}
          >
            <span {...api.getItemTextProps({value: opt.value})} className={classes.radioLabel}>
              {opt.label}
            </span>
            <input {...api.getItemHiddenInputProps({value: opt.value})} />
            <div {...api.getItemControlProps({value: opt.value})} />
          </label>
        ))}
      </div>
      <div className={classes.content}>
        {items?.find(item => item.value === api.value)?.component}
      </div>
    </div>
  )
}
