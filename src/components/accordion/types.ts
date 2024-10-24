import * as accordion from '@zag-js/accordion'

export interface AccordionContextValue {
  api: accordion.Api<any>
  state: any
  send: (event: any) => void
}

export interface AccordionProps {
  children: React.ReactNode
  defaultActiveKey?: string
}

export interface HeaderProps {
  eventKey: string
  children: React.ReactNode
  customStyle?: React.CSSProperties
}

export interface CollapseProps {
  eventKey: string
  children: React.ReactNode
  customStyle?: React.CSSProperties
}

export interface ItemProps {
  eventKey: string
  children: React.ReactNode
}
