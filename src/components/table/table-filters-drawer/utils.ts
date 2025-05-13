import {FilterOptions, InternalTableFilters} from '../types'

type FilterItem = {
  label?: string
  value?: string
  checked: boolean
}

type Filters = {
  [key: string]: FilterItem[]
}

type FilterResults = {
  [key: string]: string
}

export function removeUncheckedItems(input: Filters): FilterResults {
  const result: FilterResults = {}

  for (const key in input) {
    const checkedItems = input[key].filter(item => item.checked)

    // Join the values of checked items into a single string, separated by commas
    const formattedValues = checkedItems.map(item => item.value).join(',')
    result[key] = formattedValues
  }

  return result
}

export const getDefaultCheckedState = (
  filters: FilterOptions[],
  tableFilters: InternalTableFilters[],
) => {
  const obj: Record<string, any[]> = {}

  filters.forEach(filter => {
    // plus 1 due to 'All'
    obj[filter.key] = Array(filter.options.length)
      .fill({checked: false})
      .map((arr, idx) => {
        return {
          ...arr,
          label: filter.options[idx].name,
          value: filter.options[idx].value,
        }
      })
  })

  tableFilters.forEach(tableFilter => {
    if (tableFilter.values.length) {
      obj[tableFilter.key]?.forEach(o => {
        if (tableFilter.values.includes(o.value)) {
          o.checked = true
        } else {
          o.checked = false
        }
      })
    }
  })

  return obj
}
