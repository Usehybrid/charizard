import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import {TabProps} from './Tab'

interface TabsProps {
  id: string
  activeKey: string
  onSelect: (key: string) => void
  customClassName?: string
  customStyles?: React.CSSProperties
  children: React.ReactElement<TabProps>[]
}

export const Tabs: React.FC<TabsProps> = ({
  id,
  activeKey,
  onSelect,
  children,
  customClassName = '',
  customStyles = {},
}) => {
  const handleTabChange = (key: string) => {
    onSelect(key)
  }

  return (
    <div id={id} className={clsx(classes.tabs, customClassName)} style={customStyles}>
      <div className={classes.tabBar}>
        {React.Children.map(children, child => {
          // Type guard to ensure child is a valid element
          if (!React.isValidElement<TabProps>(child)) {
            return null
          }

          // Create a new props object with the proper types
          const newProps: TabProps = {
            ...child.props,
            isActive: child.props.eventKey === activeKey,
            onClick: () => handleTabChange(child.props.eventKey),
          }

          // Now we can safely use cloneElement with properly typed props
          return React.cloneElement(child, newProps)
        })}
      </div>
      <div className={classes.tabContent}>
        {React.Children.map(children, child => {
          if (!React.isValidElement<TabProps>(child)) {
            return null
          }

          return child.props.eventKey === activeKey ? child.props.children : null
        })}
      </div>
    </div>
  )
}
