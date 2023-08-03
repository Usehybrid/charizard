/**
 * @author Soham Sarkar <soham@hybr1d.io>
 */

import classes from './styles.module.css'

export default function TableLoader({text = 'Getting data...'}: {text?: string}) {
  return (
    <span className={classes.box}>
      <div className={classes.loader}>{text}</div>
    </span>
  )
}
