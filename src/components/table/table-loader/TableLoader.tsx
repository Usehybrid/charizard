import classes from './styles.module.css'

export default function TableLoader({
  text = 'Getting data...',
  isFetching,
  isError,
}: {
  text?: string
  isFetching: boolean
  isError: boolean
}) {
  return (
    <tbody className={classes.box}>
      <tr className={classes.loader}>{!isFetching && !isError && <td>{text}</td>}</tr>
    </tbody>
  )
}
