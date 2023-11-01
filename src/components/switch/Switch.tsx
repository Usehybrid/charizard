import clsx from 'clsx'
import classes from './styles.module.css'

type SwitchProps = {
  isToggled: boolean | any
  handleToggleChange: (val: boolean) => void
  name: string
  subText?: string | React.ReactNode
  switchClassName?: string
  size?: 'sm' | 'md' | 'lg'
  disabled?: boolean
  title?: string
}

export function Switch({
  isToggled,
  handleToggleChange,
  name,
  switchClassName,
  subText,
  size = 'md',
  disabled = false,
  title,
}: SwitchProps) {
  const sizeClasses =
    size === 'sm' ? classes.sm : size === 'md' ? classes.md : size === 'lg' ? classes.lg : ''

  const disabledClasses = disabled ? classes.disabled : ''

  return (
    <div className={classes.switchComponent}>
      <div className={classes.component}>
        <label htmlFor={`${name}-switch`} className={classes.switchLabel}>
          <span>{title}</span>
        </label>
        <label
          className={clsx(classes.switch, switchClassName, sizeClasses, disabledClasses)}
          title={title}
        >
          <input
            type="checkbox"
            checked={isToggled}
            onChange={e => handleToggleChange(e.target.checked)}
            name={name}
            disabled={disabled}
            id={`${name}-switch`}
          />{' '}
          <span className={classes.slider} />
        </label>
      </div>

      {subText && isToggled && (
        <div className={classes.subText}>
          <span>{subText}</span>
        </div>
      )}
    </div>
  )
}
