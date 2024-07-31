import clsx from 'clsx'
import classes from './styles.module.css'
import {USER_CHIP_STATUS, UserChip} from '../../../user-chip'
import {Key} from 'react'
import {Detail, Task, Value} from '../../types'

export default function Card({data}: {data: Task}) {
  function isObject(value: Value | string | null): value is Value {
    return typeof value === 'object' && value !== null && 'first_name' in value
  }

  return (
    <div className={classes.card}>
      <div className={classes.taskSection}>
        <div className={classes.taskName}>{data.name}</div>
        <div className={classes.dateAndTime}>{data.date}</div>
      </div>
      <div className={classes.detailsSection}>
        {data.details.map((detail: Detail, i: Key) => (
          <div key={i} className={classes.detail}>
            <div className={classes.detailKey}>{detail.key}</div>
            {detail.value && isObject(detail.value) ? (
              <div className={classes.userChip}>
                <UserChip
                  status={USER_CHIP_STATUS.NEUTRAL}
                  username={detail.value.first_name}
                  profileImgUrl={detail.value.profile_img_url}
                  selected
                />
              </div>
            ) : detail.value === null ? (
              <div className={classes.detailValue}>N/A</div>
            ) : (
              <div className={classes.detailValue}>{detail.value}</div>
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
