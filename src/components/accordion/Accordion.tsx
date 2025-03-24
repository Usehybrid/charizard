import * as React from 'react'
import * as accordion from '@zag-js/accordion'
import clsx from 'clsx'
import classes from './style.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {AccordionContextValue, AccordionProps, CollapseProps, HeaderProps, ItemProps} from './types'
import {create} from 'zustand'

export const useAccordionStore = create<AccordionContextValue>(set => ({
  api: null as any,
  state: null,
  send: () => {},
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
  const service = useMachine(accordion.machine, {
    id: defaultActiveKey as string,
    collapsible: true,
    defaultValue: defaultActiveKey ? [defaultActiveKey] : undefined,
    value: isOpenAll ? allEventKeys.map(String) : defaultActiveKey ? [defaultActiveKey] : [],
    multiple: isMulti || isOpenAll,
  })

  const api = accordion.connect(service, normalizeProps)

  const storedActiveKeys = useAccordionStore(state => state.activeEventKey)

  React.useEffect(() => {
    useAccordionStore.setState({api, state: service.state, send: service.send})
  }, [api, service.state, service.send])

  React.useEffect(() => {
    const activeKeys = service.context.get('value') || []

    if (JSON.stringify(storedActiveKeys) === JSON.stringify(activeKeys)) {
      return
    }

    useAccordionStore.getState().setActiveEventKey(activeKeys)
  }, [service.context.get('value'), storedActiveKeys])

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
  const activeKeys = useAccordionStore(state => state.activeEventKey)

  const isOpen = activeKeys.includes(eventKey)

  return (
    <div style={customStyle} className={customClasses} hidden={!isOpen}>
      {children}
    </div>
  )
}

export default Accordion
