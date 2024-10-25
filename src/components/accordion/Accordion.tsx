import * as React from 'react'
import * as accordion from '@zag-js/accordion'
import clsx from 'clsx'
import classes from './style.module.css'
import { useMachine, normalizeProps } from '@zag-js/react'
import { AccordionContextValue, AccordionProps, CollapseProps, HeaderProps, ItemProps } from './types'
import { create } from 'zustand'

export const useAccordionStore = create<AccordionContextValue>(set => ({
  api: null as any,
  state: null,
  send: () => {},
  activeEventKey: [], // Change to an array to support multiple keys
  setActiveEventKey: keys => set({ activeEventKey: keys }),
}))

export const Accordion = ({
  children,
  defaultActiveKey,
  customClasses,
  customStyle,
  isMulti = false,
}: AccordionProps) => {
  const [state, send] = useMachine(
    accordion.machine({
      id: defaultActiveKey as string,
      collapsible: true,
      value: defaultActiveKey ? [defaultActiveKey] : [],
      multiple: isMulti, // Use the correct key for multiple
    }),
  )

  const api = accordion.connect(state, send, normalizeProps)

  useAccordionStore.setState({ api, state, send })

  React.useEffect(() => {
    const activeKeys = state.context.value || []; // Get active keys
    useAccordionStore.setState({ activeEventKey: activeKeys }); // Update active keys in store
  }, [state])

  return (
    <div {...api.getRootProps()} className={customClasses} style={customStyle}>
      {children}
    </div>
  )
}

Accordion.Item = ({ eventKey, children }: ItemProps) => {
  const { api } = useAccordionStore()

  return <div {...api.getItemProps({ value: eventKey })}>{children}</div>
}

Accordion.Header = ({ eventKey, children, customClasses, customStyle }: HeaderProps) => {
  const { api, setActiveEventKey } = useAccordionStore()

  const { onClick, ...triggerProps } = api.getItemTriggerProps({ value: eventKey })

  const handleClick = (e: React.MouseEvent) => {
    onClick(e)

    const currentActiveKeys = useAccordionStore.getState().activeEventKey || [];
    const isActive = currentActiveKeys.includes(eventKey);

    const newActiveKeys = isActive
      ? currentActiveKeys.filter(key => key !== eventKey) // Remove if already active
      : [...currentActiveKeys, eventKey]; // Add if not active

    setActiveEventKey(newActiveKeys); // Update active keys in store
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

Accordion.Collapse = ({ eventKey, children, customClasses, customStyle }: CollapseProps) => {
  const { state } = useAccordionStore()
  const isOpen = state.context.value.includes(eventKey); // Check if the current item is open

  return (
    <div
      style={customStyle}
      className={customClasses}
      hidden={!isOpen} // Manage visibility based on isOpen
    >
      {children}
    </div>
  )
}

export default Accordion;
