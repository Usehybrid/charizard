import * as React from 'react'
import {useBreadcrumbsStore} from './store'

interface Breadcrumb {
  label: string
  href?: string
  active?: boolean
}

export const useBreadcrumbs = (breadcrumbs: Breadcrumb[]) => {
  const setBreadcrumbs = useBreadcrumbsStore(s => s.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs(breadcrumbs)
    return () => {
      setBreadcrumbs([])
    }
  }, [breadcrumbs, setBreadcrumbs])
}
