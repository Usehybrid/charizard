import * as tooltip from '@zag-js/tooltip'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {FilterOptions, InternalTableFilters} from '../types'
import clsx from 'clsx'

type FilterTooltipProps = {
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
      <div
        {...tooltipApi.getTriggerProps()}
        className={clsx('zap-reset-btn', classes.filterTooltipTrigger)}
      >
        <div className={clsx(classes.filterCol, 'zap-button-small')}>{filter.name}</div>
        {selectedFilters !== 0 && <span className={classes.totalSelected}>{selectedFilters}</span>}
      </div>
      {tooltipApi.open && selectedFilters !== 0 && (
        <div {...tooltipApi.getPositionerProps()}>
          <div {...tooltipApi.getContentProps()} className={classes.filterTooltip}>
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
