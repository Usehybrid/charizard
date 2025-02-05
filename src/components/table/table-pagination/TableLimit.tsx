import classes from './table-pagination.module.css'
import {useRef} from 'react'
import {BUTTON_SIZE, BUTTON_VARIANT, Button} from '../../button'

interface TableLimitProps {
  setLimit: (l: number) => void
  limit: number
  itemsOnPage?: number
  totalItems?: number
}

export default function TableLimit({setLimit, limit, itemsOnPage, totalItems}: TableLimitProps) {
  const groupActionRef = useRef<{blur: () => void}>(null)

  const handleLimitChange = (newLimit: number) => {
    setLimit(newLimit)
    groupActionRef.current?.blur()
  }

  const selectData = [
    {label: '25', value: '25', onClick: () => handleLimitChange(25)},
    {label: '50', value: '50', onClick: () => handleLimitChange(50)},
    {label: '75', value: '75', onClick: () => handleLimitChange(75)},
    {label: '100', value: '100', onClick: () => handleLimitChange(100)},
  ]

  if (!totalItems || !itemsOnPage || totalItems === 0 || itemsOnPage === 0) {
    return <div className={classes.limitBox} />
  }

  if (itemsOnPage < limit) {
    return <div className={classes.limitBox} />
  }

  return (
    <div className={classes.limitBox}>
      <p className="zap-subcontent-medium">Rows per page</p>
      <Button.GroupAction
        ref={groupActionRef}
        menuItems={selectData}
        variant={BUTTON_VARIANT.TERTIARY}
        size={BUTTON_SIZE.SMALL}
        customStyles={{
          customMenuStyles: {minWidth: '63px'},
          customButtonStyles: {minWidth: '40px'},
        }}
      >
        {limit}
      </Button.GroupAction>
    </div>
  )
}
