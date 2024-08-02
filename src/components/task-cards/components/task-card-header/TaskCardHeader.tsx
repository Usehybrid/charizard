import classes from './task-card-header.module.css'

export default function TaskCardHeader({headers}: {headers: string[]}) {
  return (
    <div className={classes.taskCardHeader}>
      {headers.map((header: string, idx: number) => (
        <div key={idx} className="zap-caption-medium">
          {header}
        </div>
      ))}
    </div>
  )
}
