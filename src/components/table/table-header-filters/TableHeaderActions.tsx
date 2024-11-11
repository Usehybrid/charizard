import classes from './styles-new.module.css'

export default function TableHeaderActions({
  customActionItems,
}: {
  customActionItems?: JSX.Element[]
}) {
  return (
    <div className={classes.customHeaderActionButtons}>{customActionItems?.map(item => item)}</div>
  )
}
