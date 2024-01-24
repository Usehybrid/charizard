import * as React from 'react'
import * as dialog from '@zag-js/dialog'
import clsx from 'clsx'
import filterIcon from '../../assets/filter-lines.svg'
import closeIcon from '../../assets/close.svg'
import classes from './table-filters-drawer.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {SVG} from '../../svg'
import {BUTTON_VARIANT, Button} from '../../button'
import {TableV2Props} from '../TableV2'
import {FilterConfig} from '../types'
import {Search} from '../../search'

interface TableFiltersDrawerProps {
  filterConfig: FilterConfig
}

export default function TableFiltersDrawer({filterConfig}: TableFiltersDrawerProps) {
  const [state, send] = useMachine(dialog.machine({id: 'charizard-table-filters'}))
  const [search, setSearch] = React.useState('')

  const {isLoading, isError, filters: _filters, headerFilterIds} = filterConfig

  const filters = headerFilterIds
    ? _filters.filter(f => !headerFilterIds?.includes(f.id))
    : _filters

  const api = dialog.connect(state, send, normalizeProps)

  const [currFilter, setCurrFilter] = React.useState(filters[0])

  // const filteredOptions = filters.filter(option => {
  //   if (!option.name) return false
  //   return option.name.toLowerCase().includes(search.toLowerCase())
  // })
  console.log(filters)
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
                    return (
                      <div
                        className={clsx(classes.filter, isActive && classes.active)}
                        onClick={() => setCurrFilter(filter)}
                        key={filter.id}
                      >
                        {filter.name} {isActive && `(${4})`}
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
                </div>
              </div>

              <div className={classes.footer}>
                <Button {...api.closeTriggerProps} variant={BUTTON_VARIANT.SECONDARY}>
                  Cancel
                </Button>
                <Button variant={BUTTON_VARIANT.GHOST}>Reset All</Button>
                <Button>Apply</Button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
