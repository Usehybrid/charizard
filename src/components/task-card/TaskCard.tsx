import Card from './components/card/Card'
import Header from './components/header/Header'
import classes from './styles.module.css'
import { Key } from 'react'
import {Task} from './types'

export function TaskCard({data}: {data: Task[]}) {
  return (
    <div className={classes.taskCard}>
      <Header />
      {data.map((data: Task, i: Key) => (
        <Card data={data} key={i} />
      ))}
    </div>
  )
}
