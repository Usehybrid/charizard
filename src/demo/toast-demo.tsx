import {toastError, toastInfo, toastSuccess, toastWarning} from '../components'

export function ToastDemo() {
  return (
    <div style={{display: 'flex', gap: '20px'}}>
      <button
        onClick={() => {
          toastSuccess({
            msg: 'Successfully added inventory item to fullfill orders placed before',
            info: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore.',
          })
        }}
      >
        Success
      </button>
      <button
        onClick={() => {
          toastInfo({msg: 'Info message.'})
        }}
      >
        Info
      </button>
      <button
        onClick={() => {
          toastWarning({msg: 'Warning message.'})
        }}
      >
        Warning
      </button>
      <button
        onClick={() => {
          toastError({msg: 'Error message.'})
        }}
      >
        Error
      </button>
    </div>
  )
}
