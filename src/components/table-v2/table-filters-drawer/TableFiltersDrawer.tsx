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
import {getDefaultCheckedState, removeUncheckedItems} from './utils'

interface TableFiltersDrawerProps {
  filterConfig: FilterConfig
}

export default function TableFiltersDrawer({filterConfig}: TableFiltersDrawerProps) {
  const [filterCheckedState, setFilterCheckedState] = React.useState<Record<string, any[]>>({})
  const [search, setSearch] = React.useState('')
  const {setDefaultFilters, resetAllFilters, changeFiltersDrawer} = useTableStore(s => ({
    setDefaultFilters: s.setDefaultFilters,
    resetAllFilters: s.resetAllFilters,
    changeFiltersDrawer: s.changeFiltersDrawer,
  }))
  const tableFilters = useTableStore(s => s.filters)
  const {isLoading, isError, headerFilterIds, filterDispatch} = filterConfig

  const [state, send] = useMachine(
    dialog.machine({
      id: 'charizard-table-filters',
      onOpenChange(details) {
        if (!details.open) {
          setFilterCheckedState({})
        }
      },
    }),
  )

  const filters = filterConfig.filters?.drawer ? filterConfig.filters.drawer : []
  const headerFilterKeys = filterConfig.filters?.header
    ? filterConfig.filters.header.map(f => f.key)
    : []
  const [currFilter, setCurrFilter] = React.useState(filters[0])

  const api = dialog.connect(state, send, normalizeProps)

  // console.log(tableFilters)

  React.useEffect(() => {
    if (!filters?.length || isLoading) return
    const mapFn = (filter: any) => ({key: filter.key, values: []})
    setDefaultFilters(
      [...(filterConfig.filters?.header?.map(mapFn) || []), ...filters?.map(mapFn)] || [],
    )
  }, [filters?.length, isLoading])

  const filteredOptions = currFilter?.options
    .filter(option => {
      if (!option.name) return false
      return option.name.toLowerCase().includes(search.toLowerCase())
    })
    .map(op => op.value)

  React.useEffect(() => {
    if (!filters.length) return
    const obj = getDefaultCheckedState(filters, tableFilters)
    setFilterCheckedState(obj)
  }, [])

  React.useEffect(() => {
    const obj = getDefaultCheckedState(filters, tableFilters)
    setFilterCheckedState(obj)
  }, [api.isOpen])

  const getIsChecked = (key: string, idx: number) => {
    const l = Object.keys(filterCheckedState).length
    if (!l || !filterCheckedState[key]) return false
    return filterCheckedState[key][idx].checked
  }

  const handleApplyFilters = () => {
    const checkedState = removeUncheckedItems(filterCheckedState)
    for (let [k, v] of Object.entries(checkedState)) {
      if (v.length) changeFiltersDrawer(k, v.split(','), filterDispatch)
    }
    api.close()
  }

  const totalSelectedFilters = tableFilters
    .filter(tF => !headerFilterKeys.includes(tF.key))
    .reduce((acc, curr) => {
      return (acc += curr.values.length)
    }, 0)

  return (
    <>
      <button
        {...api.triggerProps}
        className={clsx('hybr1d-ui-reset-btn', classes.actionCommon, classes.filterBtn)}
      >
        <SVG path={filterIcon} width={22} height={22} />
        Filter
        {totalSelectedFilters !== 0 && (
          <span className={classes.totalSelected}>{totalSelectedFilters}</span>
        )}
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
                        {`${
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
                        <>
                          {currFilter?.options.map((option, idx) => (
                            <div
                              key={idx}
                              className={classes.option}
                              style={{
                                display: search.length
                                  ? !filteredOptions.includes(option.value)
                                    ? 'none'
                                    : undefined
                                  : undefined,
                              }}
                            >
                              <FilterDrawerCheckbox
                                label={option.name}
                                value={option.value}
                                filterKey={currFilter.key}
                                checked={getIsChecked(currFilter.key, idx)}
                                countryCode={option.country_code}
                                key={option.value}
                                customName={option.customName}
                                setFilterCheckedState={setFilterCheckedState}
                                idx={idx}
                              />
                            </div>
                          ))}
                        </>
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
                  onClick={() => {
                    resetAllFilters(filterConfig.filterReset)
                    api.close()
                  }}
                  disabled={totalSelectedFilters === 0}
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
