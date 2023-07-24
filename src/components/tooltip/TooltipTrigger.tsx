import clsx from 'clsx'
import classes from './styles.module.css'

interface TooltipTriggerProps {
  /**
   * tooltip trigger
   */
  children: React.ReactNode
  /**
   * The tooltip API object.
   */
  api?: any
}

export function TooltipTrigger({children, api}: TooltipTriggerProps) {
  return (
    <button {...api.triggerProps} type="button" className={classes.trigger}>
      {children}
    </button>
  )
}
