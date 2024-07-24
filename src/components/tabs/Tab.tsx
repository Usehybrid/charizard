import React from "react"
import clsx from "clsx"
import classes from './styles.module.css'

export interface TabProps {
  title: string
  isActive: boolean
  customClassName?: string
  customStyles?: React.CSSProperties
  children: React.ReactNode
}

export const Tab: React.FC<TabProps> = ({
  title,
  isActive,
  customClassName,
  customStyles
}) => {

  return (
    <button className={clsx(classes.tab, isActive ? classes.activeTab : '', 'charizard-subheading-semibold', customClassName)} style={customStyles}>
      {title}
    </button>
  );
};