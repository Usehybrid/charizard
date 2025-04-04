import * as React from 'react'
import * as radio from '@zag-js/radio-group'
import clsx from 'clsx'
import infoCircleIcon from '../assets/info-circle.svg'
import {TooltipV2} from '../tooltip-v2'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {InputContainer, InputLabel} from '../input'
import {SVG} from '../svg'
import {Placement} from '@zag-js/popper'
import {Skeleton} from '../skeleton'

interface RadioGroupProps {
  /**
   * heading for radio group
   */
  radioHeading?: string
  /**
   * items to show in radio group
   */
  items: Array<{
    label: {heading: string | React.ReactNode; subHeading?: string}
    value: string
    tooltip?: {
      txt: string
      trigger?: React.ReactNode
      placement?: string
    }
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
  onChange: (value: string | null) => void
  /**
   * if radio group is required
   * */
  required?: boolean
  /**
   * error msg to display
   */
  errorMsg?: string
  optionsContainerStyles?: React.CSSProperties
  disabled?: boolean
  showSkeleton?: boolean
  handleClickManually?: boolean
}

export function RadioGroup({
  items,
  radioHeading,
  defaultValue,
  onChange,
  required = false,
  errorMsg,
  optionsContainerStyles,
  disabled = false,
  showSkeleton = false,
  handleClickManually = false,
}: RadioGroupProps) {
  const service = useMachine(radio.machine, {
    id: React.useId(),
    defaultValue,
    onValueChange: ({value}) => {
      onChange(value)
    },
    disabled: disabled || handleClickManually,
  })

  const api = radio.connect(service, normalizeProps)

  return showSkeleton ? (
    <div className={classes.radioGroup}>
      <div className={classes.root}>
        {radioHeading && (
          <div>
            <Skeleton className={classes.headingLoader} />
          </div>
        )}
        <div className={clsx(classes.optionsContainerLoader)} style={optionsContainerStyles}>
          {items.map(opt => (
            <div key={opt.value} style={{display: 'flex', gap: '6px'}}>
              <Skeleton className={classes.circleLoader} />
              {!!opt.label.heading && <Skeleton className={classes.circleTextLoader} />}
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <div className={classes.radioGroup}>
      <div {...api.getRootProps()} className={classes.root}>
        {radioHeading && (
          <InputContainer customClassName={classes.labelContainer}>
            <InputLabel required={required} customClasses={classes.heading}>
              {radioHeading}
            </InputLabel>
          </InputContainer>
        )}
        <div
          className={clsx(classes.optionsContainer, {[classes.topMargin]: !radioHeading})}
          style={optionsContainerStyles}
        >
          {items.map(opt => (
            <div key={opt.value} style={{display: 'flex', gap: '6px'}}>
              <label {...api.getItemProps({value: opt.value})} className={classes.radio}>
                <span {...api.getItemTextProps({value: opt.value})} className={classes.radioLabel}>
                  <span className={classes.heading}>{opt.label.heading}</span>
                  <span className={classes.subHeading}>{opt.label.subHeading}</span>
                </span>
                <input {...api.getItemHiddenInputProps({value: opt.value})} />
                <div
                  {...api.getItemControlProps({value: opt.value})}
                  className={clsx(
                    classes.radioControl,
                    {
                      [classes.radioControlActive]: api.value === opt.value,
                    },
                    disabled && classes.controlDisabled,
                    disabled && classes.radioControlActiveDisabled,
                  )}
                />
              </label>
              {!!opt.tooltip && (
                <TooltipV2
                  placement={opt.tooltip.placement as Placement}
                  trigger={
                    opt.tooltip.trigger ? (
                      opt.tooltip.trigger
                    ) : (
                      <SVG
                        path={infoCircleIcon}
                        svgClassName={classes.infoIcon}
                        spanClassName={classes.infoIconSpan}
                      />
                    )
                  }
                  content={opt.tooltip.txt}
                />
              )}
            </div>
          ))}
        </div>
      </div>
      {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}
    </div>
  )
}
