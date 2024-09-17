import classes from './styles.module.css'
import clsx from 'clsx'

export function Error404() {
  return (
    <>
      <h1 className="zap-hero-bold">Page Not Found</h1>
      <div className={classes.info}>
        <p className="zap-content-regular">The page you are looking for does not exist!</p>
      </div>
      <p className={clsx('zap-heading-semibold', classes.error)}>Error code: 404</p>
    </>
  )
}
