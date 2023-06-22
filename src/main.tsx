import React from 'react'
import ReactDOM from 'react-dom/client'
import {Button} from './components'

const styles = {
  width: '100%',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div style={styles}>
      <Button.MenuButton>Add software</Button.MenuButton>
    </div>
  </React.StrictMode>,
)
