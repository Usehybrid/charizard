import {create} from 'zustand'
import {AccordionContextValue} from './types'

export const useAccordionStore = create<AccordionContextValue>(set => ({
  api: null as any,
  state: null,
  send: () => {},
  activeEventKey: null,
  setActiveEventKey: key => set({activeEventKey: key}),
}))
