import {Option} from '../select-v2'

export const RANGE_OPTIONS: Option[] = [
  {label: 'Custom', value: 'custom'},
  {label: 'Year to date', value: 'ytd'},
  {label: 'Today', value: 'today'},
  {label: 'Last 7 days', value: '7days'},
  {label: 'Last month', value: '1month'},
  {label: 'Last 3 months', value: '3months'},
  {label: 'Last 6 months', value: '6months'},
  {label: 'Last year', value: '1year'},
]

export const dateFormatter = new Intl.DateTimeFormat('en-US', {
  day: '2-digit',
  month: 'short',
  year: 'numeric',
})
