import Card from './components/task-card/TaskCard'
import TaskCardHeader from './components/task-card-header/TaskCardHeader'
import classes from './task-cards.module.css'
import {ITask} from './types'

interface TaskCardProps {
  headers: string[]
  data: ITask[]
}

export function TaskCard({headers, data}: TaskCardProps) {
  return (
    <div className={classes.taskCard}>
      <TaskCardHeader headers={headers} />
      {data.map((data: ITask, idx) => (
        <Card data={data} key={idx} />
      ))}
    </div>
  )
}
