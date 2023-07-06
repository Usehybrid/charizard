import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'

interface ModalContentProps {
  /**
   * Modal content children
   */
  children: React.ReactNode
  /**
   * Zagjs modal API (no need to pass when using this component)
   * will be inserted by default
   */
  api?: any
  /**
   * size of the modal
   */
  size?: 'sm' | 'md' // sm: 400px, md: 600px
}

export default function ModalContent({children, api, size = 'md'}: ModalContentProps) {
  const clones = React.Children.toArray(children).map((child: any) => {
    return React.cloneElement(child, {
      ...child.props,
      api,
    })
  })

  return (
    <div {...api?.containerProps} className={classes.container}>
      <div className={clsx(classes.contentWrapper, classes[size])}>
        <div {...api?.contentProps} className={classes.content}>
          {clones}
        </div>
      </div>
    </div>
  )
}
