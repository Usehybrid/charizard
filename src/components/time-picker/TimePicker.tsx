import clsx from 'clsx'
import * as React from 'react'
import clockIcon from '../assets/time/clock.svg'
import {BUTTON_V2_SIZE, BUTTON_V2_VARIANT, ButtonV2} from '../button-v2'
import {InputGroupV2, InputRightIcon, InputV2} from '../input-v2'
import {Popover, PopoverContent, PopoverTrigger} from '../popover'
import classes from './styles.module.css'
import {PERIOD, TIME_PICKER_FORMAT} from './types'
import {DEFAULT_SELECTED_TIME} from './utils/data'
import {amPm, getFormattedTime, hours, minutes, seconds} from './utils/time'
import {InputV2Props} from '../input-v2/types'

/**
 * TimePicker component props interface
 * @typedef {Object} TimePickerProps
 * @property {function} onTimeChange - Callback to handle time change
 * @property {number} [timestamp] - Timestamp value (optional)
 * @property {TIME_PICKER_FORMAT} [format] - The time format, either 12-hour or 24-hour
 * @property {boolean} [enableSeconds=false] - Whether to enable seconds selection
 */
interface TimePickerProps extends InputV2Props {
  onTimeChange: (timestamp: number) => void
  timestamp?: number
  format?: TIME_PICKER_FORMAT
  enableSeconds?: boolean
}

/**
 * TimePicker component for selecting time with optional seconds and 12/24 hour formats
 * @param {TimePickerProps} props - Props for TimePicker component
 * @returns {JSX.Element} TimePicker component
 */
export function TimePicker({
  timestamp,
  onTimeChange,
  format = TIME_PICKER_FORMAT.STANDARD,
  enableSeconds = false,
  className,
  containerClassName,
  ...props
}: TimePickerProps) {
  const [selected, setSelected] = React.useState(DEFAULT_SELECTED_TIME)
  const [currentSelected, setCurrentSelected] = React.useState(DEFAULT_SELECTED_TIME)
  const [open, setOpen] = React.useState<boolean>(false)

  React.useEffect(() => {
    if (timestamp) {
      const date = new Date(timestamp)
      const h = date.getHours()
      const m = date.getMinutes()
      const s = date.getSeconds()

      const period = format === TIME_PICKER_FORMAT.STANDARD ? (h >= 12 ? PERIOD.PM : PERIOD.AM) : ''

      setSelected({
        hour: getFormattedTime(h, format, true),
        minute: getFormattedTime(m, format),
        second: getFormattedTime(s, format),
        period: period as PERIOD,
      })
    } else {
      setSelected(DEFAULT_SELECTED_TIME)
      setCurrentSelected(DEFAULT_SELECTED_TIME)
    }
  }, [timestamp, format])

  React.useEffect(() => {
    setCurrentSelected(selected)
  }, [selected])

  React.useEffect(() => {
    if (!open) {
      setCurrentSelected(selected)
    }
  }, [open])

  const handleTimeChange = () => {
    const now = new Date()

    let hour = parseInt(currentSelected.hour || getFormattedTime(now.getHours(), format, true), 10)
    if (format === TIME_PICKER_FORMAT.STANDARD) {
      if (currentSelected.period === PERIOD.PM && hour < 12) hour += 12
      if (currentSelected.period === PERIOD.AM && hour === 12) hour = 0
    }

    const minute = parseInt(
      currentSelected.minute || getFormattedTime(now.getMinutes(), format),
      10,
    )
    const second = parseInt(
      currentSelected.second || getFormattedTime(now.getSeconds(), format),
      10,
    )

    now.setHours(hour, minute, second)
    onTimeChange(now.getTime())
    setOpen(false)
  }

  const updateSelection = (field: string) => (value: string) => {
    setCurrentSelected(prevState => ({...prevState, [field]: value}))
  }

  const closeHandler = () => {
    setOpen(false)
  }

  let formattedValue = [selected.hour, selected.minute, ...(enableSeconds ? [selected.second] : [])]
    .filter(Boolean)
    .join(':')

  formattedValue = `${formattedValue} ${
    format === TIME_PICKER_FORMAT.STANDARD ? selected.period : ''
  }`.trim()

  let placeholder = ['HH', 'MM', ...(enableSeconds ? ['SS'] : [])].filter(Boolean).join(':').trim()

  placeholder = `${placeholder} ${format === TIME_PICKER_FORMAT.STANDARD ? 'AM/PM' : ''}`.trim()

  return (
    <Popover
      popoverProps={{
        open: open,
        onInteractOutside: () => setOpen(false),
        onOpenChange: ({open}: {open: boolean}) => setOpen(open),
      }}
      placement={'bottom'}
      key={String(open)}
    >
      <PopoverTrigger className={classes.trigger} openOnHover={false}>
        <InputGroupV2 className={className}>
          <InputV2
            value={formattedValue}
            placeholder={placeholder}
            readOnly
            containerClassName={clsx(classes.timeInput, containerClassName)}
            {...props}
          />
          <InputRightIcon icon={clockIcon} svgClassName={classes.triggerIcon} />
        </InputGroupV2>
      </PopoverTrigger>
      <PopoverContent
        bg="var(--neutral-white)"
        className={classes.timePopover}
        positionerStyles={{zIndex: 20}}
      >
        <div
          className={clsx(
            classes.timeContainer,
            !enableSeconds && format !== TIME_PICKER_FORMAT.STANDARD && classes.di,
            !enableSeconds && format === TIME_PICKER_FORMAT.STANDARD && classes.tri,
            enableSeconds && format === TIME_PICKER_FORMAT.DUAL && classes.tri,
            enableSeconds && format === TIME_PICKER_FORMAT.STANDARD && classes.tera,
          )}
        >
          <ul className={classes.list}>
            {(format === TIME_PICKER_FORMAT.STANDARD
              ? hours
              : Array.from({length: 24}, (_, i) => String(i).padStart(2, '0'))
            ).map(h => (
              <li
                className={clsx(currentSelected.hour === h && classes.selected)}
                onClick={updateSelection('hour').bind(null, h)}
                key={h}
                value={h}
              >
                {h}
              </li>
            ))}
          </ul>

          <ul className={classes.list}>
            {minutes.map(m => (
              <li
                className={clsx(currentSelected.minute === m && classes.selected)}
                onClick={updateSelection('minute').bind(null, m)}
                key={m}
                value={m}
              >
                {m}
              </li>
            ))}
          </ul>

          {enableSeconds && (
            <ul className={classes.list}>
              {seconds.map(s => (
                <li
                  className={clsx(currentSelected.second === s && classes.selected)}
                  onClick={updateSelection('second').bind(null, s)}
                  key={s}
                  value={s}
                >
                  {s}
                </li>
              ))}
            </ul>
          )}

          {format === TIME_PICKER_FORMAT.STANDARD && (
            <ul className={classes.list}>
              {amPm.map(p => (
                <li
                  className={clsx(currentSelected.period === p && classes.selected)}
                  onClick={updateSelection('period').bind(null, p)}
                  key={p}
                  value={p}
                >
                  {p}
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className={classes.footer}>
          <ButtonV2
            size={BUTTON_V2_SIZE.SMALL}
            variant={BUTTON_V2_VARIANT.GHOST}
            onClick={closeHandler}
          >
            Close
          </ButtonV2>
          <ButtonV2 size={BUTTON_V2_SIZE.SMALL} onClick={handleTimeChange}>
            Ok
          </ButtonV2>
        </div>
      </PopoverContent>
    </Popover>
  )
}

TimePicker.displayName = 'TimePicker'
