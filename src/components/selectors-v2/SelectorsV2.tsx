import clsx from 'clsx'
import classes from './styles.module.css'

export interface SelectorsV2Props {
  options: {label: string; value: string}[]
  onChange: (value: string) => void
  value: string
}

export function SelectorsV2({options, onChange, value}: SelectorsV2Props) {
  return (
    <div className={classes.box}>
      {options.map((option, idx) => (
        <div
          key={option.value}
          onClick={() => {
            onChange(option.value)
          }}
          className={clsx(
            classes.selector,
            option.value === value && classes.active,
            idx === 0 && classes.firstSelector,
            idx === options.length - 1 && classes.lastSelector,
          )}
        >
          {option.label}
        </div>
      ))}
    </div>
  )
}
