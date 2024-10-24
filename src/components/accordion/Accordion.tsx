import * as React from 'react'
import * as accordion from '@zag-js/accordion'
import {useMachine, normalizeProps} from '@zag-js/react'

interface AccordionProps {
  children: React.ReactNode
  defaultActiveKey?: string
}

interface HeaderProps {
  eventKey: string
  children: React.ReactNode
  customStyle?: React.CSSProperties
}

interface CollapseProps {
  eventKey: string
  children: React.ReactNode
  customStyle?: React.CSSProperties
}

export const Accordion = ({children, defaultActiveKey}: AccordionProps) => {
  const [state, send] = useMachine(
    accordion.machine({
      id: defaultActiveKey as string,
      collapsible: true,
      value: defaultActiveKey ? [defaultActiveKey] : [],
    }),
  )

  const api = accordion.connect(state, send, normalizeProps)

  const items = React.Children.map(children, child => {
    if (React.isValidElement<HeaderProps>(child) && child.type === Accordion.Header) {
      const headerEventKey = child.props.eventKey

      return (
        <div {...api.getItemProps({value: headerEventKey})}>
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
            {...api.getItemTriggerProps({value: headerEventKey})}
          >
            {child.props.children}
          </button>
        </div>
      )
    }

    if (React.isValidElement<CollapseProps>(child) && child.type === Accordion.Collapse) {
      const headerEventKey = child.props.eventKey
      return <div {...api.getItemContentProps({value: headerEventKey})}>{child.props.children}</div>
    }

    return null
  })

  return <div {...api.getRootProps()}>{items}</div>
}

Accordion.Header = ({eventKey, children, customStyle}: HeaderProps) => {
  console.log(eventKey)
  return <div style={customStyle}>{children}</div>
}

Accordion.Collapse = ({eventKey, children, customStyle}: CollapseProps) => {
  console.log(eventKey)
  return <div style={customStyle}>{children}</div>
}
