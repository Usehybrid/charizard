import * as accordion from '@zag-js/accordion'

export interface AccordionContextValue {
  api: ReturnType<typeof accordion.connect> | null
  service: any
  activeEventKey: string[]
  setActiveEventKey: (keys: string[]) => void
}

export interface AccordionProps extends Partial<accordion.Props> {
  children: React.ReactNode
  defaultActiveKey?: string
  customClasses?: string
  customStyle?: React.CSSProperties
  isMulti?: boolean
  isOpenAll?: boolean
  allEventKeys?: string[]
}

export interface ItemProps {
  eventKey: string
  children: React.ReactNode
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
