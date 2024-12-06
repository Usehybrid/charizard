import {create} from 'zustand'

export interface Breadcrumb {
  label: string
  href?: string
  active?: boolean
}

interface BreadcrumbsStore {
  breadcrumbs: Breadcrumb[]
  setBreadcrumbs: (breadcrumbs: Breadcrumb[]) => void
}

export const useBreadcrumbsStore = create<BreadcrumbsStore>(set => ({
  breadcrumbs: [],
  setBreadcrumbs: breadcrumbs => set({breadcrumbs}),
}))
