import * as React from 'react'
import * as accordion from '@zag-js/accordion'
import {useMachine, normalizeProps} from '@zag-js/react'
import {AccordionContextValue, AccordionProps, CollapseProps, HeaderProps, ItemProps} from './types'
import {create} from 'zustand'

export const useAccordionStore = create<AccordionContextValue>(set => ({
  api: null as any,
  state: null,
  send: () => {},
  activeEventKey: null,
  setActiveEventKey: key => set({activeEventKey: key}),
}))

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
      <button {...triggerProps} onClick={handleClick} className={'zap-reset-btn'}>
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
