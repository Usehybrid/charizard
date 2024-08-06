import * as React from 'react'
import classes from './date-picker.module.css'
import calender from '../assets/calender.svg'
import chevronLeft from '../assets/chevron-left.svg'
import chevronRight from '../assets/chevron-right.svg'
import {format, isDate, parseISO} from 'date-fns'
import {DayPicker, SelectSingleEventHandler} from 'react-day-picker'
import {Button, BUTTON_VARIANT, SVG, Popover, PopoverTrigger, PopoverContent} from '../index'
import {DatePickerProps} from './types'
import clsx from 'clsx'
export function DatePicker({
  value,
  onChange,
  mode = 'single',
  variant = 'default',
  displayDateFormat = 'do LLL y',
  errorMsg = '',
  disableDatepicker = false,
  disabled,
  buttonVariant = BUTTON_VARIANT.GHOST,
  customContainerClasses,
  popoverConfig,
  isError,
  ...props
}: DatePickerProps) {
  const date = React.useMemo(() => {
    if (value) {
      const parsedDate = isDate(value) ? value : parseISO(value)
      console.log('Parsed date:', parsedDate)
      return parsedDate
    }
    return undefined
  }, [value])

  const displayDate = React.useMemo(() => {
    if (!date) return 'Pick a date'
    const formattedDate = format(date, displayDateFormat)
    console.log('Formatted display date:', formattedDate)
    return formattedDate
  }, [date, displayDateFormat])

  const btnRef = React.useRef<HTMLDivElement>(null)

  const handleDateSelect: SelectSingleEventHandler = selectedDate => {
    if (!selectedDate) {
      onChange('')
      return
    }
    const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd')
    // console.log('Selected date:', formattedSelectedDate)
    onChange(formattedSelectedDate)
    btnRef?.current?.click()
  }

  const DayPickerCLasses = {
    months: classes.months,
    month: classes.month,
    caption: classes.caption,
    caption_label: classes.captionLabel,
    dropdown: classes.dropdown,
    caption_dropdowns: classes.captionDropdowns,
    vhidden: classes.vHidden,
    nav: classes.nav,
    nav_button_previous: classes.navButtonPrevious,
    nav_button_next: classes.navButtonNext,
    table: classes.table,
    head_row: classes.headRow,
    head_cell: classes.headCell,
    row: classes.row,
    cell: classes.cell,
    day_selected: classes.daySelected,
    day_today: classes.dayToday,
    day_outside: classes.dayOutside,
    day_disabled: classes.dayDisabled,
    day_hidden: classes.dayHidden,
    nav_button: classes.navButton,
    day: classes.day,
    dropdown_icon: classes.dropdownIcon,
  }

  return (
    <div className={clsx(classes.datePicker, customContainerClasses)}>
      <Popover placement={'bottom'}>
        <PopoverTrigger openOnHover={false}>
          {variant === 'form' ? (
            <Button
              size="adapt"
              disabled={disableDatepicker}
              variant={BUTTON_VARIANT.MINIMAL}
              customStyles={{
                padding: '6px 12px',
                cursor: disableDatepicker ? 'not-allowed' : 'pointer',
                caretColor: isError || errorMsg ? 'var(--status-danger)' : undefined,
                borderColor:
                  isError || errorMsg ? 'var(--status-danger)' : 'var(--stroke-buttons-input)',
                borderRadius: '4px',
              }}
            >
              <div className={classes.formButton} ref={btnRef}>
                <span
                  style={{
                    color: !date ? 'var(--text-tertiary)' : undefined,
                    fontSize: '14px',
                    fontWeight: 500,
                    lineHeight: '20px',
                    letterSpacing: '0.2px',
                  }}
                >
                  {displayDate}
                </span>
                <SVG path={calender} width={20} height={20} />
              </div>
            </Button>
          ) : (
            <Button
              variant={buttonVariant}
              size="adapt"
              disabled={disableDatepicker}
              customStyles={{cursor: disableDatepicker ? 'not-allowed' : 'pointer'}}
            >
              <div className={classes.buttonContent} ref={btnRef}>
                <SVG
                  path={calender}
                  width={20}
                  height={20}
                  svgClassName={classes.calendarIcon}
                  spanClassName={classes.calendarIconSpan}
                />
                <span style={{color: !date ? 'var(--text-secondary)' : undefined}}>
                  {displayDate}
                </span>
              </div>
            </Button>
          )}
          {errorMsg && <p className={classes.errorMsg}>{errorMsg}</p>}
        </PopoverTrigger>
        <PopoverContent
          bg="var(--neutral-white)"
          className={classes.popoverContent}
          positionerStyles={{zIndex: 20}}
        >
          <DayPicker
            showOutsideDays
            captionLayout="dropdown"
            fromYear={1950}
            toYear={2050}
            classNames={DayPickerCLasses}
            components={{
              IconLeft: () => <SVG path={chevronLeft} width={20} height={20} />,
              IconRight: () => <SVG path={chevronRight} width={20} height={20} />,
            }}
            mode={mode}
            initialFocus
            defaultMonth={date}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={1}
            disabled={disableDatepicker ? true : disabled}
            {...props}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}
