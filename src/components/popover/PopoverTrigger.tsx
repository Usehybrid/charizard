import clsx from 'clsx'
import classes from './styles.module.css'

interface PopoverTriggerProps {
  /**
   * The content of the PopoverTrigger.
   */
  children: React.ReactNode
  /**
   * The popover API object.
   */
  api?: any
  /**
   * Whether the popover should open on hover.
   * @default true
   * If set to false, the popover will only open on click.
   */
  openOnHover?: boolean
  /**
   * The styles to apply to the PopoverTrigger.
   */
  styles?: React.CSSProperties
  /**
   * The className to apply to the PopoverTrigger.
   */
  className?: string
}

export function PopoverTrigger({
  children,
  api,
  openOnHover = true,
  styles,
  className,
}: PopoverTriggerProps) {
  return (
    <button
      {...api?.triggerProps}
      onMouseEnter={openOnHover ? api?.open : () => {}}
      onMouseLeave={openOnHover ? api?.close : () => {}}
      className={clsx('reset-btn', classes.trigger, className)}
      style={styles}
    >
      {children}
    </button>
  )
}
