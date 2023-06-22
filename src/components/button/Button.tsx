import * as React from 'react'
import * as menu from '@zag-js/menu'
import clsx from 'clsx'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import chevronDown from '../assets/chevron-down.svg'

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

export interface MenuButtonProps {
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
}

function MenuButton({children, variant = 'primary', disabled}: MenuButtonProps) {
  const [state, send] = useMachine(menu.machine({id: '1', 'aria-label': 'File'}))

  const api = menu.connect(state, send, normalizeProps)
  return (
    <div>
      <div className={classes.btnGrp}>
        <button
          className={clsx(
            classes.btn,
            classes.btnMenu,
            variant === 'secondary' && classes.btnSecondary,
            variant === 'ghost' && classes.btnGhost,
            disabled && classes.disabled,
          )}
          disabled={disabled}
        >
          {children}
        </button>

        <button
          {...api.triggerProps}
          className={clsx(
            classes.btn,
            classes.btnAddon,
            variant === 'secondary' && classes.btnSecondary,
            variant === 'ghost' && classes.btnGhost,
            disabled && classes.disabled,
          )}
          disabled={disabled}
        >
          <img
            src={chevronDown}
            alt="chevron down"
            className={clsx(
              classes.btnImg,
              variant === 'secondary' && classes.btnSecondary,
              variant === 'ghost' && classes.btnGhost,
            )}
          />
        </button>
      </div>

      <div {...api.positionerProps}>
        <ul {...api.contentProps}>
          <li {...api.getItemProps({id: 'edit'})}>Edit</li>
          <li {...api.getItemProps({id: 'duplicate'})}>Duplicate</li>
          <li {...api.getItemProps({id: 'delete'})}>Delete</li>
          <li {...api.getItemProps({id: 'export'})}>Export...</li>
        </ul>
      </div>
    </div>
  )
}

Button.MenuButton = MenuButton
