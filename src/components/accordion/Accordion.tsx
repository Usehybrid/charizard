import * as React from 'react'
import * as accordion from '@zag-js/accordion'
import clsx from 'clsx'
import classes from './style.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {AccordionProps, CollapseProps, HeaderProps, ItemProps} from './types'

type AccordionContextValue = {
  api: ReturnType<typeof accordion.connect> | null
  activeEventKeys: string[]
  toggleKey: (key: string) => void
}

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

export const Accordion = ({
  children,
  defaultActiveKey,
  customClasses,
  customStyle,
  isMulti = false,
  isOpenAll = false,
  allEventKeys = [],
}: AccordionProps) => {
  const [activeEventKeys, setActiveEventKeys] = React.useState<string[]>(
    isOpenAll ? allEventKeys.map(String) : defaultActiveKey ? [defaultActiveKey] : [],
  )

  const service = useMachine(accordion.machine, {
    collapsible: true,
    defaultValue: defaultActiveKey ? [defaultActiveKey] : undefined,
    value: activeEventKeys,
    multiple: isMulti || isOpenAll,
  })

  const api = accordion.connect(service, normalizeProps)

  const toggleKey = (key: string) => {
    setActiveEventKeys(prevKeys =>
      prevKeys.includes(key) ? prevKeys.filter(k => k !== key) : [...prevKeys, key],
    )
  }

  return (
    <AccordionContext.Provider value={{api, activeEventKeys, toggleKey}}>
      <div {...api.getRootProps()} className={customClasses} style={customStyle}>
        {children}
      </div>
    </AccordionContext.Provider>
  )
}

Accordion.Item = ({eventKey, children}: ItemProps) => {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error('Accordion.Item must be used within an <Accordion>')

  return <div {...context.api?.getItemProps({value: eventKey})}>{children}</div>
}

Accordion.Header = ({eventKey, children, customClasses, customStyle}: HeaderProps) => {
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error('Accordion.Header must be used within an <Accordion>')

  const {api, toggleKey} = context
  if (!api) return null

  const {onClick, ...triggerProps} = api.getItemTriggerProps({value: eventKey})

  const handleClick = (e: React.MouseEvent) => {
    onClick(e)
    toggleKey(eventKey)
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
  const context = React.useContext(AccordionContext)
  if (!context) throw new Error('Accordion.Collapse must be used within an <Accordion>')

  const isOpen = context.activeEventKeys.includes(eventKey)

  return (
    <div style={customStyle} className={customClasses} hidden={!isOpen}>
      {children}
    </div>
  )
}

export default Accordion
