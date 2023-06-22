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

const i = [
  {
    label: 'Item 1',
    iconSrc: 'fd',
    onClick: () => {
      console.log('HI')
    },
  },
  {
    label: 'Item 2',
    onClick: () => {
      console.log('HI 2')
    },
  },
  {
    label: 'Item 3',
    onClick: () => {
      console.log('HI 3')
    },
  },
]

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <div style={styles}>
      <Button.MenuButton variant="primary" menuItems={i}>
        Add software
      </Button.MenuButton>
    </div>
  </React.StrictMode>,
)
