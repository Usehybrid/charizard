import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'

interface DrawerProps {
  /**
   * Drawer is open or not
   */
  isOpen: boolean
  /**
   * Callback function when drawer is closed
   */
  onClose: () => void
  /**
   * Callback function when save button is clicked
   */
  onSave: () => void
  /**
   * Drawer content
   */
  children: React.ReactNode
  /**
   * Drawer title
   */
  title: string
  /**
   * Custom drawer header
   */
  customHeader?: React.ReactNode
  /**
   * Custom drawer footer
   */
  customFooter?: React.ReactNode
  /**
   * Save button text
   */
  saveBtnText?: string
  /**
   * Close button text
   */
  closeBtnText?: string
  /**
   * Drawer size
   */
  size?: 'sm' | 'md' // sm: 400px, md: 600px
  /**
   * Show backdrop or not
   */
  showBackdrop?: boolean
  /**
   * Show header or not
   */
  showHeader?: boolean
  /**
   * Show footer or not
   */
  showFooter?: boolean
}

export default function Drawer({
  isOpen,
  onClose,
  onSave,
  children,
  title,
  customHeader,
  customFooter,
  saveBtnText = 'Save',
  closeBtnText = 'Cancel',
  size = 'md',
  showBackdrop = true,
  showHeader = true,
  showFooter = true,
}: DrawerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (containerRef.current) {
        containerRef.current.style.transform = isOpen ? 'translateX(0)' : 'translateX(100%)'
      }
    }, 0)

    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <>
      {/* backdrop */}
      <div className={clsx(classes.backdropLayer, isOpen && classes.show)} onClick={onClose}>
        {showBackdrop && <div className={clsx(classes.backdrop, isOpen && classes.showBackdrop)} />}
      </div>

      {/* container */}
      <div
        className={clsx(classes.container, size === 'sm' ? classes.sm : classes.md)}
        ref={containerRef}
      >
        {/* content */}
        <div className={classes.content}>
          {/* header */}
          {showHeader && (
            <div className={classes.headerContainer}>
              {customHeader ? (
                customHeader
              ) : (
                <>
                  <h1 className={classes.title}>{title}</h1>
                  <button className={classes.closeBtn} onClick={onClose}></button>
                </>
              )}
            </div>
          )}
          {/* description */}
          <div className={classes.descriptionContainer}>
            {/* children are shown here */}
            {children}
          </div>
          {/* footer */}
          {showFooter && (
            <div className={classes.footer}>
              {customFooter ? (
                customFooter
              ) : (
                <>
                  <button
                    type="button"
                    className={clsx('secondary-btn', classes.closeBtn)}
                    onClick={onClose}
                  >
                    {closeBtnText}
                  </button>
                  <button
                    type="button"
                    className={clsx('primary-btn', classes.saveBtn)}
                    onClick={onSave}
                  >
                    {saveBtnText}
                  </button>
                </>
              )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
