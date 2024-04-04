import * as React from 'react'
import * as menu from '@zag-js/menu'
import clsx from 'clsx'
import chevronDown from '../assets/chevron-down.svg'
import threeDots from '../assets/three-dots.svg'
import classes from './styles.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {SVG} from '../svg'
import {PositioningOptions} from '@zag-js/popper'

export enum BUTTON_VARIANT {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  GHOST = 'ghost',
  DANGER = 'danger',
  LINK = 'link',
  MINIMAL = 'minimal',
}

export type ButtonProps = {
  children: React.ReactNode
  variant?: BUTTON_VARIANT
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
  variant = BUTTON_VARIANT.PRIMARY,
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
        variant === BUTTON_VARIANT.PRIMARY && classes.btnPrimary,
        variant === BUTTON_VARIANT.SECONDARY && classes.btnSecondary,
        variant === BUTTON_VARIANT.GHOST && classes.btnGhost,
        variant === BUTTON_VARIANT.DANGER && classes.btnDanger,
        variant === BUTTON_VARIANT.LINK && classes.btnLink,
        variant === BUTTON_VARIANT.MINIMAL && classes.btnMinimal,
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

export type MenuItem = {
  label: string
  iconSrc?: string
  onClick: any
  filterFn?: any
  disabled?: boolean
}

export interface MenuButtonProps {
  children: React.ReactNode
  variant?: BUTTON_VARIANT
  disabled?: boolean
  menuItems: MenuItem[]
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  isCustomTrigger?: boolean
  isSingleBtnTrigger?: boolean
  // exists when it's a custom trigger, used to pass the whole row
  customData?: any
  size?: 'sm' | 'md'
  // props for actions dropdown
  actionsDropdownOptions?: {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  }
  positionerProps?: PositioningOptions
  isTable?: boolean
}

function MenuButton({
  children,
  variant = BUTTON_VARIANT.PRIMARY,
  disabled = false,
  menuItems,
  onClick,
  isCustomTrigger = false,
  isSingleBtnTrigger = false,
  customData,
  size = 'md',
  actionsDropdownOptions,
  positionerProps,
  isTable = false,
}: MenuButtonProps) {
  const [state, send] = useMachine(
    menu.machine({
      id: React.useId(),
      positioning: {placement: positionerProps?.placement || 'bottom-end'},
    }),
  )
  const api = menu.connect(state, send, normalizeProps)

  // to sync with actions dropdown, to get active state styles
  React.useEffect(() => {
    if (!isCustomTrigger || !actionsDropdownOptions?.setIsActive) return
    actionsDropdownOptions.setIsActive(api.isOpen)
  }, [api.isOpen])

  const isOpenRef = React.useRef(api.isOpen)

  React.useEffect(() => {
    isOpenRef.current = api.isOpen
  }, [api.isOpen])

  const handleScroll = () => {
    if (isOpenRef.current) {
      api.close()
    }
  }

  React.useEffect(() => {
    if (isTable) {
      const scrollContainer = document.getElementById('hui-table-scroll-container')
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll, {passive: true})
        return () => scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const dropdown = (
    <>
      {menuItems.length > 0 && (
        <div {...api.positionerProps}>
          <div {...api.contentProps} className={classes.menus}>
            {menuItems
              .filter(menu => {
                if (!menu.filterFn) return true
                // used to pass the table row data in the hide callback
                return menu.filterFn(customData)
              })
              .map(menu => (
                <div
                  key={menu.label}
                  className={clsx(classes.menu, {[classes.menuDisabled]: menu.disabled})}
                  {...api.getItemProps({value: menu.label.toLowerCase()})}
                  onClick={
                    menu.disabled
                      ? undefined
                      : isCustomTrigger
                        ? () => menu.onClick(customData)
                        : menu.onClick
                  }
                >
                  {menu.iconSrc && <SVG path={menu.iconSrc} svgClassName={classes.menuIcon} />}
                  {menu.label}
                </div>
              ))}
          </div>
        </div>
      )}
    </>
  )

  return (
    <>
      {isSingleBtnTrigger ? (
        <button
          className={clsx(
            classes.btn,
            classes.btnMenuSingle,
            variant === 'primary' && classes.btnPrimary,
            variant === 'secondary' && classes.btnSecondary,
            variant === 'ghost' && classes.btnGhost,
            size === 'sm' && classes.btnSm,
            disabled && classes.disabled,
          )}
          disabled={disabled}
          {...api.triggerProps}
        >
          {children}
          <SVG path={chevronDown} width={24} height={24} svgClassName={classes.chevronDown} />
        </button>
      ) : isCustomTrigger ? (
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
      {isTable ? <Portal>{dropdown}</Portal> : dropdown}
    </>
  )
}
export type MenuActionsDropdownProps = {
  menuItems: MenuItem[]
  data?: any
  variant?: 'regular' | 'small'
  isTable?: boolean
}

function MenuActionsDropdown({
  menuItems,
  data,
  variant = 'regular',
  isTable = false,
}: MenuActionsDropdownProps) {
  const [isActive, setIsActive] = React.useState(false)

  return (
    <MenuButton
      menuItems={menuItems}
      isCustomTrigger={true}
      customData={data}
      actionsDropdownOptions={{setIsActive}}
      isTable={isTable}
    >
      <div
        className={clsx(
          variant === 'regular' && classes.actionsBoxRegular,
          variant === 'small' && classes.actionsBoxSmall,
          isActive && classes.actionsBoxActive,
        )}
      >
        <SVG
          path={threeDots}
          svgClassName={clsx(classes.actionsDropdown, isActive && classes.actionsDropdownActive)}
          spanClassName={classes.actionsDropdownSpan}
        />
      </div>
    </MenuButton>
  )
}

Button.MenuButton = MenuButton
Button.ActionsDropdown = MenuActionsDropdown
