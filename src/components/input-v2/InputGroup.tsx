import * as React from 'react'
import classes from './styles.module.css'
import {InputGroupPropsV2, INPUT_COMPONENTS} from './types'
import clsx from 'clsx'

/**
 * InputGroupV2 is a wrapper component that groups related input adornment and icons together,
 * applying appropriate styles based on the child components it contains. It handles
 * padding and border-radius adjustments for elements like icons and adornments.
 *
 * @param {InputGroupPropsV2} props - The properties for the InputGroupV2 component.
 * @param {string} [props.className=''] - Additional class names to apply to the group container.
 * @param {React.ReactNode} props.children - The child components to be grouped, such as inputs, icons, or adornments.
 * @param {React.HTMLAttributes<HTMLDivElement>} [props] - Additional HTML div attributes.
 *
 * @returns {JSX.Element} The rendered InputGroupV2 component.
 *
 * @example
 *  <InputGroupV2>
 *   <InputLeftIcon icon={...} />
 *   <InputV2 />
 *   <InputRightIcon icon={...} />
 * </InputGroupV2>
 * @example
 *  <InputGroupV2>
 *   <InputLeftAdornment isDropdown options={options} onOptionSelect={handleSelect}>...</InputLeftAdornment>
 *   <InputV2 />
 * </InputGroupV2>
 * @example
 *  <InputGroupV2>
 *   <InputV2 />
 *   <InputRightAdornment>...</InputRightAdornment>
 * </InputGroupV2>
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

export function InputGroupV2({className = '', children, ...props}: InputGroupPropsV2) {
  const styles: React.CSSProperties = {}
  let iconStyles: React.CSSProperties = {}

  React.Children.forEach(children, child => {
    if (!React.isValidElement(child)) return

    const {type} = child

    const displayName = (type as React.ComponentType).displayName

    if (typeof displayName === 'string' && styleMap[displayName]) {
      Object.assign(styles, styleMap[displayName])
    }

    if (displayName === INPUT_COMPONENTS.INPUT) {
      const inputProps = child.props
      const {errorMsg} = inputProps
      if (errorMsg) {
        iconStyles = {top: 'calc(50% - 9px)'}
      }
    }
  })

  const clonedChildren = React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }

    const displayName = (child.type as React.ComponentType).displayName
    if (typeof displayName === 'string') {
      const cloneProps: any = {
        [INPUT_COMPONENTS.INPUT]: {
          inputStyles: {...styles, ...child.props.inputStyles},
          containerStyles: {width: '100%', ...child.props.inputStyles},
        },
        [INPUT_COMPONENTS.NUMBER_ADORNMENT]: {
          incrementBtnStyles: {...styles, ...child.props.incrementBtnStyles},
          decrementBtnStyles: {...styles, ...child.props.decrementBtnStyles},
        },
        [INPUT_COMPONENTS.LEFT_ICON]: {iconStyles: {...child.props.iconStyles, ...iconStyles}},
        [INPUT_COMPONENTS.RIGHT_ICON]: {iconStyles: {...child.props.iconStyles, ...iconStyles}},
      }
      return React.cloneElement(child, {
        ...child.props,
        ...(cloneProps[displayName] || {}),
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
