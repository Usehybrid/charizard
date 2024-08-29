import * as React from 'react'
import classes from './date-picker.module.css'
import calender from '../assets/calender.svg'
import chevronLeft from '../assets/chevron-left.svg'
import chevronRight from '../assets/chevron-right.svg'
import clsx from 'clsx'
import {format, isDate, parseISO} from 'date-fns'
import {DayPicker, Matcher, PropsSingle} from 'react-day-picker'
import {Placement} from '@popperjs/core'
import {Button, BUTTON_VARIANT, SVG, Popover, PopoverTrigger, PopoverContent} from '../index'

interface DatePickerProps extends PropsSingle {
  value?: Date | string
  onChange: (value?: Date | string) => void
  mode: 'single'
  variant?: 'default' | 'form'
  /**
   * @default 'do LLL y'
   * 'do LLL y' => 1st Jan 2021
   * 'dd LLL y' => 01 Jan 2021
   * 'yyyy-MM-dd' => 2021-01-01
   * 'dd/MM/yyyy' => 01/01/2021
   */
  displayDateFormat?: 'do LLL y' | 'dd LLL y' | 'yyyy-MM-dd' | 'dd/MM/yyyy'
  disableDatepicker?: boolean
  errorMsg?: string
  isError?: boolean
  buttonVariant?: BUTTON_VARIANT
  customContainerStyles?: React.CSSProperties
  popoverConfig?: {
    placement?: Placement
  }
  showOutsideDays?: boolean
  disabled?: Matcher | Matcher[]
}

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
  customContainerStyles,
  popoverConfig,
  isError,
  showOutsideDays = true,
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

  const handleDateSelect: any = (selectedDate: any) => {
    if (!selectedDate) {
      onChange('')
      return
    }
    const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd')
    // console.log('Selected date:', formattedSelectedDate)
    onChange(formattedSelectedDate)
    btnRef?.current?.click()
  }

  return (
    <div className={clsx(classes.huiDatePicker)} style={customContainerStyles}>
      <Popover placement={'bottom'}>
        <PopoverTrigger openOnHover={false}>
          {variant === 'form' ? (
            <Button
              size="adapt"
              disabled={disableDatepicker}
              variant={BUTTON_VARIANT.MINIMAL}
              customStyles={{
                padding: '0 12px',
                cursor: disableDatepicker ? 'not-allowed' : 'pointer',
                caretColor: isError || errorMsg ? 'var(--status-danger)' : undefined,
                borderColor: isError || errorMsg ? 'var(--status-danger)' : undefined,
                height: '32px',
              }}
            >
              <div className={classes.formButton} ref={btnRef}>
                <span style={{color: !date ? 'var(--text-secondary)' : undefined}}>
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
              customStyles={{cursor: disableDatepicker ? 'not-allowed' : 'pointer', height: '32px'}}
            >
              <div className={classes.buttonContent} ref={btnRef}>
                <SVG
                  path={calender}
                  width={20}
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
            showOutsideDays={showOutsideDays}
            captionLayout="dropdown"
            startMonth={new Date(2022, 0)}
            endMonth={new Date(2050, 0)}
            hidden={[{before: new Date(2022, 0), after: new Date(2050, 0)}]}
            classNames={{
              month: classes.month,
              month_caption: classes.caption,
              caption_label: classes.captionLabel,
              dropdown: classes.dropdown,
              dropdowns: classes.captionDropdowns,
              button_previous: classes.navButtonPrevious,
              button_next: classes.navButtonNext,
              month_grid: classes.table,
              weekdays: classes.headRow,
              weekday: classes.headCell,
              week: classes.row,
              day: classes.cell,
              selected: classes.daySelected,
              today: classes.dayToday,
              outside: classes.dayOutside,
              disabled: classes.dayDisabled,
              hidden: classes.dayHidden,
              day_button: classes.dayButton,
              dropdown_icon: classes.dropdownIcon,
            }}
            components={{
              Chevron(props) {
                if (props.orientation === 'left') {
                  return <SVG path={chevronLeft} width={20} height={20} />
                }
                return <SVG path={chevronRight} width={20} height={20} />
              },
            }}
            mode={mode}
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
