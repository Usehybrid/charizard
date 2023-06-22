import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'outline'
}

// 1. Button => primary, secondary, outline
// 2. Button Group => primary
// 2. Button Menu => primary

export function Button({children, variant = 'primary'}: ButtonProps) {
  return (
    <button
      className={clsx(
        classes.btn,
        variant === 'secondary' && classes.btnSecondary,
        variant === 'outline' && classes.btnOutline,
      )}
    >
      {children}
    </button>
  )
}

function MenuButton() {
  return <div></div>
}

Button.MenuButton = MenuButton
