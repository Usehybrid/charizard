import * as React from 'react'
import * as accordion from '@zag-js/accordion'
import clsx from 'clsx'
import classes from './style.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {AccordionContextValue, AccordionProps, CollapseProps, HeaderProps, ItemProps} from './types'
import {create} from 'zustand'

export const useAccordionStore = create<AccordionContextValue>(set => ({
  service: null as any,
  api: null,
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
    defaultValue: isOpenAll ? allEventKeys.map(String) : defaultActiveKey ? [defaultActiveKey] : [],
    multiple: isMulti || isOpenAll,
  })

  const api = accordion.connect(service, normalizeProps)

  React.useEffect(() => {
    useAccordionStore.setState({service, api})
  }, [service, api])

  React.useEffect(() => {
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
  const isOpen = api?.value?.includes(eventKey) || false
  const contentRef = React.useRef<HTMLDivElement>(null)
  const [height, setHeight] = React.useState<number | 'auto'>(0)

  React.useEffect(() => {
    if (!contentRef.current) return

    if (isOpen) {
      // Opening: measure the full height and animate to it
      const scrollHeight = contentRef.current.scrollHeight
      setHeight(scrollHeight)

      // After animation completes, set height to auto
      const timer = setTimeout(() => {
        setHeight('auto')
      }, 200) // Match this with CSS transition duration

      return () => clearTimeout(timer)
    } else {
      // Closing: first set to current height, then to 0
      if (height === 'auto') {
        const scrollHeight = contentRef.current.scrollHeight
        setHeight(scrollHeight)

        // Use RAF to ensure the height is set before transitioning to 0
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            setHeight(0)
          })
        })
      } else {
        setHeight(0)
      }
    }
  }, [isOpen, height])

  return (
    <div
      ref={contentRef}
      style={{
        ...customStyle,
        height: height,
        overflow: 'hidden',
        transition: 'height 200ms ease-in-out',
      }}
      className={customClasses}
      aria-hidden={!isOpen}
    >
      <div>{children}</div>
    </div>
  )
}

export default Accordion
