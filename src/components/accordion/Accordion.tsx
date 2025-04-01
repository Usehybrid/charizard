import * as React from 'react'
import * as accordion from '@zag-js/accordion'
import clsx from 'clsx'
import classes from './style.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {AccordionContextValue, AccordionProps, CollapseProps, HeaderProps, ItemProps} from './types'
import {create} from 'zustand'

export const useAccordionStore = create<AccordionContextValue>(set => ({
  service: null as any,
  api: null, // Add this line to include the api property
  activeEventKey: [],
  setActiveEventKey: keys => set({activeEventKey: keys}),
}))

export const Accordion = ({
  children,
  defaultActiveKey,
  customClasses,
  customStyle,
  isMulti = false,
  isOpenAll = false,
  allEventKeys = [],
}: AccordionProps) => {
  // New API: pass machine directly and configure with options object
  const service = useMachine(accordion.machine, {
    id: defaultActiveKey as string,
    collapsible: true,
    // Use defaultValue instead of directly setting value in machine creation
    defaultValue: isOpenAll ? allEventKeys.map(String) : defaultActiveKey ? [defaultActiveKey] : [],
    multiple: isMulti || isOpenAll,
  })

  // Get the API with normalizeProps
  const api = accordion.connect(service, normalizeProps)

  React.useEffect(() => {
    useAccordionStore.setState({service, api})
  }, [service, api])

  React.useEffect(() => {
    // For now, let's try to get the value from the API
    const api = accordion.connect(service, normalizeProps)
    const activeKeys = api.value || []
    useAccordionStore.getState().setActiveEventKey(activeKeys)
  }, [service])

  return (
    <div {...api.getRootProps()} className={customClasses} style={customStyle}>
      {children}
    </div>
  )
}

Accordion.Item = ({eventKey, children}: ItemProps) => {
  const api = useAccordionStore(state => state.api)
  if (api) return <div {...api.getItemProps({value: eventKey})}>{children}</div>
}

Accordion.Header = ({eventKey, children, customClasses, customStyle}: HeaderProps) => {
  const api = useAccordionStore(state => state.api)
  if (!api) return
  const setActiveEventKey = useAccordionStore(state => state.setActiveEventKey)
  const {onClick, ...triggerProps} = api.getItemTriggerProps({value: eventKey})

  const handleClick = (e: React.MouseEvent) => {
    onClick(e)
    const currentActiveKeys = useAccordionStore.getState().activeEventKey || []
    const isActive = currentActiveKeys.includes(eventKey)
    const newActiveKeys = isActive
      ? currentActiveKeys.filter(key => key !== eventKey)
      : [...currentActiveKeys, eventKey]
    setActiveEventKey(newActiveKeys)
  }

  return (
    <div style={customStyle} className={customClasses}>
      <button
        {...triggerProps}
        onClick={handleClick}
        className={clsx('zap-reset-btn', classes.headerClass)}
      >
        {children}
      </button>
    </div>
  )
}

Accordion.Collapse = ({eventKey, children, customClasses, customStyle}: CollapseProps) => {
  const api = useAccordionStore(state => state.api)
  // Check if the item is expanded using the API
  const isOpen = api?.value?.includes(eventKey) || false

  return (
    <div style={customStyle} className={customClasses} hidden={!isOpen}>
      {children}
    </div>
  )
}

export default Accordion
