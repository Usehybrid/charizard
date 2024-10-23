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
  tooltipProps?: Partial<TooltipV2Props>
}

/**
 * Props for the SwitchV2 component.
 *
 * @typedef {Object} SwitchV2Props
 * @extends {Omit<zagSwitch.Context, 'id'>}
 * @property {React.ReactNode} [children] - Optional label content displayed next to the switch.
 * @property {string} [errorMsg] - Optional error message displayed below the switch.
 * @property {Partial<TooltipV2Props>} [tooltipProps] - Optional props for the tooltip component, which appears when hovering over the info icon.
 * @property {SVGProps} [infoIcon] - Optional props for the info icon SVG used as the trigger for the tooltip.
 * @property {string} [info] - Optional info message displayed in the tooltip when hovering the info icon.
 */

/**
 * SwitchV2 Component
 *
 * A switch component that leverages @zag-js for accessibility and state management.
 * The component includes a hidden input, a slider, optional label content, an error message,
 * and a tooltip-triggered info icon.
 *
 * @param {SwitchV2Props} props - The props include the context for @zag-js switch, optional children, error message, and tooltip properties.
 * @returns {JSX.Element} The rendered switch component with optional label, error message, and info tooltip.
 */

export function SwitchV2({children, errorMsg, tooltipProps = {}, ...props}: SwitchV2Props) {
  const id = React.useId()
  const [state, send] = useMachine(zagSwitch.machine({...props, id: React.useId()}))

  const api = zagSwitch.connect(state, send, normalizeProps)

  React.useEffect(() => {
    if (props.checked !== undefined) {
      api.setChecked(props.checked)
    }
  }, [props.checked])

  return (
    <div>
      <label className={classes.container} {...api.getRootProps()}>
        <input {...api.getHiddenInputProps()} />
        <span className={classes.sliderContainer} {...api.getControlProps()}>
          <span className={classes.slider} {...api.getThumbProps()} />
        </span>
        {children && (
          <div className={clsx(classes.label, 'zap-content-medium')} {...api.getLabelProps()}>
            {children}
          </div>
        )}
        {!!tooltipProps.content && (
          <TooltipV2
            trigger={
              <SVG
                path={infoCircleIcon}
                spanClassName={classes.infoIconContainer}
                svgClassName={classes.infoIcon}
              />
            }
            content={tooltipProps.content}
            {...tooltipProps}
            id={id}
          />
        )}
      </label>
      {errorMsg && <span className={clsx('zap-subcontent-medium', classes.error)}>{errorMsg}</span>}
    </div>
  )
}
