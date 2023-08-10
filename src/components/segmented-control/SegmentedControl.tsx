/**
 * @author Pratik Awaik <pratik@hybr1d.io>
 */

import * as React from 'react'
import * as radio from '@zag-js/radio-group'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'

interface SegmentedControlProps {
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
}

export function SegmentedControl({items, defaultValue, handleOnChange}: SegmentedControlProps) {
  const controlId = React.useId()

  const [state, send] = useMachine(
    radio.machine({
      id: controlId,
      value: defaultValue ?? items?.[0]?.value,
      onChange(details) {
        handleOnChange && handleOnChange(details.value)
      },
    }),
  )
  const api = radio.connect(state, send, normalizeProps)

  return (
    <div className={classes.segmentedControl}>
      <div {...api.rootProps} className={classes.root}>
        <div {...api.indicatorProps} className={classes.indicator} />
        {items.map(opt => (
          <label
            key={opt.value}
            {...api.getRadioProps({value: opt.value})}
            className={classes.radio}
            style={{width: `${(100 / items.length).toFixed(2)}%`}}
          >
            <span {...api.getRadioLabelProps({value: opt.value})} className={classes.radioLabel}>
              {opt.label}
            </span>
            <input {...api.getRadioInputProps({value: opt.value})} />
          </label>
        ))}
      </div>
      <div className={classes.content}>
        {items?.find(item => item.value === api.value)?.component}
      </div>
    </div>
  )
}
