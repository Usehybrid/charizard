import * as React from 'react'

export const useLockBodyScroll = (isLocked: boolean) => {
  React.useEffect(() => {
    if (isLocked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
    }
  }, [isLocked])
}
