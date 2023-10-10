/**
 * @author Soham Sarkar <soham@hybr1d.io>
 */

import * as tooltip from '@zag-js/tooltip'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {FilterOptions, InternalTableFilters} from '../types'

interface FilterTooltipProps {
  filter: FilterOptions
  tableFilter: InternalTableFilters
  selectedFilters: number
}
export default function FilterTooltip({filter, tableFilter, selectedFilters}: FilterTooltipProps) {
  const [tooltipState, tooltipSend] = useMachine(tooltip.machine({id: filter.key}))
  const tooltipApi = tooltip.connect(tooltipState, tooltipSend, normalizeProps)

  const tableFilterWithName = filter.options?.filter(op => tableFilter?.values.includes(op.value))

  return (
    <>
      {/* @ts-ignore */}
      <div {...tooltipApi.triggerProps} className={'hybr1d-ui-reset-btn'}>
        <div className={classes.filterCol}>{filter.name}</div>
      </div>
      {tooltipApi.isOpen && selectedFilters !== 0 && (
        <div {...tooltipApi.positionerProps}>
          <div {...tooltipApi.contentProps} className={classes.filterTooltip}>
            {tableFilterWithName.map(value => (
              <div key={value.value} className={classes.filterValue}>
                {value.name}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  )
}
