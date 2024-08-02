import React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'

export interface TabProps {
  title: string
  eventKey: string
  isActive: boolean;
  customClassName?: string
  customStyles?: React.CSSProperties
  children: React.ReactNode
  onClick: () => void
}

export const Tab: React.FC<TabProps> = ({
  title,
  isActive,
  customClassName,
  customStyles,
  onClick,
}) => {
  return (
    <button
      className={clsx(classes.tab, isActive ? classes.activeTab : '', 'charizard-subheading-semibold', customClassName)}
      style={customStyles}
      onClick={onClick}
    >
      {title}
    </button>
  )
}
