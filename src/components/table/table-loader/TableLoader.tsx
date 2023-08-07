import classes from './styles.module.css'

export default function TableLoader({text = 'Getting data...'}: {text?: string}) {
  return (
    <tbody className={classes.box}>
      <tr className={classes.loader}>
        <td>{text}</td>
      </tr>
    </tbody>
  )
}
