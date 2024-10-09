export enum TIME_PICKER_FORMAT {
  STANDARD = '12-hours',
  DUAL = '24-hours',
}

export enum TIME_PICKER_TYPE {
  HOUR = 'hour',
  MINUTE = 'minute',
  SECOND = 'second',
}

export enum PERIOD {
  AM = 'AM',
  PM = 'PM',
}

export interface SelectedTime {
  hour: string
  minute: string
  second: string
  period: PERIOD
}
