import React from 'react'
import ReactDOM from 'react-dom/client'
import {ButtonDemo} from './demo/button-demo'
import TableDemo from './demo/table-demo'
import TaskCardDemo from './demo/task-card-demo'

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

const pages = [
  {label: 'Breadcrumb Item 1', to: '/'},
  {label: 'Breadcrumb Item 2', to: '/'},
  {label: 'Breadcrumb Item 3', to: '/'},
  {label: 'Breadcrumb Item 4', to: '/'},
  {label: 'Breadcrumb Item 5', to: '/'},
  {label: 'Breadcrumb Item 6', to: '/'},
  {label: 'Breadcrumb Item 7', to: '/'},
]

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
