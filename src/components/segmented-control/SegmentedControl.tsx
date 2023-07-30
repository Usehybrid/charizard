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
   * control id used by zagjs
   */
  controlId: string
  /**
   * default value to be selected on first render
   */
  defaultValue?: string
}

export function SegmentedControl({items, controlId, defaultValue}: SegmentedControlProps) {
  const [state, send] = useMachine(
    radio.machine({id: controlId, value: defaultValue ?? items[0].value}),
  )
  const api = radio.connect(state, send, normalizeProps)

  const componentToShow = React.useMemo(() => {
    return items.find(item => item.value === api.value)?.component
  }, [api.value])

  return (
    <div className={classes.segmentedControl}>
      <div {...api.rootProps} className={classes.root}>
        <div {...api.indicatorProps} className={classes.indicator} />
        {items.map(opt => (
          <label
            key={opt.value}
            {...api.getRadioProps({value: opt.value})}
            className={classes.radio}
          >
            <span {...api.getRadioLabelProps({value: opt.value})} className={classes.radioLabel}>
              {opt.label}
            </span>
            <input {...api.getRadioInputProps({value: opt.value})} />
          </label>
        ))}
      </div>
      <div className={classes.content}>{componentToShow}</div>
    </div>
  )
}
