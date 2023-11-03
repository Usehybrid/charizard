import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import {Button, BUTTON_VARIANT} from '../button'
import {SVG} from '../svg'

export type EmptyStateProps = {
  icon: string
  title: string
  desc: string
  flexDir?: 'row' | 'column'
  btnText?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement>
}

/**
 * adapts to parent's width and height
 */
export function EmptyState({
  icon,
  title,
  desc,
  flexDir = 'column',
  btnText,
  onClick,
}: EmptyStateProps) {
  return (
    <div className={clsx(classes.container, flexDir === 'row' && classes.containerRow)}>
      <div className={classes.huiEmptyStateIconContainer}>
        <SVG path={icon} />
      </div>
      <div className={classes.info}>
        <h6 className={clsx(classes.title, flexDir === 'row' && classes.textRow)}>{title}</h6>
        <p className={clsx(classes.desc, flexDir === 'row' && classes.textRow)}>{desc}</p>
      </div>

      {btnText && (
        <Button onClick={onClick} variant={BUTTON_VARIANT.GHOST}>
          {btnText}
        </Button>
      )}
    </div>
  )
}
