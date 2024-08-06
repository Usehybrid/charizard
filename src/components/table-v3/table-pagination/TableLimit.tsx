import * as React from 'react'
// import * as select from '@zag-js/select'
// import chevronDown from '../../assets/chevron-down.svg'
import classes from './table-pagination.module.css'
// import {useMachine, normalizeProps} from '@zag-js/react'
// import {SVG} from '../../svg'
import {BUTTON_V2_SIZE, BUTTON_V2_VARIANT, ButtonV2} from '../../button-v2'

interface TableLimitProps {
  setLimit: (l: number) => void
  limit: number
  totalItems?: number
  itemsOnPage?: number
}

export default function TableLimit({setLimit, limit, totalItems, itemsOnPage}: TableLimitProps) {
  let selectData = [
    {label: '10', value: '10', onClick: () => setLimit(10)},
    {label: '15', value: '15', onClick: () => setLimit(15)},
    {label: '20', value: '20', onClick: () => setLimit(20)},
    {label: '25', value: '25', onClick: () => setLimit(25)},
  ]

  // const collection = select.collection({
  //   items: selectData,
  //   itemToString: item => item.label,
  //   itemToValue: item => item.value,
  // })

  // const [state, send] = useMachine(
  //   select.machine({
  //     id: React.useId(),
  //     collection,
  //     value: [limit.toString()],
  //     onValueChange(details) {
  //       const val = details.value[0]
  //       setLimit(+val)
  //     },
  //     positioning: {
  //       placement: 'top',
  //     },
  //   }),
  // )

  // const selectApi = select.connect(state, send, normalizeProps)

  // React.useEffect(() => {
  //   selectApi.setValue([defaultLimit])
  // }, [])

  // when the filters/search or any items are less than the least possible limit, hide the comp
  if (itemsOnPage && itemsOnPage < +selectData[0].value) {
    return <div className={classes.limitBox} />
  }

  return (
    <div className={classes.limitBox}>
      <p className="zap-subcontent-medium">Rows per page</p>
      {/* {
        <div {...selectApi.getRootProps()}>
          <div {...selectApi.getControlProps()}>
            <button {...selectApi.getTriggerProps()} className={classes.limitTrigger}>
              {selectApi.valueAsString || 'Select limit'}
              <SVG path={chevronDown} svgClassName={classes.chevdownIcon} />
            </button>
          </div>

          {selectApi.open && (
            <div {...selectApi.getPositionerProps()} className={classes.pos}>
              <ul {...selectApi.getContentProps()} className={classes.limitContent}>
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
          )}
        </div>
      } */}

      <ButtonV2.GroupAction
        menuItems={selectData}
        variant={BUTTON_V2_VARIANT.TERTIARY}
        size={BUTTON_V2_SIZE.SMALL}
        customStyles={{customMenuStyles: {minWidth: '63px'}}}
      >
        {limit}
      </ButtonV2.GroupAction>
    </div>
  )
}
