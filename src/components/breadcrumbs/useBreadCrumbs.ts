import * as React from 'react'
import {type Breadcrumb, useBreadcrumbsStore} from './store'

export const useBreadcrumbs = (breadcrumbs: Breadcrumb[]) => {
  const setBreadcrumbs = useBreadcrumbsStore(s => s.setBreadcrumbs)

  React.useEffect(() => {
    setBreadcrumbs(breadcrumbs)
    return () => {
      setBreadcrumbs([])
    }
  }, [breadcrumbs, setBreadcrumbs])
}
