import clsx from 'clsx'
import TaskCard from './components/task-card/TaskCard'
import TaskCardHeader from './components/task-card-header/TaskCardHeader'
import emptySvg from './assets/empty-task-cards.svg'
import classes from './task-cards.module.css'
import {Loader} from '../loader'
import {SVG} from '../svg'
import {MenuItemV2} from '../button-v2'
import {TablePagination} from '../table-v3'
import {ITask} from './types'

interface TaskCardsProps {
  headers: string[]
  data: ITask[]
  isLoading?: boolean
  isError?: boolean
  emptyText?: string
  menuItems: MenuItemV2[][]
  paginationConfig?: {
    metaData?: {
      total_items: number
      items_on_page: number
      page_no: number
    }
    page: number
    setPage: (page: number) => void
    limit: number
    setLimit: (limit: number) => void
  }
}

export function TaskCards({
  headers,
  data,
  isLoading = false,
  isError = false,
  emptyText = 'No requests',
  menuItems = [[]],
  paginationConfig,
}: TaskCardsProps) {
  const isPaginated = !!paginationConfig
  const isEmpty = !isLoading && !isError && (!data || data?.length === 0)
  return (
    <div className={classes.taskCardContainer}>
      {isEmpty ? (
        <Empty emptyText={emptyText} />
      ) : (
        <div className={clsx(classes.taskCard, isPaginated && classes.taskCardPaginated)}>
          <TaskCardHeader headers={headers} />
          {isLoading ? (
            <Loader containerStyle={{height: '164px'}} />
          ) : isError ? (
            <Error />
          ) : (
            data.map((data: ITask, idx) => (
              <TaskCard data={data} key={idx} menuItems={menuItems[idx]} />
            ))
          )}
          {isPaginated && (
            <div className={classes.pagination}>
              <TablePagination {...{paginationConfig}} />
            </div>
          )}
        </div>
      )}
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

function Empty({emptyText = 'No pending tasks'}: {emptyText?: TaskCardsProps['emptyText']}) {
  return (
    <div className={classes.emptyBox}>
      <div>
        <SVG path={emptySvg} width={24} height={24} svgClassName={classes.emptyIcon} />
      </div>
      <p className={clsx(classes.emptyTxt, 'zap-content-medium')}>{emptyText}</p>
    </div>
  )
}
