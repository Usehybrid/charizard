import classes from './styles.module.css'
import {TableProps} from '../Table'
import {EmptyState} from '../../empty-state'

export default function TableEmpty({
  emptyStateConfig,
}: {
  emptyStateConfig: TableProps['emptyStateConfig']
}) {
  if (!emptyStateConfig) return null
  return (
    <tbody className={classes.box}>
      <tr>
        <td className={classes.empty} colSpan={emptyStateConfig.columns}>
          <EmptyState
            icon={emptyStateConfig.icon}
            title={emptyStateConfig.title}
            desc={emptyStateConfig.desc}
            btnText={emptyStateConfig.btnText}
            onClick={emptyStateConfig.onClick}
          />
        </td>
      </tr>
    </tbody>
  )
}
