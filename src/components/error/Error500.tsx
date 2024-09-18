import classes from './styles.module.css'
import clsx from 'clsx'

export function Error500() {
  return (
    <>
      <h1 className="zap-hero-bold">System Error</h1>
      <div className={classes.info}>
        <p className="zap-content-regular">Something went wrong!</p>
        <p className="zap-content-regular">Please try again later.</p>
      </div>
      <p className={clsx('zap-heading-semibold', classes.error)}>Error code: 500</p>
    </>
  )
}
