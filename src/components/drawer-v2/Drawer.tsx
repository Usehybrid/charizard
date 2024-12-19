import * as React from 'react'
import clsx from 'clsx'
import closeIcon from '../assets/close.svg'
import classes from './drawer.module.css'
import {SVG} from '../svg'
import {Button, ButtonProps} from '../button'
import {DialogFooterButtons} from '../../types/common'
import {useLockBodyScroll} from '../../hooks'
import {Portal} from '@zag-js/react'

interface DrawerProps {
  /**
   * Drawer footer className
   */
  footerClassName?: string
  /**
   * Drawer header className
   */
  headerClassName?: string
  /**
   * Drawer content className
   */
  contentClassName?: string
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
  title?: string
  /**
   * Drawer subTitle
   */
  subTitle?: string
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
  buttons?: DialogFooterButtons
  footerAddon?: React.ReactNode

  /**
   * Drawer position
   */
  drawerPosition?: 'left' | 'right'
  customContainerStyles?: React.CSSProperties
}

export function DrawerV2({
  isOpen,
  onClose,
  children,
  title,
  subTitle,
  customHeader,
  customFooter,
  size = 'md',
  showBackdrop = true,
  showHeader = true,
  showFooter = true,
  buttons,
  footerAddon,
  headerClassName,
  contentClassName,
  footerClassName,
  drawerPosition = 'right',
  customContainerStyles,
}: DrawerProps) {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const descriptionRef = React.useRef<HTMLDivElement>(null)
  const footerRef = React.useRef<HTMLDivElement>(null)
  useLockBodyScroll(isOpen)

  // React.useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     if (containerRef.current && descriptionRef && footerRef) {
  //       containerRef.current.style.transform = isOpen
  //         ? 'translateX(0)'
  //         : `translateX(${translateXOffset})`
  //       ;(descriptionRef.current as HTMLDivElement).style.maxHeight =
  //         `calc(100dvh - (1.75rem * 2) - ${footerRef.current?.clientHeight}px)`
  //       ;(descriptionRef.current as HTMLDivElement).style.height =
  //         `calc(100dvh - (1.75rem * 2) - ${footerRef.current?.clientHeight}px)`
  //     }
  //   }, 0)

  //   return () => {
  //     clearTimeout(timeout)
  //   }
  //   // eslint-disable-next-line react-hooks/exhaustive-deps
  // }, [isOpen])

  return (
    isOpen && (
      <Portal>
        {/* backdrop */}
        <div className={clsx(classes.backdropLayer, isOpen && classes.show)} onClick={onClose}>
          {showBackdrop && (
            <div className={clsx(classes.backdrop, isOpen && classes.showBackdrop)} />
          )}
        </div>
        {/* container */}
        <div
          className={clsx(classes.container, classes[size], classes[`${drawerPosition}Align`])}
          ref={containerRef}
          style={customContainerStyles}
        >
          {/* content */}
          <div className={classes.content}>
            {/* header */}
            {showHeader && (
              <div className={clsx(classes.headerContainer, headerClassName)}>
                {customHeader ? (
                  customHeader
                ) : (
                  <>
                    <div>
                      <h1 className={clsx(classes.title, 'zap-heading-semibold')}>{title}</h1>
                      {subTitle && (
                        <h2 className={clsx(classes.subTitle, 'zap-content-regular')}>
                          {subTitle}
                        </h2>
                      )}
                    </div>
                    <div onClick={onClose}>
                      <SVG path={closeIcon} svgClassName={classes.closeBtnIcon} />
                    </div>
                  </>
                )}
              </div>
            )}
            {/* description */}
            <div
              className={clsx(classes.descriptionContainer, contentClassName)}
              ref={descriptionRef}
            >
              {/* children are shown here */}
              {children}
            </div>
            {/* footer */}
            {showFooter && (
              <div className={clsx(classes.footer, footerClassName)} ref={footerRef}>
                {customFooter
                  ? customFooter
                  : buttons && (
                      <div className={classes.footerBtnContainer}>
                        <div className={classes.footerBtn}>
                          {buttons.map(({btnText, ...btnProps}, idx) => (
                            <Button key={idx} {...(btnProps as ButtonProps)}>
                              {btnText}
                            </Button>
                          ))}
                        </div>

                        {footerAddon && <div>{footerAddon}</div>}
                      </div>
                    )}
              </div>
            )}
          </div>
        </div>
      </Portal>
    )
  )
}
