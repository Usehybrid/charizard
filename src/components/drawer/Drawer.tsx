import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'
import {Button} from '../button'
import {FooterButtons} from '../modal/ModalFooter'

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
   * Drawer size
   */
  size?: 'sm' | 'md' | 'lg' | 'xlg' | 'xxlg' // sm: 400px, md: 600px, lg: 820px, xlg: 1000px, xxlg: '1200px
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
  /**
   * footer buttons to show
   */
  buttons?: FooterButtons
}

export function Drawer({
  isOpen,
  onClose,
  children,
  title,
  customHeader,
  customFooter,
  size = 'md',
  showBackdrop = true,
  showHeader = true,
  showFooter = true,
  buttons,
}: DrawerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const descriptionRef = React.useRef<HTMLDivElement>(null)
  const footerRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const timeout = setTimeout(() => {
      if (containerRef.current && descriptionRef && footerRef) {
        containerRef.current.style.transform = isOpen ? 'translateX(0)' : 'translateX(100%)'
        ;(
          descriptionRef.current as HTMLDivElement
        ).style.maxHeight = `calc(100vh - (1.75rem * 2) - ${footerRef.current?.clientHeight}px)`
        ;(
          descriptionRef.current as HTMLDivElement
        ).style.height = `calc(100vh - (1.75rem * 2) - ${footerRef.current?.clientHeight}px)`
      }
    }, 0)

    return () => {
      clearTimeout(timeout)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen])

  return (
    <>
      {/* backdrop */}
      <div className={clsx(classes.backdropLayer, isOpen && classes.show)} onClick={onClose}>
        {showBackdrop && <div className={clsx(classes.backdrop, isOpen && classes.showBackdrop)} />}
      </div>

      {/* container */}
      <div className={clsx(classes.container, classes[size])} ref={containerRef}>
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
                  <button type="button" className={classes.closeBtn} onClick={onClose}></button>
                </>
              )}
            </div>
          )}
          {/* description */}
          <div className={classes.descriptionContainer} ref={descriptionRef}>
            {/* children are shown here */}
            {children}
          </div>
          {/* footer */}
          {showFooter && (
            <div className={classes.footer} ref={footerRef}>
              {customFooter
                ? customFooter
                : buttons && (
                    <div className={classes.footerBtnContainer}>
                      {buttons.map((btn, idx) => (
                        <Button
                          key={idx}
                          variant={btn.variant}
                          onClick={() => {
                            btn.onClick()
                            // onClose()
                          }}
                        >
                          {btn.btnText}
                        </Button>
                      ))}
                    </div>
                  )}
            </div>
          )}
        </div>
      </div>
    </>
  )
}
