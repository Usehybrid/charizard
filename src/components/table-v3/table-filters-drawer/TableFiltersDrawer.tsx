import * as React from 'react'
import clsx from 'clsx'
import FilterDrawerCheckbox from '../table-header-filters/FilterDrawerCheckbox'
import filterIcon from '../../assets/user-interface/filter-2.svg'
import chevronRight from '../../assets/chevron-right.svg'
import classes from './table-filters-drawer.module.css'
import {SVG} from '../../svg'
import {FilterConfig} from '../types'
import {Search} from '../../search'
import {useTableStore} from '../store'
import {getDefaultCheckedState, removeUncheckedItems} from './utils'
import {useDisclosure} from '../../../utils/hooks/use-disclosure'
import {Portal} from '@zag-js/react'
import {DrawerV2} from '../../drawer-v2'
import {BUTTON_V2_VARIANT} from '../../button-v2'

interface TableFiltersDrawerProps {
  filterConfig: FilterConfig
}

export default function TableFiltersDrawer({filterConfig}: TableFiltersDrawerProps) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [filterCheckedState, setFilterCheckedState] = React.useState<Record<string, any[]>>({})
  const [search, setSearch] = React.useState('')
  const {setDefaultFilters, resetAllFilters, changeFiltersDrawer} = useTableStore(s => ({
    setDefaultFilters: s.setDefaultFilters,
    resetAllFilters: s.resetAllFilters,
    changeFiltersDrawer: s.changeFiltersDrawer,
  }))
  const tableFilters = useTableStore(s => s.filters)
  const {isLoading, isError, headerFilterIds, filterDispatch} = filterConfig
  const [hasChanges, setHasChanges] = React.useState(false)

  const filters = filterConfig.filters?.drawer ? filterConfig.filters.drawer : []
  const headerFilterKeys = filterConfig.filters?.header
    ? filterConfig.filters.header.map(f => f.key)
    : []

  const [currFilter, setCurrFilter] = React.useState(filters[0])

  React.useEffect(() => {
    if (!filters?.length || isLoading) return
    const mapFn = (filter: any) => ({key: filter.key, values: []})
    setDefaultFilters(
      // @ts-ignore
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
  }, [isOpen])

  const getIsChecked = (key: string, idx: number) => {
    const l = Object.keys(filterCheckedState).length
    if (!l || !filterCheckedState[key]) return false
    return filterCheckedState[key][idx].checked
  }
  const handleApplyFilters = () => {
    const checkedState = removeUncheckedItems(filterCheckedState)
    Object.entries(checkedState).forEach(([key, value]) => {
      // Call changeFiltersDrawer for every filter, passing the checked values or an empty array if none
      changeFiltersDrawer(key, value ? value.split(',') : [], filterDispatch)
    })
    onClose()
  }

  const totalSelectedFilters = tableFilters
    .filter(tF => !headerFilterKeys.includes(tF.key))
    .reduce((acc, curr) => {
      return (acc += curr.values.length)
    }, 0)

  const footerBtn = [
    {
      btnText: 'Cancel',
      onClick: onClose,
      variant: BUTTON_V2_VARIANT.TERTIARY,
    },
    {
      btnText: 'Reset All',
      onClick: () => {
        if (search.length) setSearch('')
        resetAllFilters(filterConfig.filterReset)
        setHasChanges(false)
        onClose()
      },
      variant: BUTTON_V2_VARIANT.SECONDARY,
    },
    {
      btnText: 'Apply',
      onClick: handleApplyFilters,
    },
  ]

  return (
    <>
      <button
        className={clsx('zap-reset-btn', classes.filterBtn, 'zap-button-small')}
        onClick={onOpen}
      >
        <SVG path={filterIcon} svgClassName={classes.filterIcon} />
        Filters
        {totalSelectedFilters !== 0 && (
          <span className={clsx(classes.totalSelected, 'zap-subcontent-regular')}>
            {totalSelectedFilters}
          </span>
        )}
      </button>

      <Portal>
        {isOpen && (
          <DrawerV2
            isOpen={isOpen}
            title="Filters"
            onClose={onClose}
            customContainerStyles={{width: '512px'}}
            buttons={footerBtn}
            contentClassName={classes.content}
          >
            <div className={classes.filterBox}>
              <div className={classes.filters}>
                {filters.map(filter => {
                  const isActive = currFilter?.id === filter.id
                  const internalFilter = tableFilters.find(tf => tf.key === filter.key)
                  return (
                    <div
                      className={clsx(
                        classes.filter,
                        isActive && classes.active,
                        'zap-content-medium',
                      )}
                      onClick={() => {
                        setSearch('')
                        setCurrFilter(filter)
                      }}
                      key={filter.id}
                    >
                      {filter.name}{' '}
                      {`${internalFilter?.values.length ? `(${internalFilter.values.length})` : ''}`}
                      <SVG
                        path={chevronRight}
                        spanClassName={classes.chevronRightSpan}
                        svgClassName={classes.chevronRight}
                      />
                    </div>
                  )
                })}
              </div>

              <div className={classes.filterSingle}>
                {!currFilter?.config?.hideSearch && (
                  <div className={classes.dropdownSearch}>
                    <Search
                      id="filter-search"
                      search={search}
                      setSearch={setSearch}
                      placeholder={currFilter.config?.placeholder || 'Search'}
                      // customStyles={{customInputStyles: {borderRadius: '8px'}}}
                      customStyles={{
                        customInputStyles: {borderRadius: '8px', height: '28px'},
                        customIconStyles: {top: '4px'},
                      }}
                    />
                  </div>
                )}

                {
                  <div className={classes.options}>
                    {filteredOptions.length === 0 ? (
                      <div className={'zap-content-regular'}>No search results found</div>
                    ) : (
                      <>
                        {/* <div className={classes.option} style={{fontWeight: 700}}>
                              <FilterDrawerCheckbox
                                label={'All'}
                                value={'all'}
                                filterKey={currFilter.key}
                                checked={
                                  filterCheckedState[currFilter.key]?.findIndex(
                                    obj => obj.checked === false,
                                  ) === -1
                                }
                                setFilterCheckedState={setFilterCheckedState}
                                idx={-1}
                              />
                            </div> */}
                        {currFilter?.options.map((option, idx) => {
                          return (
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
                                setHasChanges={setHasChanges}
                              />
                            </div>
                          )
                        })}
                      </>
                    )}
                  </div>
                }
              </div>
            </div>
          </DrawerV2>
        )}
      </Portal>
    </>
  )
}
