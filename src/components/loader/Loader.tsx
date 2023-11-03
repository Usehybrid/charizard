import * as React from 'react'
import classes from './styles.module.css'

export type LoaderProps = {
  containerStyle?: React.CSSProperties
  loaderStyle?: React.CSSProperties
  variant?: LOADER_VARIANT
}

export enum LOADER_VARIANT {
  RING = 'ring',
  DUAL_RING = 'dual_ring',
  RIPPLE = 'ripple',
  ELLIPSES = 'ellipses',
  ROLLER = 'roller',
  SPINNER = 'spinner',
  HOURGLASS = 'hourglass',
  GRID = 'grid',
}

export function Loader({containerStyle, loaderStyle, variant = LOADER_VARIANT.RING}: LoaderProps) {
  const getSpinnerVariants = (variant: LOADER_VARIANT) => {
    switch (variant) {
      case LOADER_VARIANT.RING:
        return <Ring loaderStyle={loaderStyle} />
      case LOADER_VARIANT.DUAL_RING:
        return <DualRing loaderStyle={loaderStyle} />
      case LOADER_VARIANT.RIPPLE:
        return <Ripple loaderStyle={loaderStyle} />
      case LOADER_VARIANT.ELLIPSES:
        return <Ellipses loaderStyle={loaderStyle} />
      case LOADER_VARIANT.ROLLER:
        return <Roller loaderStyle={loaderStyle} />
      case LOADER_VARIANT.SPINNER:
        return <Spinner loaderStyle={loaderStyle} />
      case LOADER_VARIANT.HOURGLASS:
        return <Hourglass loaderStyle={loaderStyle} />
      case LOADER_VARIANT.GRID:
        return <Grid loaderStyle={loaderStyle} />
    }
  }
  return (
    <div className={classes.box} style={containerStyle}>
      {getSpinnerVariants(variant)}
      <span style={{visibility: 'hidden', position: 'absolute'}} aria-label="loading">
        Loading...
      </span>
    </div>
  )
}

function Ring({loaderStyle}: {loaderStyle: LoaderProps['loaderStyle']}) {
  return (
    <div className={classes.ldsRing} style={loaderStyle}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

function DualRing({loaderStyle}: {loaderStyle: LoaderProps['loaderStyle']}) {
  return <div className={classes.ldsDualRing} style={loaderStyle}></div>
}

function Ripple({loaderStyle}: {loaderStyle: LoaderProps['loaderStyle']}) {
  return (
    <div className={classes.ldsRipple} style={loaderStyle}>
      <div></div>
      <div></div>
    </div>
  )
}

function Ellipses({loaderStyle}: {loaderStyle: LoaderProps['loaderStyle']}) {
  return (
    <div className={classes.ldsEllipsis} style={loaderStyle}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

function Roller({loaderStyle}: {loaderStyle: LoaderProps['loaderStyle']}) {
  return (
    <div className={classes.ldsRoller} style={loaderStyle}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

function Spinner({loaderStyle}: {loaderStyle: LoaderProps['loaderStyle']}) {
  return (
    <div className={classes.ldsSpinner} style={loaderStyle}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}

function Hourglass({loaderStyle}: {loaderStyle: LoaderProps['loaderStyle']}) {
  return <div className={classes.ldsHourglass} style={loaderStyle}></div>
}

function Grid({loaderStyle}: {loaderStyle: LoaderProps['loaderStyle']}) {
  return (
    <div className={classes.ldsGrid} style={loaderStyle}>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  )
}
