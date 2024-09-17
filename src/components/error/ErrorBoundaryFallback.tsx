import classes from './styles.module.css'
import {ErrorsLayout} from './ErrorLayout'

export function ErrorBoundaryFallback({
  error,
  resetError,
  isDev,
  homeRoute = '/',
}: {
  error: Error
  resetError: () => void
  isDev: boolean
  homeRoute?: string
}) {
  return (
    <ErrorsLayout showReload={true} onErrorReset={resetError} homeRoute={homeRoute}>
      <h1 className="zap-hero-bold">{isDev ? error.message : 'Aaaah! Something went wrong'}</h1>
      <div className={classes.info}>
        <p className="zap-content-regular">Brace yourself till we get the error fixed</p>
        <p className="zap-content-regular">You may also refresh the page or try again later</p>
      </div>
    </ErrorsLayout>
  )
}
