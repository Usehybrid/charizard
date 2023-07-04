import * as React from 'react'
import classes from './styles.module.scss'
import {Inputs} from './types'

interface InputGroupProps {
  children: React.ReactNode
}

export function InputGroup({children}: InputGroupProps) {
  const styles: React.CSSProperties = {}

  const childrenArray = React.Children.toArray(children)

  childrenArray.forEach((child: any) => {
    if (child.type.id === 'InputLeftElement') {
      styles.paddingInlineStart = '36px'
    }
    if (child.type.id === 'InputRightElement') {
      styles.paddingInlineEnd = '36px'
    }
    if (child.type.id === 'InputLeftAddon') {
      styles.borderTopLeftRadius = 0
      styles.borderBottomLeftRadius = 0
    }
    if (child.type.id === 'InputRightAddon') {
      styles.borderTopRightRadius = 0
      styles.borderBottomRightRadius = 0
    }
  })

  const clones = childrenArray.map((child: any) => {
    return child.type.id !== 'Input'
      ? child
      : React.cloneElement(child, {
          ...child.props,
          customStyles: {...styles, ...child.props.customStyles},
        })
  })

  return <div className={classes.inputGroup}>{clones}</div>
}

InputGroup.displayName = Inputs.INPUT_GROUP
InputGroup.id = Inputs.INPUT_GROUP
