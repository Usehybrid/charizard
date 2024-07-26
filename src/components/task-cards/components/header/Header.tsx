import classes from './styles.module.css'
import {Key} from 'react'

export default function Header({headers}: {headers: string[]}) {
  return (
    <div className={classes.taskCardHeader}>
      {headers.map((header: string, i: Key) => (
        <div>{header}</div>
      ))}
      <div></div>
    </div>
  )
}
