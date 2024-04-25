import * as React from 'react'
import * as select from '@zag-js/select'
import chevronDown from '../../assets/chevron-down.svg'
import classes from './table-pagination.module.css'
import {
  useMachine,
  normalizeProps,
  // Portal
} from '@zag-js/react'
import {SVG} from '../../svg'

interface TableLimitProps {
  setLimit: (l: number) => void
  limit: number
  totalItems?: number
  itemsOnPage?: number
}

let selectData = [
  {label: '10', value: '10'},
  {label: '15', value: '15'},
  {label: '20', value: '20'},
  {label: '25', value: '25'},
]

export default function TableLimit({setLimit, limit, totalItems, itemsOnPage}: TableLimitProps) {
  const collection = select.collection({
    items: selectData,
    itemToString: item => item.label,
    itemToValue: item => item.value,
  })

  const [state, send] = useMachine(
    select.machine({
      id: React.useId(),
      collection,
      value: [limit.toString()],
      onValueChange(details) {
        const val = details.value[0]
        setLimit(+val)
      },
      positioning: {
        placement: 'top',
      },
    }),
  )

  const selectApi = select.connect(state, send, normalizeProps)

  // React.useEffect(() => {
  //   selectApi.setValue([defaultLimit])
  // }, [])

  // when the filters/search or any items are less than the least possible limit, hide the comp
  if (itemsOnPage && itemsOnPage < +selectData[0].value) {
    return <div className={classes.limitBox} />
  }

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

          {selectApi.open && (
            // <Portal>
            <div {...selectApi.positionerProps} className={classes.pos}>
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
            // </Portal>
          )}
        </div>
      }
      out of {totalItems} results
    </div>
  )
}
