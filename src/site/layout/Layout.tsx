import {createPortal} from 'react-dom'
import {Outlet} from 'react-router'
import {ToastContainer} from 'react-toastify'
import {ToastCloseButton} from '../../components'
import {Sidebar} from './Sidebar'
import classes from './layout.module.css'
import type {ToastCloseButtonProps} from '../../components/toasts/types'

export function Layout() {
  return (
    <div className={classes.shell}>
      <Sidebar />
      <main className={classes.content}>
        <Outlet />
      </main>
      {createPortal(
        <ToastContainer
          pauseOnFocusLoss={false}
          closeButton={({closeToast}: ToastCloseButtonProps) => (
            <ToastCloseButton closeToast={closeToast} />
          )}
        />,
        document.body,
      )}
    </div>
  )
}
