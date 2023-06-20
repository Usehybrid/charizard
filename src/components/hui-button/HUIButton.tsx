import * as React from 'react'
import classes from './styles.module.css'
import clsx from 'clsx'

interface HUIButtonProps {
  children: React.ReactNode
  variant: 'primary' | 'secondary' | 'outline'
}

// 1. Button => primary, secondary, outline
// 2. Button Group => primary
// 2. Button Menu => primary

export default function HUIButton({children, variant = 'primary'}: HUIButtonProps) {
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

HUIButton.MenuButton = MenuButton
