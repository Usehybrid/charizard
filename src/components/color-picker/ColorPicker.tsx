import * as React from 'react'
import * as colorPicker from '@zag-js/color-picker'
import clsx from 'clsx'
import chevronDown from '../assets/chevron-down.svg'
import classes from './color-picker.module.css'
import {normalizeProps, useMachine} from '@zag-js/react'
import {InputLabel} from '../input'
import {SVG} from '../svg'

interface ColorPickerProps {
  name: string
  label?: string
  errorMsg?: string | false
  required?: boolean
  onChange: (color: string) => void
  defaultColor?: string
}

export function ColorPicker({
  name,
  label,
  errorMsg,
  required = false,
  onChange,
  defaultColor,
}: ColorPickerProps) {
  const [state, send] = useMachine(
    colorPicker.machine({
      name,
      id: React.useId(),
      value: colorPicker.parse(defaultColor ?? presets[5]),
    }),
  )

  const api = colorPicker.connect(state, send, normalizeProps)

  return (
    <div {...api.rootProps} className={classes.root}>
      {label && <InputLabel required={required}>{label}</InputLabel>}
      <input {...api.hiddenInputProps} />
      <div {...api.controlProps} className={classes.control}>
        <button {...api.triggerProps} className={clsx('hybr1d-ui-reset-btn', classes.trigger)}>
          <div {...api.getSwatchProps({value: api.value})} className={classes.swatch} />
          <SVG path={chevronDown} svgClassName={classes.svg} />
        </button>
      </div>
      <div {...api.positionerProps} className={classes.positioner}>
        <div {...api.contentProps} className={classes.content}>
          <div {...api.swatchGroupProps} className={classes.swatchGroup}>
            {presets.map(preset => (
              <button
                key={preset}
                {...api.getSwatchTriggerProps({value: preset})}
                className="hybr1d-ui-reset-btn"
                onClick={() => {
                  onChange(preset)
                  api.setValue(colorPicker.parse(preset))
                  api.setOpen(false)
                }}
              >
                <div {...api.getSwatchProps({value: preset})} className={classes.swatchSingle} />
              </button>
            ))}
          </div>
        </div>
      </div>
      {errorMsg && <p className={'hybr1d-ui-error-msg '}>{errorMsg}</p>}
    </div>
  )
}

const presets = [
  // Reds and Oranges
  '#de350b', // danger
  '#e74c3c', // error
  '#d35400', // pumpkin (orange)

  // Yellows and Greens
  '#f39c12', // warning
  '#f1c40f', // sun flower (yellow)
  '#2ecc71', // emerald (green)
  '#27ae60', // nephritis (green)

  // Blues
  '#3498db', // info
  '#2980b9', // belize hole (blue)
  '#87c8ff', // sky-blue
  '#5c81a0', // slate-blue

  // Purples and Grays
  '#8e44ad', // wisteria (purple)
  '#9b59b6', // amethyst (light purple)
  '#34495e', // wet asphalt (dark blue)
  '#95a5a6', // concrete (gray)
]
