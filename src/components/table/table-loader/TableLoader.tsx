import classes from './styles.module.css'

export default function TableLoader({
  text = 'Getting data...',
  isError,
}: {
  text?: string
  isError: boolean
}) {
  return (
    <tbody className={classes.box}>
      <tr className={classes.loader}>{!isError && <td>{text}</td>}</tr>
    </tbody>
  )
}
