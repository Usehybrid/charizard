import * as React from 'react'
import classes from './styles.module.css'

type SpinnerProps = {
  overrideStyle?: React.CSSProperties
  spinnerStyle?: React.CSSProperties
}

export default function Spinner({overrideStyle, spinnerStyle}: SpinnerProps) {
  return (
    <div className={classes.box} style={overrideStyle}>
      <div className={classes.spinner} style={spinnerStyle}>
        <div className={classes.spinnerCircle}>
          <div className={classes.spinnerCircleGradient}></div>

          <div className={classes.spinnerCircleInner}></div>
        </div>
      </div>
      <span style={{visibility: 'hidden'}} aria-label="loading">
        Loading...
      </span>
    </div>
  )
}
