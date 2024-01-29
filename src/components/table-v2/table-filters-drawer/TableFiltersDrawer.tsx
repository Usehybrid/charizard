import * as React from 'react'
import * as dialog from '@zag-js/dialog'
import clsx from 'clsx'
import filterIcon from '../../assets/filter-lines.svg'
import closeIcon from '../../assets/close.svg'
import classes from './table-filters-drawer.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {SVG} from '../../svg'
import {BUTTON_VARIANT, Button} from '../../button'

import {FilterConfig} from '../types'
import {Search} from '../../search'
import {useTableStore} from '../store'
import FilterDrawerCheckbox from '../table-header-filters/FilterDrawerCheckbox'

interface TableFiltersDrawerProps {
  filterConfig: FilterConfig
}

export default function TableFiltersDrawer({filterConfig}: TableFiltersDrawerProps) {
  const [state, send] = useMachine(dialog.machine({id: 'charizard-table-filters'}))
  const [search, setSearch] = React.useState('')

  const {isLoading, isError, headerFilterIds} = filterConfig

  const filters = filterConfig.filters.drawer ? filterConfig.filters.drawer : []

  const api = dialog.connect(state, send, normalizeProps)

  const {
    setDefaultFilters,
    addFilters,
    removeFilters,
    resetFilters,
    resetAllFilters,
    addFiltersDrawer,
    tF,
  } = useTableStore(s => ({
    setDefaultFilters: s.setDefaultFilters,
    addFilters: s.addFilters,
    removeFilters: s.removeFilters,
    resetFilters: s.resetFilters,
    resetAllFilters: s.resetAllFilters,
    addFiltersDrawer: s.addFiltersDrawer,
    tF: s.filters,
  }))
  const tableFilters = useTableStore(s => s.filters)
  const [currFilter, setCurrFilter] = React.useState(filters[0])

  console.log(tF, '<=TF')

  React.useEffect(() => {
    if (!filters?.length || isLoading) return

    const mapFn = (filter: any) => ({key: filter.key, values: []})
    setDefaultFilters(
      [
        ...filters?.map(filter => ({key: filter.key, values: []})),
        // ...filterConfig.filters.header?.map(mapFn),
      ] || [],
    )
  }, [filters?.length, isLoading])

  const filteredOptions = currFilter.options.filter(option => {
    if (!option.name) return false
    return option.name.toLowerCase().includes(search.toLowerCase())
  })
  // console.log(filters)

  const [filterCheckedState, setFilterCheckedState] = React.useState<Record<string, any[]>>({})

  // console.log(filterCheckedState, 'fC')

  React.useEffect(() => {
    if (!filters.length) return

    const obj: Record<string, any[]> = {}

    filters.forEach(filter => {
      // plus 1 due to 'All'
      obj[filter.key] = Array(filter.options.length + 1).fill({checked: false})
    })

    setFilterCheckedState(obj)
  }, [])

  // console.log(tableFilters)

  const selectedFilters = tableFilters.find(tf => tf.key === currFilter.key)?.values.length

  const getIsChecked = (key: string, idx: number) => {
    const l = Object.keys(filterCheckedState).length
    if (!l || !filterCheckedState[key]) return false
    // console.log(filterCheckedState[key])
    return filterCheckedState[key][idx].checked
  }

  const handleApplyFilters = () => {
    // console.log(filterCheckedState)

    const checkedState = removeUncheckedItems(filterCheckedState)

    // console.log(checkedState, 'test')

    for (let [k, v] of Object.entries(checkedState)) {
      console.log(k, v)
      addFiltersDrawer(k, v.split(','), filterConfig.filterDispatch)
    }
  }

  return (
    <>
      <button
        {...api.triggerProps}
        className={clsx('hybr1d-ui-reset-btn', classes.actionCommon, classes.filterBtn)}
      >
        <SVG path={filterIcon} width={22} height={22} />
        Filter
      </button>
      {api.isOpen && (
        <Portal>
          <div {...api.backdropProps} className={classes.backdrop} />
          <div {...api.positionerProps} style={{...api.positionerProps.style}}>
            <div {...api.contentProps} className={classes.content}>
              <h2 {...api.titleProps} className={classes.title}>
                <span>Filters</span>
                <button
                  {...api.closeTriggerProps}
                  type="button"
                  // onClick={api?.close}
                  className="hybr1d-ui-reset-btn"
                >
                  <SVG
                    path={closeIcon}
                    svgClassName={classes.closeIcon}
                    spanClassName={classes.closeIconSpan}
                  />
                </button>
              </h2>
              {/* <p {...api.descriptionProps}>
                Make changes to your profile here. Click save when you are done.
              </p> */}
              <div className={classes.filterBox}>
                <div className={classes.filters}>
                  {filters.map(filter => {
                    const isActive = currFilter.id === filter.id
                    const internalFilter = tableFilters.find(tf => tf.key === filter.key)
                    return (
                      <div
                        className={clsx(classes.filter, isActive && classes.active)}
                        onClick={() => setCurrFilter(filter)}
                        key={filter.id}
                      >
                        {filter.name}{' '}
                        {isActive &&
                          `${
                            internalFilter?.values.length ? `(${internalFilter.values.length})` : ''
                          }`}
                      </div>
                    )
                  })}
                </div>

                <div className={classes.filterSingle}>
                  {!currFilter.config?.hideSearch && (
                    <div className={classes.dropdownSearch}>
                      <Search
                        id="filter-search"
                        search={search}
                        setSearch={setSearch}
                        placeholder={currFilter.config?.placeholder || 'Search'}
                      />
                    </div>
                  )}

                  {
                    <div className={classes.options}>
                      {filteredOptions.length === 0 ? (
                        <div className={classes.optionsEmpty}>No results found</div>
                      ) : (
                        filteredOptions.map((option, idx) => (
                          <div key={idx} className={classes.option}>
                            <FilterDrawerCheckbox
                              label={option.name}
                              value={option.value}
                              filterKey={currFilter.key}
                              filterId={currFilter.id}
                              addFilters={addFilters}
                              removeFilters={removeFilters}
                              checked={getIsChecked(currFilter.key, idx)}
                              filterDispatch={filterConfig.filterDispatch}
                              countryCode={option.country_code}
                              key={option.value}
                              customName={option.customName}
                              setFilterCheckedState={setFilterCheckedState}
                              idx={idx}
                            />
                          </div>
                        ))
                      )}
                    </div>
                  }
                </div>
              </div>
              <div className={classes.footer}>
                <Button {...api.closeTriggerProps} variant={BUTTON_VARIANT.SECONDARY}>
                  Cancel
                </Button>
                <Button
                  variant={BUTTON_VARIANT.GHOST}
                  onClick={() => resetAllFilters(filterConfig.filterReset)}
                >
                  Reset All
                </Button>
                <Button onClick={handleApplyFilters}>Apply</Button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}

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

function removeUncheckedItems(input: Filters): FilterResults {
  const result: FilterResults = {}

  for (const key in input) {
    const checkedItems = input[key].filter(item => item.checked)

    // Join the values of checked items into a single string, separated by commas
    const formattedValues = checkedItems.map(item => item.value).join(',')
    result[key] = formattedValues
  }

  return result
}
