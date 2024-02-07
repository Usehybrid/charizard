import * as React from 'react'
import * as select from '@zag-js/select'

import threeDots from '../../assets/three-dots.svg'
import classes from './table-pagination.module.css'

import {useMachine, normalizeProps, Portal, PropTypes} from '@zag-js/react'
import {SVG} from '../../svg'

interface TableEllipsesProps {
  paginationApi: any
  i: number
}

const selectData = [
  {label: '10', value: '10'},
  {label: '15', value: '15'},
  {label: '20', value: '20'},
  {label: '25', value: '25'},
  {label: '25', value: '25'},
  {label: '25', value: '25'},
  {label: '25', value: '25'},
  {label: '25', value: '25'},
]

export default function TableEllipses({paginationApi, i}: TableEllipsesProps) {
  //   console.log(paginationApi.pages)

  const ellipseFirstIdx = paginationApi.pages.findIndex((p: any) => p.type === 'ellipsis')
  const ellipseLastIdx = paginationApi.pages.findLastIndex((p: any) => p.type === 'ellipsis')

  const generateRange = () => {
    const result: {
      label: string
      value: string
    }[] = []

    const x = paginationApi.pages[i - 1].value
    const y = paginationApi.pages[i + 1].value

    for (let i = x + 1; i < y; i++) {
      result.push({label: String(i), value: String(i)})
    }
    return result
  }

  const collection = select.collection({
    items: generateRange(),
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
    <div {...selectApi.rootProps} key={`ellipsis-${i}`}>
      <div {...selectApi.controlProps}>
        <button {...selectApi.triggerProps} className={'hybr1d-ui-reset-btn'}>
          <div
            key={`ellipsis-${i}`}
            {...paginationApi.getEllipsisProps({index: i})}
            className={classes.pageBox}
          >
            <SVG path={threeDots} svgClassName={classes.arrowIcon} />
          </div>
        </button>
      </div>

      {selectApi.isOpen && (
        <Portal>
          <div {...selectApi.positionerProps}>
            <ul {...selectApi.contentProps} className={classes.limitContent}>
              {generateRange().map(item => (
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
  )
}
