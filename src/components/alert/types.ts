import * as React from 'react'

export interface AlertPropTypes {
  alertType: string
  actionType: string
  header: React.ReactNode
  body: React.ReactNode
}
