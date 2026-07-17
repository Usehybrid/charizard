import {
  Button,
  BUTTON_VARIANT,
  toastError,
  toastInfo,
  toastSuccess,
  toastWarning,
} from '../../components'
import {DemoSection} from '../showcase/DemoSection'
import {DemoRow} from '../showcase/DemoRow'

const variantsCode = `
import {toastSuccess, toastError, toastInfo, toastWarning} from '@hybr1d-tech/charizard'

// Mount <ToastContainer /> from react-toastify once at the app root,
// then fire toasts from anywhere:
toastSuccess({msg: 'Inventory item added'})
toastInfo({msg: 'Sync scheduled for tonight'})
toastWarning({msg: 'License expires in 7 days'})
toastError({msg: 'Could not reach the MDM server'})
`

const infoCode = `
toastSuccess({
  msg: 'Successfully added inventory item',
  info: 'The device is now available to fulfill orders placed before today.',
})
`

export default function ToastsPage() {
  return (
    <div>
      <h1>Toasts</h1>
      <p>
        Toast notifications built on react-toastify with success, error, info and warning helpers.
      </p>

      <DemoSection
        title="Toast variants"
        description="Each helper renders a styled toast with its own icon; this site mounts the ToastContainer once in the layout."
        code={variantsCode}
      >
        <DemoRow>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={() => toastSuccess({msg: 'Inventory item added'})}
          >
            Success
          </Button>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={() => toastInfo({msg: 'Sync scheduled for tonight'})}
          >
            Info
          </Button>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={() => toastWarning({msg: 'License expires in 7 days'})}
          >
            Warning
          </Button>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={() => toastError({msg: 'Could not reach the MDM server'})}
          >
            Error
          </Button>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="With supporting text"
        description="Pass info for a second, lighter line under the main message."
        code={infoCode}
      >
        <DemoRow>
          <Button
            onClick={() =>
              toastSuccess({
                msg: 'Successfully added inventory item',
                info: 'The device is now available to fulfill orders placed before today.',
              })
            }
          >
            Success with details
          </Button>
        </DemoRow>
      </DemoSection>

      <DemoSection
        title="Options"
        description="Every helper accepts react-toastify options — position, autoClose and more."
      >
        <DemoRow>
          <Button
            variant={BUTTON_VARIANT.SECONDARY}
            onClick={() =>
              toastInfo({
                msg: 'Shown at the bottom for 4 seconds',
                options: {position: 'bottom-right', autoClose: 4000},
              })
            }
          >
            Bottom right, 4s
          </Button>
        </DemoRow>
      </DemoSection>
    </div>
  )
}
