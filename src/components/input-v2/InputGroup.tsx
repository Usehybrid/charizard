import * as React from 'react'
import classes from './styles.module.css'
import {InputGroupPropsV2, INPUT_COMPONENTS} from './types'
import clsx from 'clsx'

export function InputGroupV2({className = '', children, ...props}: InputGroupPropsV2) {
  const styles: React.CSSProperties = {}
  let iconStyles: React.CSSProperties = {}

  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) return

    const {type} = child

    const displayName = (type as React.ComponentType).displayName

    if (typeof displayName === 'string') {
      const styleMap: Record<string, React.CSSProperties> = {
        [INPUT_COMPONENTS.LEFT_ICON]: {paddingLeft: '40px'},
        [INPUT_COMPONENTS.RIGHT_ICON]: {paddingRight: '40px'},
        [INPUT_COMPONENTS.LEFT_ADORNMENT]: {
          borderTopLeftRadius: 0,
          borderBottomLeftRadius: 0,
        },
        [INPUT_COMPONENTS.RIGHT_ADORNMENT]: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
        [INPUT_COMPONENTS.NUMBER_ADORNMENT]: {
          borderTopRightRadius: 0,
          borderBottomRightRadius: 0,
        },
      }

      Object.assign(styles, styleMap[displayName] || {})

      if (displayName === INPUT_COMPONENTS.INPUT) {
        const inputProps = child.props
        const {errorMsg} = inputProps
        if (errorMsg) {
          iconStyles = {top: 'calc(50% - 9px)'}
        }
      }
    }
  })

  const clonedChildren = React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }

    const displayName = (child.type as React.ComponentType).displayName

    if (displayName === INPUT_COMPONENTS.INPUT) {
      return React.cloneElement(child, {
        ...child.props,
        inputStyles: {...styles, ...child.props.inputStyles},
        containerStyles: {width: '100%', ...child.props.inputStyles},
      })
    }
    if (displayName === INPUT_COMPONENTS.LEFT_ICON || displayName === INPUT_COMPONENTS.RIGHT_ICON) {
      return React.cloneElement(child, {
        ...child.props,
        iconStyles: {...child.props.iconStyles, ...iconStyles},
      })
    }

    return child
  })

  return (
    <div {...props} className={clsx(classes.group, className)}>
      {clonedChildren}
    </div>
  )
}

InputGroupV2.displayName = INPUT_COMPONENTS.GROUP
