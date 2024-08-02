import classes from './styles.module.css'

import {EmptyState} from '../../empty-state'
import {TableV3Props} from '../TableV3'

export default function TableEmpty({
  emptyStateConfig,
  search,
}: {
  emptyStateConfig: TableV3Props['emptyStateConfig']
  search?: string
}) {
  if (!emptyStateConfig) return null
  return (
    <tbody className={classes.box}>
      <tr>
        <td className={classes.empty} colSpan={emptyStateConfig.columns}>
          <EmptyState
            icon={emptyStateConfig.icon}
            title={
              !search?.length ? emptyStateConfig.title : emptyStateConfig.emptySearchTitle || ''
            }
            desc={!search?.length ? emptyStateConfig.desc : ''}
            btnText={emptyStateConfig.btnText}
            onClick={emptyStateConfig.onClick}
          />
        </td>
      </tr>
    </tbody>
  )
}
