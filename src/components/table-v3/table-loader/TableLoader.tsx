import clsx from 'clsx'
import classes from './table-loader.module.css'

export default function TableLoader({
  text = 'Getting data...',
  isError,
}: {
  text?: string
  isError: boolean
}) {
  return (
    <tbody className={classes.box}>
      <tr className={clsx(classes.loader, 'zap-content-regular')}>{!isError && <td>{text}</td>}</tr>
    </tbody>
  )
}
