import * as React from 'react'
import * as zagTabs from '@zag-js/tabs'
import clsx from 'clsx'
import classes from './styles.module.css'
import {normalizeProps, useMachine} from '@zag-js/react'

type LayoutTabsProps = {
  tabClassName?: string
  /**
   * tabs to render
   */
  tabs: Array<{label: string; value: string; content: React.ReactNode | string}>
  /**
   * default value (initial tab to render)
   */
  defaultValue: string
}

const SEARCH_PARAM_KEY = 'active-tab'

export function LayoutTabs({tabs, defaultValue, tabClassName}: LayoutTabsProps) {
  const url = React.useMemo(() => new URL(window.location.href), [])

  const [state, send] = useMachine(
    zagTabs.machine({
      id: React.useId(),
      value: url.searchParams.get(SEARCH_PARAM_KEY) || defaultValue,
      onValueChange(details) {
        const value = details.value as string
        if (!url.searchParams.has(SEARCH_PARAM_KEY)) {
          url.searchParams.append(SEARCH_PARAM_KEY, value)
        } else {
          url.searchParams.set(SEARCH_PARAM_KEY, value)
        }
        history.pushState({}, '', url.href)
      },
    }),
  )

  const api = zagTabs.connect(state, send, normalizeProps)

  return (
    <div {...api.rootProps}>
      <div {...api.tablistProps} className={clsx(classes.tabList, tabClassName)}>
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
          <div>{item.content}</div>
        </div>
      ))}
    </div>
  )
}
