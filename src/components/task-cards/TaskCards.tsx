import Card from './components/card/Card'
import Header from './components/header/Header'
import classes from './task-cards.module.css'
import {Task} from './types'

interface TaskCardProps {
  headers: string[]
  data: Task[]
}

export function TaskCard({headers, data}: TaskCardProps) {
  return (
    <div className={classes.taskCard}>
      <Header headers={headers} />
      {data.map((data: Task, idx) => (
        <Card data={data} key={idx} />
      ))}
    </div>
  )
}
