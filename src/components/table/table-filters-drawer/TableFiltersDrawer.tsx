import {Portal} from '@zag-js/react'
import clsx from 'clsx'
import * as React from 'react'
import {useDisclosure} from '../../../utils/hooks/use-disclosure'
import chevronRight from '../../assets/chevron-right.svg'
import filterIcon from '../../assets/user-interface/filter-2.svg'
import {BUTTON_V2_VARIANT} from '../../button-v2'
import {DrawerV2} from '../../drawer-v2'
import {Search} from '../../search'
import {SVG} from '../../svg'
import {useTableStore} from '../store'
import FilterDrawerCheckboxNew from '../table-header-filters/FilterDrawerCheckboxNew'
import {FilterConfig, MenuConfig} from '../types'
import classes from './table-filters-drawer.module.css'
import {getDefaultCheckedState, removeUncheckedItems} from './utils'

interface TableFiltersDrawerProps {
  filterConfig: FilterConfig
}

export default function TableFiltersDrawer({filterConfig}: TableFiltersDrawerProps) {
  const {isOpen, onOpen, onClose} = useDisclosure()
  const [filterCheckedState, setFilterCheckedState] = React.useState<Record<string, any[]>>({})
  const [allCheckedState, setAllCheckedState] = React.useState<Record<string, boolean>>({})
  const [search, setSearch] = React.useState('')
  const {resetAllFilters, changeFiltersDrawer} = useTableStore(s => ({
    setDefaultFilters: s.setDefaultFilters,
    resetAllFilters: s.resetAllFilters,
    changeFiltersDrawer: s.changeFiltersDrawer,
  }))
  const tableFilters = useTableStore(s => s.filters)
  const {filterDispatch} = filterConfig

  const filters = filterConfig.filters?.drawer ? filterConfig.filters.drawer : []
  const headerFilterKeys = filterConfig.filters?.header
    ? filterConfig.filters.header.map(f => f.key)
    : []

  const [currFilter, setCurrFilter] = React.useState(filters[0])

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
    updateAllCheckedState(obj)
  }, [])

  React.useEffect(() => {
    const obj = getDefaultCheckedState(filters, tableFilters)
    setFilterCheckedState(obj)
    updateAllCheckedState(obj)
  }, [isOpen])

  const updateAllCheckedState = (state: Record<string, any[]>) => {
    const newAllCheckedState = {...allCheckedState}
    filters.forEach(filter => {
      newAllCheckedState[filter.key] = state[filter.key]?.every(obj => obj.checked) || false
    })
    setAllCheckedState(newAllCheckedState)
  }

  const toggleAll = (filterKey: string, checked: boolean) => {
    setFilterCheckedState(prevState => {
      const newState = {...prevState}
      newState[filterKey] = newState[filterKey].map(item => ({...item, checked}))
      updateAllCheckedState(newState)
      return newState
    })
  }

  const handleApplyFilters = () => {
    const checkedState = removeUncheckedItems(filterCheckedState)
    Object.entries(checkedState).forEach(([key, value]) => {
      changeFiltersDrawer(key, value ? value.split(',') : [], filterDispatch)
    })
    onClose()
  }

  const getIsChecked = (key: string, idx: number) => {
    if (!filterCheckedState[key]) return false
    return filterCheckedState[key][idx].checked
  }

  const handleIndividualCheckboxChange = (filterKey: string, idx: number, checked: boolean) => {
    setFilterCheckedState(prevState => {
      const newState = {...prevState}
      newState[filterKey][idx].checked = checked
      updateAllCheckedState(newState)
      return newState
    })
  }

  const totalSelectedFilters = tableFilters
    .filter(tF => !headerFilterKeys.includes(tF.key))
    .reduce((acc, curr) => acc + curr.values.length, 0)

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
                  const selectedCount =
                    filterCheckedState[filter.key]?.filter(obj => obj.checked).length || 0

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
                      {selectedCount > 0 && (
                        <span style={{marginLeft: '4px'}}>({selectedCount})</span>
                      )}
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
                {!(currFilter?.config as MenuConfig)?.hideSearch && (
                  <div className={classes.dropdownSearch}>
                    <Search
                      id="filter-search"
                      search={search}
                      setSearch={setSearch}
                      placeholder={(currFilter.config as MenuConfig)?.placeholder || 'Search'}
                      customStyles={{
                        customInputStyles: {borderRadius: '8px', height: '28px'},
                        customIconStyles: {top: '4px'},
                      }}
                    />
                  </div>
                )}

                <div className={classes.options}>
                  {filteredOptions.length === 0 ? (
                    <div className={'zap-content-regular'}>No search results found</div>
                  ) : (
                    <>
                      <div className={classes.option} style={{fontWeight: 700}}>
                        <FilterDrawerCheckboxNew
                          label="All"
                          checked={allCheckedState[currFilter.key]}
                          onChange={checked => toggleAll(currFilter.key, checked)}
                          customStyles={{fontWeight: 600}}
                        />
                      </div>
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
                          <FilterDrawerCheckboxNew
                            label={option.name}
                            checked={getIsChecked(currFilter.key, idx)}
                            onChange={checked =>
                              handleIndividualCheckboxChange(currFilter.key, idx, checked)
                            }
                            countryCode={option.country_code}
                            customName={option.customName}
                          />
                        </div>
                      ))}
                    </>
                  )}
                </div>
              </div>
            </div>
          </DrawerV2>
        )}
      </Portal>
    </>
  )
}
