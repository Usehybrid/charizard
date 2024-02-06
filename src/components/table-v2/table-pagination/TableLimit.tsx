import * as React from 'react'
import * as select from '@zag-js/select'
import chevronDown from '../../assets/chevron-down.svg'
import classes from './table-pagination.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {SVG} from '../../svg'

interface TableLimitProps {
  setLimit: (l: number) => void
  defaultLimit: string
  totalItems?: number
}

const selectData = [
  {label: '10', value: '10'},
  {label: '15', value: '15'},
  {label: '20', value: '20'},
  {label: '25', value: '25'},
]

export default function TableLimit({setLimit, defaultLimit, totalItems}: TableLimitProps) {
  const collection = select.collection({
    items: selectData,
    itemToString: item => item.label,
    itemToValue: item => item.value,
  })

  const [state, send] = useMachine(
    select.machine({
      id: React.useId(),
      collection,
      value: [defaultLimit],
      onValueChange(details) {
        const val = details.value[0]
        setLimit(+val)
      },
    }),
  )

  const selectApi = select.connect(state, send, normalizeProps)

  return (
    <div className={classes.limitBox}>
      Showing
      {
        <div {...selectApi.rootProps}>
          <div {...selectApi.controlProps}>
            <button {...selectApi.triggerProps} className={classes.limitTrigger}>
              {selectApi.valueAsString || 'Select limit'}
              <SVG path={chevronDown} svgClassName={classes.chevdownIcon} />
            </button>
          </div>

          {selectApi.isOpen && (
            <Portal>
              <div {...selectApi.positionerProps}>
                <ul {...selectApi.contentProps} className={classes.limitContent}>
                  {selectData.map(item => (
                    <li
                      key={item.value}
                      {...selectApi.getItemProps({item})}
                      className={classes.limitItem}
                    >
                      <span>{item.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </Portal>
          )}
        </div>
      }
      out of {totalItems} results
    </div>
  )
}
