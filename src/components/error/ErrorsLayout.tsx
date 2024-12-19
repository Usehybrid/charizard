import * as React from 'react'
import {Outlet, useNavigate} from 'react-router'
import classes from './styles.module.css'
import logoImage from '../assets/logo-full.svg'
import errorImage from '../assets/illustrations/sleeping-user.svg'
import {BUTTON_SIZE, BUTTON_VARIANT, Button} from '../button'
import {AsyncImage} from '../asyncImage'
import {ZENADMIN_CONTACT, ZENADMIN_URL} from '../../utils'

interface ErrorsLayoutProps {
  children?: React.ReactNode
  showReload?: boolean
  onErrorReset?: () => void
  homeRoute?: string
}

const reloadPageHandler = () => {
  window.location.reload()
}

export function ErrorsLayout({
  children,
  showReload = false,
  onErrorReset,
  homeRoute = '/',
}: ErrorsLayoutProps) {
  const navigate = useNavigate()

  const navigateToHomeHandler = () => {
    onErrorReset ? onErrorReset() : navigate(homeRoute, {replace: true})
  }

  return (
    <section className={classes.errorSection}>
      <div className={classes.errorContainer}>
        <a href={ZENADMIN_URL}>
          <AsyncImage className={classes.logo} alt="Logo" src={logoImage} />
        </a>
        <AsyncImage className={classes.errorImage} alt="error" src={errorImage} />
        <div className={classes.content}>{children ? children : <Outlet />}</div>
        <div className={classes.action}>
          {showReload && (
            <Button
              onClick={reloadPageHandler}
              size={BUTTON_SIZE.SMALL}
              variant={BUTTON_VARIANT.GHOST}
            >
              Reload page
            </Button>
          )}
          <Button onClick={navigateToHomeHandler} size={BUTTON_SIZE.SMALL}>
            Go to homepage
          </Button>
        </div>
      </div>
      <div>
        <p className="zap-content-regular">
          For urgent situations please{' '}
          <a href={ZENADMIN_CONTACT} className="zap-link zap-link-small">
            Contact us
          </a>
        </p>
      </div>
    </section>
  )
}
