import * as React from 'react'
import * as accordion from '@zag-js/accordion'
import {useMachine, normalizeProps} from '@zag-js/react'
import {AccordionProps, CollapseProps, HeaderProps, ItemProps} from './types'
import {useAccordionStore} from './store'

export const Accordion = ({
  children,
  defaultActiveKey,
  customClasses,
  customStyle,
}: AccordionProps) => {
  const [state, send] = useMachine(
    accordion.machine({
      id: defaultActiveKey as string,
      collapsible: true,
      value: defaultActiveKey ? [defaultActiveKey] : [],
    }),
  )

  const api = accordion.connect(state, send, normalizeProps)

  useAccordionStore.setState({api, state, send})

  React.useEffect(() => {
    const activeKey = state.context.value[0] || null
    useAccordionStore.setState({activeEventKey: activeKey})
  }, [state])

  return (
    <div {...api.getRootProps()} className={customClasses} style={customStyle}>
      {children}
    </div>
  )
}

Accordion.Item = ({eventKey, children}: ItemProps) => {
  const {api} = useAccordionStore()

  return <div {...api.getItemProps({value: eventKey})}>{children}</div>
}

Accordion.Header = ({eventKey, children, customClasses, customStyle}: HeaderProps) => {
  const {api, setActiveEventKey} = useAccordionStore()

  const {onClick, ...triggerProps} = api.getItemTriggerProps({value: eventKey})

  const handleClick = (e: React.MouseEvent) => {
    onClick(e)
    setActiveEventKey(eventKey)
  }

  return (
    <div style={customStyle} className={customClasses}>
      <button
        {...triggerProps}
        onClick={handleClick}
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
      >
        {children}
      </button>
    </div>
  )
}

Accordion.Collapse = ({eventKey, children, customClasses, customStyle}: CollapseProps) => {
  const {api} = useAccordionStore()

  return (
    <div
      style={customStyle}
      className={customClasses}
      {...api.getItemContentProps({value: eventKey})}
    >
      {children}
    </div>
  )
}
