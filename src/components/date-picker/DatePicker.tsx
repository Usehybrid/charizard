import * as React from 'react'
import classes from './date-picker.module.css'
import calender from '../assets/calender.svg'
import chevronLeft from '../assets/chevron-left.svg'
import chevronRight from '../assets/chevron-right.svg'
import clsx from 'clsx'
import {format, isDate, parseISO} from 'date-fns'
import {DayPicker, DropdownOption, Matcher, PropsSingle, useDayPicker} from 'react-day-picker'
import {Placement} from '@popperjs/core'
import {
  SVG,
  Popover,
  PopoverTrigger,
  PopoverContent,
  SelectV2,
  Button,
  BUTTON_TYPE,
  BUTTON_SIZE,
  BUTTON_VARIANT,
} from '../index'
import {StylesConfig} from 'react-select'
import {create} from 'zustand'
import {MonthYear} from './type'

type DateStore = {
  instances: Map<string, MonthYear>
  getInstanceMonthYear: (id: string) => MonthYear | undefined
  setInstanceMonthYear: (id: string, value: MonthYear) => void
  removeInstance: (id: string) => void
}

const useDateStore = create<DateStore>()((set, get) => ({
  instances: new Map(),
  getInstanceMonthYear: (id: string) => {
    return get().instances.get(id)
  },
  setInstanceMonthYear: (id: string, value: MonthYear) => {
    const instances = new Map(get().instances)
    instances.set(id, value)
    set({instances})
  },
  removeInstance: (id: string) => {
    const instances = new Map(get().instances)
    instances.delete(id)
    set({instances})
  },
}))

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
  trigger?: React.ReactNode
  startMonth?: Date
  endMonth?: Date
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
  trigger,
  startMonth = new Date(2020, 0),
  endMonth = new Date(2050, 0),
  ...props
}: DatePickerProps) {
  const datePickerInstanceId = React.useId()
  const setInstanceMonthYear = useDateStore(state => state.setInstanceMonthYear)
  const removeInstance = useDateStore(state => state.removeInstance)

  const [monthYear, setLocalMonthYear] = React.useState(() => ({
    month: new Date().getMonth(),
    year: new Date().getFullYear(),
  }))

  const setMonthYear = React.useCallback(
    (value: MonthYear) => {
      setLocalMonthYear(value)
      setInstanceMonthYear(datePickerInstanceId, value)
    },
    [datePickerInstanceId],
  )

  React.useEffect(() => {
    setInstanceMonthYear(datePickerInstanceId, monthYear)
    return () => {
      removeInstance(datePickerInstanceId)
    }
  }, [datePickerInstanceId, monthYear, setInstanceMonthYear, removeInstance])

  React.useEffect(() => {
    if (value && !isNaN(new Date(value).getTime())) {
      setMonthYear({
        month: new Date(value).getMonth(),
        year: new Date(value).getFullYear(),
      })
    }
  }, [value])

  const date = React.useMemo(() => {
    if (value) {
      const parsedDate = isDate(value) ? value : parseISO(value)
      return parsedDate
    }
    return undefined
  }, [value])

  const displayDate = React.useMemo(() => {
    if (!date) return 'Pick a date'
    const formattedDate = format(date, displayDateFormat)
    return formattedDate
  }, [date, displayDateFormat])

  const btnRef = React.useRef<HTMLDivElement>(null)

  const handleDateSelect: any = (selectedDate: any) => {
    if (!selectedDate) {
      onChange('')
      return
    }
    const formattedSelectedDate = format(selectedDate, 'yyyy-MM-dd')
    onChange(formattedSelectedDate)
    btnRef?.current?.click()
  }

  return (
    <div className={clsx(classes.datePicker)} style={customContainerStyles}>
      <Popover placement={'bottom'}>
        <PopoverTrigger openOnHover={false}>
          {trigger ? (
            <div ref={btnRef}>{trigger}</div>
          ) : variant === 'form' ? (
            <button
              type="button"
              className={clsx('zap-reset-btn', classes.formButton)}
              disabled={disableDatepicker}
              style={{
                padding: '0 12px',
                cursor: disableDatepicker ? 'not-allowed' : 'pointer',
                caretColor: isError || errorMsg ? 'var(--status-danger)' : undefined,
                borderColor: isError || errorMsg ? 'var(--status-danger)' : undefined,
                height: '32px',
              }}
            >
              <div className={classes.formBtnInner} ref={btnRef}>
                <span style={{color: !date ? 'var(--text-secondary)' : undefined}}>
                  {displayDate}
                </span>
                <SVG path={calender} width={20} height={20} />
              </div>
            </button>
          ) : (
            <Button
              variant={buttonVariant}
              size={BUTTON_SIZE.SMALL}
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
          {errorMsg && (
            <p className={clsx('zap-subcontent-medium', classes.errorMsg)}>{errorMsg}</p>
          )}
        </PopoverTrigger>
        <PopoverContent
          bg="var(--neutral-white)"
          className={classes.popoverContent}
          positionerStyles={{zIndex: 20}}
        >
          <DayPicker
            showOutsideDays={showOutsideDays}
            captionLayout="dropdown"
            startMonth={startMonth}
            endMonth={endMonth}
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
              Dropdown: props => <Dropdown monthYear={monthYear} setMonthYear={setMonthYear} {...props} />,
              Nav: props => <Nav monthYear={monthYear} setMonthYear={setMonthYear} {...props} />,
            }}
            mode={mode}
            defaultMonth={date}
            selected={date}
            onSelect={handleDateSelect}
            numberOfMonths={1}
            disabled={disableDatepicker ? true : disabled}
            month={new Date(monthYear.year, monthYear.month)}
            {...props}
          />
        </PopoverContent>
      </Popover>
    </div>
  )
}

const dropdownStyles: StylesConfig<any> = {
  control: (baseStyles, state) => {
    return {
      ...baseStyles,
      borderWidth: '1px',
      borderStyle: 'solid',
      borderRadius: '4px',
      minHeight: '32px',
      padding: '4px',
      ':hover': {
        borderColor: '#254DDA',
      },
      borderColor: state.isFocused ? '#254DDA' : '#E5E9FB',
      backgroundColor: '#fff',
      gap: '4px',
      opacity: state.isDisabled ? 0.5 : 1,
    }
  },
}

function Dropdown({monthYear, setMonthYear, ...props}: any) {
  const isYearDropdown = props['aria-label'] === 'Choose the Year'

  let selectedOption: DropdownOption | undefined = undefined
  if (isYearDropdown) {
    selectedOption = props.options?.find((option: any) => {
      return option.value === monthYear.year
    })
  } else {
    selectedOption = props.options?.find((option: any) => {
      return option.value === monthYear.month
    })
  }
  const monthYearHandler = (value: any) => {
    setMonthYear({
      month: !isYearDropdown ? value || 0 : monthYear.month,
      year: isYearDropdown ? value : monthYear.year,
    })
  }
  return (
    <SelectV2
      options={props.options as any}
      onChange={monthYearHandler}
      isClearable={false}
      value={selectedOption}
      mainContainerClassName={isYearDropdown ? classes.yearDropdown : classes.monthDropdown}
      customStyles={dropdownStyles}
    />
  )
}

function Nav({monthYear, setMonthYear}: any) {
  const {nextMonth, previousMonth} = useDayPicker()
  return (
    <div className={classes.navContainer}>
      <Button
        disabled={!previousMonth}
        type={BUTTON_TYPE.ICON_ONLY}
        size={BUTTON_SIZE.SMALL}
        variant={BUTTON_VARIANT.SECONDARY}
        onClick={e => {
          e.preventDefault()
          setMonthYear({
            year: monthYear.month === 0 ? monthYear.year - 1 : monthYear.year,
            month: monthYear.month === 0 ? 11 : monthYear.month - 1,
          })
        }}
        icon={<SVG path={chevronLeft} width={20} height={20} />}
      ></Button>
      <Button
        disabled={!nextMonth}
        type={BUTTON_TYPE.ICON_ONLY}
        size={BUTTON_SIZE.SMALL}
        variant={BUTTON_VARIANT.SECONDARY}
        onClick={e => {
          e.preventDefault()
          setMonthYear({
            year: monthYear.month === 11 ? monthYear.year + 1 : monthYear.year,
            month: monthYear.month === 11 ? 0 : monthYear.month + 1,
          })
        }}
        icon={<SVG path={chevronRight} width={20} height={20} />}
      ></Button>
    </div>
  )
}
