import * as React from 'react'
import * as zagSwitch from '@zag-js/switch'
import {useMachine, normalizeProps} from '@zag-js/react'
import classes from './styles.module.css'
import clsx from 'clsx'

/**
 * Props for the SwitchV2 component.
 * Extends the zagSwitch context, excluding the 'id' property,
 * and includes an optional children node for labeling.
 */
interface SwitchV2Props extends Omit<zagSwitch.Context, 'id'> {
  /** Optional label content displayed next to the switch */
  children?: React.ReactNode
}

/**
 * SwitchV2 Component
 *
 * A switch component that leverages @zag-js for accessibility and state management.
 * The component includes a hidden input, a slider, and optional label content.
 *
 * @param {SwitchV2Props} props - The props include the context for @zag-js switch and optional children.
 * @returns {JSX.Element} The rendered switch component with a label if provided.
 */

export function SwitchV2({children, ...props}: SwitchV2Props) {
  const [state, send] = useMachine(zagSwitch.machine({...props, id: React.useId()}))

  const api = zagSwitch.connect(state, send, normalizeProps)

  React.useEffect(() => {
    if (props.checked !== undefined) {
      api.setChecked(props.checked)
    }
  }, [props.checked])

  return (
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
    </label>
  )
}
