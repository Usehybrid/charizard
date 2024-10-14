import clsx from 'clsx'
import multiplyIcon from '../assets/multiply.svg'
import classes from './user-chip.module.css'
import {SVG} from '../svg'

export enum USER_CHIP_STATUS {
  DEFAULT = 'default',
  NEUTRAL = 'neutral',
  POSITIVE = 'positive',
  WARNING = 'warning',
  ERROR = 'error',
  HIGHLIGHT = 'highlight',
  WHITE = 'white',
}

interface UserChipProps {
  status?: USER_CHIP_STATUS
  selected?: boolean
  username?: string
  profileImgUrl?: string
  isMulti?: boolean
  users?: Array<any>
}

export function UserChip({
  status = USER_CHIP_STATUS.DEFAULT,
  selected = false,
  username,
  profileImgUrl,
  isMulti = false,
  users,
}: UserChipProps) {
  return isMulti ? (
    !!users?.length ? (
      <div className={classes.userChipContainer}>
        <div className={classes.userChipImageContainer}>
          <img
            src={users[0].profile_img_url ? users[0].profile_img_url : ''}
            className={clsx(classes.profileImage, classes.firstImage)}
          />
          {users?.length > 1 && (
            <img
              src={users[1].profile_img_url ? users[1].profile_img_url : ''}
              className={clsx(classes.profileImage, classes.secondImage)}
            />
          )}
        </div>
        <div className={clsx(classes.userCount, 'zap-caption-semibold')}>{users.length}</div>
      </div>
    ) : (
      <div className={classes.userChipContainerEmpty}>
        <div className={clsx(classes.userCount, 'zap-caption-semibold')}>0</div>
      </div>
    )
  ) : (
    <div className={clsx(classes.box, classes[status], {[classes.selected]: selected})}>
      <img src={profileImgUrl} alt={username} className={classes.avatar} />
      <span className="zap-caption-semibold">{username}</span>
      {selected && <SVG path={multiplyIcon} svgClassName={classes.icon} />}
    </div>
  )
}
