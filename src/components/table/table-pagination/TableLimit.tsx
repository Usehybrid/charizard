import classes from './table-pagination.module.css'
import {BUTTON_SIZE, BUTTON_VARIANT, Button} from '../../button'

interface TableLimitProps {
  setLimit: (l: number) => void
  limit: number
  itemsOnPage?: number
}

export default function TableLimit({setLimit, limit, itemsOnPage}: TableLimitProps) {
  let selectData = [
    {label: '25', value: '25', onClick: () => setLimit(25)},
    {label: '50', value: '50', onClick: () => setLimit(50)},
    {label: '75', value: '75', onClick: () => setLimit(75)},
    {label: '100', value: '100', onClick: () => setLimit(100)},
  ]

  // when the filters/search or any items are less than the least possible limit, hide the comp
  if (itemsOnPage && itemsOnPage < +selectData[0].value) {
    return <div className={classes.limitBox} />
  }

  return (
    <div className={classes.limitBox}>
      <p className="zap-subcontent-medium">Rows per page</p>
      <Button.GroupAction
        menuItems={selectData}
        variant={BUTTON_VARIANT.TERTIARY}
        size={BUTTON_SIZE.SMALL}
        customStyles={{customMenuStyles: {minWidth: '63px'}}}
      >
        {limit}
      </Button.GroupAction>
    </div>
  )
}
