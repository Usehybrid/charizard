import * as React from 'react'
import * as zagSwitch from '@zag-js/switch'
import {useMachine, normalizeProps} from '@zag-js/react'
import classes from './styles.module.css'
import clsx from 'clsx'
import {TooltipV2, TooltipV2Props} from '../tooltip-v2/TooltipV2'
import {SVG} from '../svg'
import infoCircleIcon from '../assets/info-circle.svg'

interface SwitchV2Props extends Omit<zagSwitch.Context, 'id'> {
  children?: React.ReactNode
  errorMsg?: string
  info?: string
  tooltipProps?: Partial<TooltipV2Props>
}

/**
 * SwitchV2 Component
 *
 * A custom switch component that utilizes `@zag-js/switch` for accessibility and state management.
 * It includes an optional label, error message, and an info tooltip triggered by an info icon.
 *
 * The switch can be controlled via the `checked` prop and supports accessibility features like
 * hidden inputs and keyboard navigation.
 *
 * @param {SwitchV2Props} props - The props for configuring the switch.
 * @param {React.ReactNode} [props.children] - Optional label content displayed next to the switch.
 * @param {string} [props.errorMsg] - Optional error message displayed below the switch.
 * @param {string} [props.info] - Optional informational text that will be shown inside a tooltip.
 * @param {Partial<TooltipV2Props>} [props.tooltipProps] - Optional tooltip configuration for the info icon.
 * @param {boolean} [props.checked] - The checked state of the switch. Controls the on/off state if provided.
 *
 * @returns {JSX.Element} The rendered switch component with optional label, error message, and info tooltip.
 */

export function SwitchV2({
  children,
  errorMsg,
  info = '',
  tooltipProps = {},
  ...props
}: SwitchV2Props) {
  const [state, send] = useMachine(zagSwitch.machine({...props, id: React.useId()}))

  const api = zagSwitch.connect(state, send, normalizeProps)

  React.useEffect(() => {
    if (props.checked !== undefined) {
      api.setChecked(props.checked)
    }
  }, [props.checked])

  const stopPropagation = (event: React.MouseEvent | React.TouchEvent) => {
    event.stopPropagation()
  }

  return (
    <div>
      <div className={classes.container}>
        <label className={classes.labelContainer} {...api.getRootProps()}>
          <input {...api.getHiddenInputProps()} />
          <span
            onClick={stopPropagation}
            onTouchStart={stopPropagation}
            className={classes.sliderContainer}
            {...api.getControlProps()}
          >
            <span className={classes.slider} {...api.getThumbProps()} />
          </span>
          {children && (
            <div className={clsx(classes.label, 'zap-content-medium')} {...api.getLabelProps()}>
              {children}
            </div>
          )}
        </label>
        {!!info && (
          <TooltipV2
            {...tooltipProps}
            trigger={
              <SVG
                path={infoCircleIcon}
                spanClassName={classes.infoIconContainer}
                svgClassName={classes.infoIcon}
              />
            }
            content={info}
          />
        )}
      </div>
      {errorMsg && <span className={clsx('zap-subcontent-medium', classes.error)}>{errorMsg}</span>}
    </div>
  )
}