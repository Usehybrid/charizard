import * as React from 'react'
import * as zagTabs from '@zag-js/tabs'
import clsx from 'clsx'
import classes from './layout-tabs.module.css'
import {normalizeProps, useMachine} from '@zag-js/react'

interface LayoutTabsProps {
  tabClassName?: string
  /**
   * tabs to render
   */
  tabs: Array<{label: string; value: string; content: React.ReactNode | string}>
  /**
   * default value (initial tab to render)
   */
  defaultValue: string
  /**
   * callback function when tab is changed
   */
  onValueChange?: (value: string) => void
}

export function LayoutTabs({tabs, defaultValue, tabClassName, onValueChange}: LayoutTabsProps) {
  const service = useMachine(zagTabs.machine, {
    id: React.useId(),
    defaultValue,
    // value,
    onValueChange(details) {
      onValueChange?.(details.value)
    },
  })

  const api = zagTabs.connect(service, normalizeProps)

  return (
    <div {...api.getRootProps()}>
      <div {...api.getListProps()} className={clsx(classes.tabList, tabClassName)}>
        {tabs.map(item => (
          <button
            {...api.getTriggerProps({value: item.value})}
            key={item.value}
            className={classes.tab}
            data-text={item.label}
          >
            {item.label}
          </button>
        ))}
      </div>
      {tabs.map(item => (
        <div {...api.getContentProps({value: item.value})} key={item.value}>
          {item.content}
        </div>
      ))}
    </div>
  )
}
