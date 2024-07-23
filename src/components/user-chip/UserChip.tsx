import * as React from 'react'
import clsx from 'clsx'
import classes from './user-chip.module.css'
import {SVG} from '../svg'
import multiplyIcon from '../assets/multiply.svg'

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
  username: string
  profileImgUrl: string
}

export function UserChip({
  status = USER_CHIP_STATUS.DEFAULT,
  selected = false,
  username,
  profileImgUrl,
}: UserChipProps) {
  return (
    <div className={clsx(classes.box, classes[status], {[classes.selected]: selected})}>
      <img src={profileImgUrl} alt={username} className={classes.avatar} />
      <span className="charizard-caption-semibold">{username}</span>
      {selected && <SVG path={multiplyIcon} svgClassName={classes.icon} />}
    </div>
  )
}
