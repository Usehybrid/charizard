import * as accordion from '@zag-js/accordion'

export interface AccordionContextValue {
  api: accordion.Api<any>
  state: any
  send: (event: any) => void
  activeEventKey: string | null
  setActiveEventKey: (key: string | null) => void
}

export interface AccordionProps {
  children: React.ReactNode
  defaultActiveKey?: string
  customClasses?: string
  customStyle?: React.CSSProperties
}

export interface HeaderProps {
  eventKey: string
  children: React.ReactNode
  customClasses?: string
  customStyle?: React.CSSProperties
}

export interface CollapseProps {
  eventKey: string
  children: React.ReactNode
  customClasses?: string
  customStyle?: React.CSSProperties
}

export interface ItemProps {
  eventKey: string
  children: React.ReactNode
}
