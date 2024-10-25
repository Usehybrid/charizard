import * as React from 'react'
import {Outlet, useNavigate} from 'react-router-dom'
import classes from './styles.module.css'
import logoImage from '../assets/logo-full.svg'
import errorImage from '../assets/illustrations/sleeping-user.svg'
import {BUTTON_V2_SIZE, BUTTON_V2_VARIANT, ButtonV2} from '../button-v2'
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
            <ButtonV2
              onClick={reloadPageHandler}
              size={BUTTON_V2_SIZE.SMALL}
              variant={BUTTON_V2_VARIANT.GHOST}
            >
              Reload page
            </ButtonV2>
          )}
          <ButtonV2 onClick={navigateToHomeHandler} size={BUTTON_V2_SIZE.SMALL}>
            Go to homepage
          </ButtonV2>
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
