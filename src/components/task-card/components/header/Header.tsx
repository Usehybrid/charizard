import * as React from 'react'
import classes from './styles.module.css'

export default function Header({headers}: {headers: string[]}) {
  return (
    <div className={classes.taskCardHeader}>
      {headers.map((header: string, index: React.Key) => (
        <div key={index}>{header}</div>
      ))}
      <div></div>
    </div>
  )
}
