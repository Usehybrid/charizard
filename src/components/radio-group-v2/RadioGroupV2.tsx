import * as React from 'react'
import * as radio from '@zag-js/radio-group'
import clsx from 'clsx'
import infoCircleIcon from '../assets/info-circle.svg'
import {TooltipV2} from '../tooltip-v2'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {LabelV2} from '../input-v2'
import {SVG} from '../svg'
import {Placement} from '@zag-js/popper'
import {Skeleton} from '../skeleton'

interface RadioGroupV2Props {
  /**
   * heading for radio group
   */
  label?: string
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
  onChange: (value: string) => void
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
  isLoading?: boolean
  handleClickManually?: boolean
}

export function RadioGroupV2({
  items,
  label,
  defaultValue,
  onChange,
  required = false,
  errorMsg,
  optionsContainerStyles,
  disabled = false,
  isLoading = false,
  handleClickManually = false,
}: RadioGroupV2Props) {
  const [state, send] = useMachine(
    radio.machine({
      id: React.useId(),
      value: defaultValue,
      onValueChange: ({value}) => {
        onChange(value)
      },
      disabled: disabled || handleClickManually,
    }),
  )

  const api = radio.connect(state, send, normalizeProps)

  React.useEffect(() => {
    api.setValue(defaultValue || '')
  }, [defaultValue])

  return isLoading ? (
    <>
      {label && <Skeleton className={classes.labelLoader} />}
      <div className={classes.optionsContainerLoader} style={optionsContainerStyles}>
        {items.map(opt => (
          <div key={opt.value} className={classes.options}>
            <Skeleton className={classes.circleLoader} />
            {!!opt.label.heading && <Skeleton className={classes.circleTextLoader} />}
          </div>
        ))}
      </div>
    </>
  ) : (
    <>
      <div {...api.getRootProps()}>
        {label && (
          <LabelV2 required={required} className={classes.heading} disabled={disabled}>
            {label}
          </LabelV2>
        )}
        <div
          className={clsx(classes.optionsContainer, {[classes.topMargin]: !label})}
          style={optionsContainerStyles}
        >
          {items.map(opt => (
            <div key={opt.value} className={classes.options}>
              <label {...api.getItemProps({value: opt.value})} className={classes.radio}>
                <span {...api.getItemTextProps({value: opt.value})} className={classes.radioLabel}>
                  <span className={clsx('zap-content-medium', disabled && classes.headingDisabled)}>
                    {opt.label.heading}
                  </span>
                  <span className={clsx(classes.subHeading, 'zap-content-medium')}>
                    {opt.label.subHeading}
                  </span>
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
    </>
  )
}
