import React from 'react'
import ReactDOM from 'react-dom/client'
import {ButtonDemo} from './demo/button-demo'
import TableDemo from './demo/table-demo'
import TaskCardDemo from './demo/task-card-demo'
import {CheckboxDemo} from './demo/checkbox/checkbox-demo'

const styles = {
  width: '90%',
  margin: 'auto',
  padding: '0 20px',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  // backgroundColor: '#FAFAFB',
  flexDir: 'column',
}

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

const options = [
  {
    value: '1',
    label: 'Full Time',
    // icon: chevronDownIcon,
    profileImgUrl: 'https://picsum.photos/200',
    // subLabel: '3123123213213123',
  },
  {
    value: '2',
    label: 'Part Time',
    // icon: chevronDownIcon,
    profileImgUrl: 'https://picsum.photos/200',
    // subLabel: '3123123213213123',
  },
  {
    value: '3',
    label: 'Fixed Term',
    // icon: chevronDownIcon,
    profileImgUrl: 'https://picsum.photos/200',
    // subLabel: '3123123213213123',
  },
  {
    value: '4',
    label: 'Internship',
    // icon: chevronDownIcon,
    profileImgUrl: 'https://picsum.photos/200',
    // subLabel: '3123123213213123',
  },
]

function App() {
  return (
    <div style={styles}>
      <TaskCardDemo />
    </div>
  )
}
