import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'

export interface ButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
}

// 1. Button => primary, secondary, ghost
// 2. Button Group => primary
// 2. Button Menu => primary

export function Button({children, variant = 'primary', disabled = false}: ButtonProps) {
  return (
    <button
      className={clsx(
        classes.btn,
        variant === 'secondary' && classes.btnSecondary,
        variant === 'ghost' && classes.btnGhost,
        disabled && classes.disabled,
      )}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

function MenuButton() {
  return <div></div>
}

Button.MenuButton = MenuButton
