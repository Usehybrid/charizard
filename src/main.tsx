import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {TableDemo} from './demo/table-demo'

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
  return (
    <div style={styles}>
      <TableDemo />
    </div>
  )
}
