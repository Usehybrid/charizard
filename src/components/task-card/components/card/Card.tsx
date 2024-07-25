import clsx from 'clsx'
import classes from './styles.module.css'

export default function Card({data}: any) {
  return (
    <div className={classes.card}>
      <div className={classes.taskSection}>
        <div className={classes.taskName}>{data.name}</div>
        <div className={classes.dateAndTime}>{data.date}</div>
      </div>
      <div className={classes.detailsSection}>
        {data.details.map((detail: any) => (
          <div key={detail.key} className={classes.detail}>
            <div className={classes.detailKey}>{detail.key}</div>
            {detail.value === null ? (
              <div className={classes.detailValue}>N/A</div>
            ) : typeof detail.value === 'string' ? (
              <div className={classes.detailValue}>{detail.value}</div>
            ) : (
              <div className={classes.detailValue}>{detail.value.first_name}</div>
            )}
          </div>
        ))}
      </div>
      <div className={classes.statusSection}>
        <div className={clsx(classes.statusPill, classes[`statusPill-${data.status}`])}>
          <div className={clsx(classes.statusIcon, classes[`statusIcon-${data.status}`])}></div>
          <div className={clsx(classes.status, classes[`status-${data.status}`])}>
            {data.status}
          </div>
        </div>
      </div>
      <div></div>
    </div>
  )
}
