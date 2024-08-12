import clsx from 'clsx'
import Card from './components/task-card/TaskCard'
import TaskCardHeader from './components/task-card-header/TaskCardHeader'
import tabletsCanIcon from '../assets/medical/tablets-can.svg'
import classes from './task-cards.module.css'
import {ITask} from './types'
import {Loader} from '../loader'
import {SVG} from '../svg'
import { MenuItemV2 } from '../button-v2'

interface TaskCardsProps {
  headers: string[]
  data: ITask[]
  isLoading?: boolean
  isError?: boolean
  emptyText?: string
  menuItems: MenuItemV2[]
}

export function TaskCards({
  headers,
  data,
  isLoading = false,
  isError = false,
  emptyText = 'No requests',
  menuItems=[],
}: TaskCardsProps) {
  return (
    <div className={classes.taskCardContainer}>
      <div className={classes.taskCard}>
        <TaskCardHeader headers={headers} />
        {isLoading ? (
          <Loader containerStyle={{height: '164px'}} />
        ) : isError ? (
          <Error />
        ) : data.length > 0 ? (
          data.map((data: ITask, idx) => <Card data={data} key={idx} menuItems={menuItems} />)
        ) : (
          <Empty emptyText={emptyText} />
        )}
      </div>
    </div>
  )
}
function Error() {
  return (
    <div className={classes.emptyBox}>
      <p className={clsx(classes.emptyTxt, 'zap-content-medium')}>
        Something went wrong, please try again later.
      </p>
    </div>
  )
}

function Empty({emptyText}: {emptyText?: TaskCardsProps['emptyText']}) {
  return (
    <div className={classes.emptyBox}>
      <div>
        <SVG path={tabletsCanIcon} width={24} height={24} svgClassName={classes.emptyIcon} />
      </div>
      <p className={clsx(classes.emptyTxt, 'zap-content-medium')}>{emptyText}</p>
    </div>
  )
}
