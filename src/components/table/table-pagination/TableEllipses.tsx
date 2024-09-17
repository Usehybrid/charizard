import * as React from 'react'
import * as select from '@zag-js/select'
import clsx from 'clsx'
import threeDots from '../../assets/three-dots.svg'
import classes from './table-pagination.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {SVG} from '../../svg'
import {generateRange} from './utils'

interface TableEllipsesProps {
  paginationApi: any
  i: number
}

export default function TableEllipses({paginationApi, i}: TableEllipsesProps) {
  const x = paginationApi.pages[i - 1].value
  const y = paginationApi.pages[i + 1].value

  const collection = select.collection({
    items: generateRange(x, y),
    itemToString: item => item.label,
    itemToValue: item => item.value,
  })

  const [_state, _send] = useMachine(
    select.machine({
      id: React.useId(),
      collection,
      onValueChange(details) {
        const val = details.value[0]
        paginationApi.setPage(+val)
      },
    }),
  )

  const selectApi = select.connect(_state, _send, normalizeProps)
  return (
    <div {...selectApi.getRootProps()} key={`ellipsis-${i}`}>
      <div {...selectApi.getControlProps()}>
        <button {...selectApi.getTriggerProps()} className={'zap-reset-btn'}>
          <div
            key={`ellipsis-${i}`}
            {...paginationApi.getEllipsisProps({index: i})}
            className={classes.pageBox}
          >
            <SVG path={threeDots} svgClassName={classes.arrowIcon} />
          </div>
        </button>
      </div>

      {selectApi.open && (
        <Portal>
          <div {...selectApi.getPositionerProps()} className={classes.paginationMenu}>
            <ul {...selectApi.getContentProps()} className={classes.limitContent}>
              {generateRange(x, y).map(item => (
                <li
                  key={item.value}
                  {...selectApi.getItemProps({item})}
                  className={clsx(classes.limitItem, 'zap-subcontent-medium')}
                >
                  <span>{item.label}</span>
                </li>
              ))}
            </ul>
          </div>
        </Portal>
      )}
    </div>
  )
}
