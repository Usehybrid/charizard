import * as React from 'react'
import * as radio from '@zag-js/radio-group'
import clsx from 'clsx'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {InputContainer, InputLabel} from '../input'

interface RadioGroupProps {
  /**
   * heading for radio group
   */
  radioHeading: string
  /**
   * items to show in radio group
   */
  items: Array<{
    label: {heading: string; subHeading?: string}
    value: string
  }>
  /**
   * default value to be selected on first render
   */
  defaultValue?: string
  /**
   * callback to be called on change of radio group
   * @param value
   *  value of selected radio
   * */
  onChange: (value: string) => void
  /**
   * if radio group is required
   * */
  required?: boolean
}

export function RadioGroup({
  items,
  radioHeading,
  defaultValue,
  onChange,
  required = false,
}: RadioGroupProps) {
  const controlId = React.useId()

  const [state, send] = useMachine(
    radio.machine({
      id: controlId,
      value: defaultValue,
      onChange: ({value}) => {
        onChange(value)
      },
    }),
  )

  const api = radio.connect(state, send, normalizeProps)

  return (
    <div className={classes.radioGroup}>
      <div {...api.rootProps} className={classes.root}>
        <InputContainer customClassName={classes.labelContainer}>
          <InputLabel required={required} customClasses={classes.heading}>
            {radioHeading}
          </InputLabel>
        </InputContainer>
        <div className={classes.optionsContainer}>
          {items.map(opt => (
            <label
              key={opt.value}
              {...api.getRadioProps({value: opt.value})}
              className={classes.radio}
            >
              <span {...api.getRadioLabelProps({value: opt.value})} className={classes.radioLabel}>
                <span className={classes.heading}>{opt.label.heading}</span>
                <span className={classes.subHeading}>{opt.label.subHeading}</span>
              </span>
              <input {...api.getRadioInputProps({value: opt.value})} />
              <div
                {...api.getRadioControlProps({value: opt.value})}
                className={clsx(classes.radioControl, {
                  [classes.radioControlActive]: api.value === opt.value,
                })}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  )
}
