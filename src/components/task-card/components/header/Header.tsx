import classes from './styles.module.css'

export default function Header() {
  return (
    <div className={classes.taskCardHeader}>
      <div>Task</div>
      <div>Details</div>
      <div>Status</div>
      <div></div>
    </div>
  )
}
