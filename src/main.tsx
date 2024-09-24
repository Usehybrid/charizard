import React from 'react'
import ReactDOM from 'react-dom/client'
// import {AlertDemo} from './demo/alert-demo'
import {ToastDemo} from './demo/toast-demo'
import {createPortal} from 'react-dom'
import {ToastContainer} from 'react-toastify'
import {ToastCloseButtonProps} from './components/toasts/types'
import {ToastCloseButton} from './components'
// import {UserChipMultiDemo} from './demo/user-chip-multi'
// import {TableDemo} from './demo/table-demo'
// import {ButtonDemo} from './demo/button-demo'

const styles = {
  width: '90%',
  margin: 'auto',
  padding: '0 20px',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',

  flexDir: 'column',
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <>
      <App />
      {createPortal(
        <ToastContainer
          pauseOnFocusLoss={false}
          limit={2}
          closeButton={({closeToast}: ToastCloseButtonProps) => {
            return <ToastCloseButton closeToast={closeToast} />
          }}
        />,
        document.body,
      )}
    </>
  </React.StrictMode>,
)

function App() {
  return (
    <div style={styles}>
      {/* <TableDemo /> */}
      <ToastDemo />
    </div>
  )
}
