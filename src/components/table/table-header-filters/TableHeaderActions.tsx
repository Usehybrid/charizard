import {ReactElement} from 'react'
import classes from './styles-new.module.css'

export default function TableHeaderActions({
  customActionItems,
}: {
  customActionItems?: ReactElement[]
}) {
  return (
    <div className={classes.customHeaderActionButtons}>
      {customActionItems && customActionItems.length > 0
        ? customActionItems.map((item, index) => <div key={`header-action-${index}`}>{item}</div>)
        : null}
    </div>
  )
}
