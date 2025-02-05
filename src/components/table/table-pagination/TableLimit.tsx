import classes from './table-pagination.module.css'
import {BUTTON_SIZE, BUTTON_VARIANT, Button} from '../../button'

interface TableLimitProps {
  setLimit: (l: number) => void
  limit: number
  itemsOnPage?: number
  totalItems?: number
}

export default function TableLimit({setLimit, limit, itemsOnPage, totalItems}: TableLimitProps) {
  const selectData = [
    {label: '25', value: '25', onClick: () => setLimit(25)},
    {label: '50', value: '50', onClick: () => setLimit(50)},
    {label: '75', value: '75', onClick: () => setLimit(75)},
    {label: '100', value: '100', onClick: () => setLimit(100)},
  ]

  // Return empty div if no items or itemsOnPage is 0
  if (!totalItems || totalItems === 0 || itemsOnPage === 0) {
    return <div className={classes.limitBox} />
  }

  const minLimit = +selectData[0].value

  // Hide component if either total items or items on current page is less than minimum limit
  if (totalItems < minLimit || (itemsOnPage && itemsOnPage < minLimit)) {
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
