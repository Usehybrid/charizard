import * as React from 'react'
import classes from './styles.module.css'
import {
  InputGroupPropsV2,
  INPUT_COMPONENTS,
  InputV2Props,
  NumberAdornmentProps,
  InputIconProps,
} from './types'
import clsx from 'clsx'

/**
 * InputGroupV2 is a wrapper component that groups related input adornment and icons together,
 * applying appropriate styles based on the child components it contains. It handles
 * padding and border-radius adjustments for elements like icons and adornments.
 */

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

// Create a type for all possible child components
type ChildProps = InputV2Props | NumberAdornmentProps | InputIconProps

export function InputGroupV2({className = '', children, ...props}: InputGroupPropsV2) {
  const [errorHeight, setErrorHeight] = React.useState<number | null>(null)
  const styles: React.CSSProperties = {}
  let iconStyles: React.CSSProperties = {}

  const handleErrorHeightChange = (height: number) => {
    setErrorHeight(height)
  }

  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) return

    const {type} = child

    const displayName = (type as React.ComponentType).displayName

    if (typeof displayName === 'string' && styleMap[displayName]) {
      Object.assign(styles, styleMap[displayName])
    }

    if (displayName === INPUT_COMPONENTS.INPUT) {
      // Type-safe access to input props
      const inputProps = child.props as InputV2Props
      const {errorMsg} = inputProps
      if (errorMsg) {
        iconStyles = {top: `calc(50% - ${(errorHeight || 9) / 2}px)`}
      }
    }
  })

  const clonedChildren = React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }

    const displayName = (child.type as React.ComponentType).displayName
    if (typeof displayName === 'string') {
      const childProps = child.props as ChildProps

      // Create an object to hold the new props based on component type
      let newProps = {}

      if (displayName === INPUT_COMPONENTS.INPUT) {
        const inputChildProps = childProps as InputV2Props
        newProps = {
          inputStyles: {...styles, ...inputChildProps.inputStyles},
          containerStyles: {width: '100%', ...inputChildProps.containerStyles}, // Fixed property name
          onErrorHeightChange: handleErrorHeightChange,
        }
      } else if (displayName === INPUT_COMPONENTS.NUMBER_ADORNMENT) {
        const numberChildProps = childProps as NumberAdornmentProps
        newProps = {
          incrementBtnStyles: {...styles, ...numberChildProps.incrementBtnStyles},
          decrementBtnStyles: {...styles, ...numberChildProps.decrementBtnStyles},
        }
      } else if (
        displayName === INPUT_COMPONENTS.LEFT_ICON ||
        displayName === INPUT_COMPONENTS.RIGHT_ICON
      ) {
        const iconChildProps = childProps as InputIconProps
        newProps = {
          iconStyles: {...iconChildProps.iconStyles, ...iconStyles},
        }
      }

      // Return cloned element with merged props
      return React.cloneElement(child, {
        ...childProps,
        ...newProps,
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
