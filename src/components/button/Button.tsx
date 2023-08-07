/**
 * @author Soham Sarkar <soham@hybr1d.io>
 */

import * as React from 'react'
import * as menu from '@zag-js/menu'
import clsx from 'clsx'
import chevronDown from '../assets/chevron-down.svg'
import threeDots from '../assets/three-dots.svg'
import classes from './styles.module.css'
import {useMachine, normalizeProps} from '@zag-js/react'
import {SVG} from '../svg'

export enum ButtonVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  DANGER = 'danger',
}

export type ButtonProps = {
  children: React.ReactNode
  variant?: ButtonVariant
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  type?: 'button' | 'submit' | 'reset'
  size?: 'xs' | 'sm' | 'md' | 'adapt'
  customStyles?: React.CSSProperties
}

// 1. Button => primary, secondary, ghost
// 2. Button Group => primary
// 2. Button Menu => primary

export function Button({
  children,
  variant = ButtonVariant.PRIMARY,
  disabled = false,
  onClick,
  type = 'button',
  size = 'md',
  customStyles = {},
}: ButtonProps) {
  return (
    <button
      className={clsx(
        classes.btn,
        variant === 'primary' && classes.btnPrimary,
        variant === 'secondary' && classes.btnSecondary,
        variant === 'ghost' && classes.btnGhost,
        variant === 'danger' && classes.btnDanger,
        size === 'sm' && classes.btnSm,
        size === 'adapt' && classes.btnAdapt,
        size === 'xs' && classes.btnXs,
        disabled && classes.disabled,
      )}
      disabled={disabled}
      onClick={onClick}
      type={type}
      style={customStyles}
    >
      {children}
    </button>
  )
}

export interface MenuButtonProps {
  id?: string
  children: React.ReactNode
  variant?: 'primary' | 'secondary' | 'ghost'
  disabled?: boolean
  menuItems: {label: string; iconSrc?: string; onClick: any}[]
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  isCustomTrigger?: boolean
  // exists on why it's a custom trigger, used to pass the whole row
  customData?: any
  size?: 'sm' | 'md'
}

function MenuButton({
  id = 'hui-menu-button',
  children,
  variant = 'primary',
  disabled = false,
  menuItems,
  onClick,
  isCustomTrigger = false,
  customData,
  size = 'md',
}: MenuButtonProps) {
  const [state, send] = useMachine(menu.machine({id, positioning: {placement: 'bottom-end'}}))
  const api = menu.connect(state, send, normalizeProps)

  return (
    <div>
      {isCustomTrigger ? (
        <button
          className={clsx(
            'hybr1d-ui-reset-btn',
            classes.customTrigger,
            api.isOpen && classes.customTriggerActive,
          )}
          {...api.triggerProps}
        >
          {children}
        </button>
      ) : (
        <div className={classes.btnGrp}>
          <button
            className={clsx(
              classes.btn,
              classes.btnMenu,
              variant === 'primary' && classes.btnPrimary,
              variant === 'secondary' && classes.btnSecondary,
              variant === 'ghost' && classes.btnGhost,
              size === 'sm' && classes.btnSm,
              disabled && classes.disabled,
            )}
            disabled={disabled}
            onClick={onClick}
          >
            {children}
          </button>

          <button
            className={clsx(
              classes.btn,
              classes.btnAddon,
              variant === 'primary' && classes.btnPrimary,
              variant === 'primary' && classes.btnAddonPrimary,
              variant === 'secondary' && classes.btnSecondary,
              variant === 'secondary' && classes.btnAddonSecondary,
              variant === 'ghost' && classes.btnGhost,
              variant === 'ghost' && classes.btnAddonGhost,
              size === 'sm' && classes.btnSm,
              disabled && classes.disabled,
            )}
            disabled={disabled}
            {...api.triggerProps}
          >
            <img
              src={chevronDown}
              alt="chevron down"
              className={clsx(
                variant === 'primary' && classes.btnImgPrimary,
                variant === 'secondary' && classes.btnImgSecondary,
                variant === 'ghost' && classes.btnImgGhost,
                size === 'sm' && classes.btnImgSm,
              )}
            />
          </button>
        </div>
      )}

      <div {...api.positionerProps}>
        <div {...api.contentProps} className={classes.menus}>
          {menuItems.map(menu => (
            <div
              key={menu.label}
              className={classes.menu}
              {...api.getItemProps({id: menu.label.toLowerCase()})}
              onClick={isCustomTrigger ? () => menu.onClick(customData) : menu.onClick}
            >
              {menu.iconSrc && <SVG path={menu.iconSrc} svgClassName={classes.menuIcon} />}
              {menu.label}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
export interface MenuActionsDropdownProps {
  id: string
  menuItems: {label: string; iconSrc?: string; onClick: any}[]
  data?: any
  size?: 'md' | 'lg'
}

function MenuActionsDropdown({id, menuItems, data, size = 'md'}: MenuActionsDropdownProps) {
  return (
    <div>
      <MenuButton
        id={id}
        menuItems={menuItems}
        onClick={() => {}}
        isCustomTrigger={true}
        customData={data}
        size={size === 'md' ? 'sm' : 'md'}
      >
        <div className={clsx(classes.actionsBox, size === 'lg' && classes.actionsBoxLg)}>
          <img src={threeDots} className={classes.actionsDropdown} />
        </div>
      </MenuButton>
    </div>
  )
}

Button.MenuButton = MenuButton
Button.ActionsDropdown = MenuActionsDropdown
