import * as React from 'react'
import * as accordion from '@zag-js/accordion'
import {useMachine, normalizeProps} from '@zag-js/react'
import { AccordionContextValue, AccordionProps, CollapseProps, HeaderProps, ItemProps } from './types'

const AccordionContext = React.createContext<AccordionContextValue | null>(null)

export const Accordion = ({children, defaultActiveKey, customClasses, customStyle}: AccordionProps) => {
  const [state, send] = useMachine(
    accordion.machine({
      id: defaultActiveKey as string,
      collapsible: true,
      value: defaultActiveKey ? [defaultActiveKey] : [],
    }),
  )

  const api = accordion.connect(state, send, normalizeProps)

  return (
    <AccordionContext.Provider value={{api, state, send}}>
      <div {...api.getRootProps()} className={customClasses} style={customStyle}>{children}</div>
    </AccordionContext.Provider>
  )
}

Accordion.Item = ({eventKey, children}: ItemProps) => {
  const context = React.useContext(AccordionContext)

  if (!context) {
    throw new Error('Accordion.Item must be used within an Accordion')
  }

  const {api} = context

  return <div {...api.getItemProps({value: eventKey})}>{children}</div>
}

Accordion.Header = ({eventKey, children, customClasses, customStyle}: HeaderProps) => {
  const context = React.useContext(AccordionContext)

  if (!context) {
    throw new Error('Accordion.Header must be used within an Accordion')
  }

  const {api} = context

  return (
    <div style={customStyle} className={customClasses}>
      <button
        style={{
          background: 'none',
          border: 'none',
          padding: 0,
          margin: 0,
          font: 'inherit',
          color: 'inherit',
          width: '100%',
          height: '100%',
        }}
        {...api.getItemTriggerProps({value: eventKey})}
      >
        {children}
      </button>
    </div>
  )
}

Accordion.Collapse = ({eventKey, children, customClasses, customStyle}: CollapseProps) => {
  const context = React.useContext(AccordionContext)

  if (!context) {
    throw new Error('Accordion.Collapse must be used within an Accordion')
  }

  const {api} = context

  return (
    <div style={customStyle} className={customClasses} {...api.getItemContentProps({value: eventKey})}>
      {children}
    </div>
  )
}
