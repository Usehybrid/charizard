import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {ModalV2, useDisclosure} from './components'

const styles = {
  width: '90%',
  margin: 'auto',
  padding: '0 20px',
  height: '100dvh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  flexDir: 'column',
}

createRoot(document.getElementById('root') as HTMLElement).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

function App() {
  const {isOpen, onOpen, onClose} = useDisclosure()
  return (
    <div style={styles}>
      {/* <TableDemo /> */}
      <button onClick={onOpen}>Open</button>
      <ModalV2 title="Header" footerButtons={[]} {...{isOpen, onClose}}>
        Test modal
      </ModalV2>
    </div>
  )
}
