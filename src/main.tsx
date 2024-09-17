import React from 'react'
import ReactDOM from 'react-dom/client'
import {TableDemo} from './demo/table-demo'
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
    <App />
  </React.StrictMode>,
)

function App() {
  return (
    <div style={styles}>
      <TableDemo />
      {/* <ButtonDemo /> */}
    </div>
  )
}
