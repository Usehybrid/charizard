import * as React from 'react'
import * as menu from '@zag-js/menu'
import clsx from 'clsx'
import chevronDown from '../assets/chevron-down-16.svg'
import moreMenuIcon from '../assets/more-menu-2.svg'
import classes from './styles.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {SVG} from '../svg'
import {PositioningOptions} from '@zag-js/popper'
import {BUTTON_V2_SIZE, BUTTON_V2_TYPE, BUTTON_V2_VARIANT} from './types'

interface BaseButtonProps {
  variant?: BUTTON_V2_VARIANT
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  size?: BUTTON_V2_SIZE | 'xs' | 'sm' | 'md' | 'adapt'  // can be removed in the future when old dependencies are updated('xs' | 'sm' | 'md' | 'adapt')
  customStyles?: React.CSSProperties
  btnType: 'button' | 'reset' | 'submit' | undefined
}

interface IconOnlyButtonV2TypeProps extends BaseButtonProps {
  type: BUTTON_V2_TYPE.ICON_ONLY
  icon: React.ReactNode
  children?: React.ReactNode
}

interface IconButtonV2TypeProps extends BaseButtonProps {
  type: BUTTON_V2_TYPE.ICON_LEFT | BUTTON_V2_TYPE.ICON_RIGHT
  icon: React.ReactNode
  children: React.ReactNode
}

interface OtherButtonV2TypeProps extends BaseButtonProps {
//   type?: Exclude<
//   BUTTON_V2_TYPE,
//   BUTTON_V2_TYPE.ICON_LEFT | BUTTON_V2_TYPE.ICON_RIGHT | BUTTON_V2_TYPE.ICON_ONLY
// > 
  type?: BUTTON_V2_TYPE.BASIC | BUTTON_V2_TYPE.BUTTON | BUTTON_V2_TYPE.RESET
  icon?: React.ReactNode
  children: React.ReactNode
}

export type ButtonV2Props =
  | IconOnlyButtonV2TypeProps
  | IconButtonV2TypeProps
  | OtherButtonV2TypeProps

export function ButtonV2({
  children,
  variant = BUTTON_V2_VARIANT.PRIMARY,
  disabled = false,
  onClick,
  type = BUTTON_V2_TYPE.BASIC,
  size = BUTTON_V2_SIZE.DEFAULT,
  customStyles = {},
  icon,
  btnType,
}: ButtonV2Props) {
  return (
    <button
      className={clsx(
        classes.btn,
        variant === BUTTON_V2_VARIANT.PRIMARY && classes.btnPrimary,
        variant === BUTTON_V2_VARIANT.SECONDARY && classes.btnSecondary,
        variant === BUTTON_V2_VARIANT.TERTIARY && classes.btnTertiary,
        size === BUTTON_V2_SIZE.DEFAULT && classes.btnDefault,
        size === BUTTON_V2_SIZE.SMALL && classes.btnSmall,
        type === BUTTON_V2_TYPE.ICON_ONLY &&
          size === BUTTON_V2_SIZE.DEFAULT &&
          classes.iconOnlyDefault,
        type === BUTTON_V2_TYPE.ICON_ONLY && size === BUTTON_V2_SIZE.SMALL && classes.iconOnlySmall,
        disabled && classes.disabled,
      )}
      disabled={disabled}
      onClick={onClick}
      style={customStyles}
      type={btnType}
    >
      {type === BUTTON_V2_TYPE.ICON_LEFT && icon}
      {type === BUTTON_V2_TYPE.ICON_ONLY ? icon : children}
      {type === BUTTON_V2_TYPE.ICON_RIGHT && icon}
    </button>
  )
}

export type MenuItemV2 = {
  label: string
  iconSrc?: string
  onClick: any
  filterFn?: any
  disabled?: boolean
  customStyles?: React.CSSProperties
}

export interface GroupActionProps {
  children: React.ReactNode
  variant?: BUTTON_V2_VARIANT
  disabled?: boolean
  menuItems: MenuItemV2[]
  customData?: any
  size?: BUTTON_V2_SIZE
  actionsDropdownOptions?: {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  }
  positionerProps?: PositioningOptions
  isTable?: boolean
  showDownIconBtn?: boolean
  customStyles?: {
    customMenuStyles?: React.CSSProperties
  }
}

function GroupAction({
  children,
  variant = BUTTON_V2_VARIANT.PRIMARY,
  disabled = false,
  menuItems,
  customData,
  size = BUTTON_V2_SIZE.DEFAULT,
  actionsDropdownOptions,
  positionerProps,
  isTable = false,
  showDownIconBtn = true,
  customStyles,
}: GroupActionProps) {
  const [state, send] = useMachine(
    menu.machine({
      id: React.useId(),
      positioning: {placement: positionerProps?.placement || 'bottom-end'},
    }),
  )
  const [isFocused, setIsFocused] = React.useState(false)
  const buttonRef = React.useRef<HTMLButtonElement>(null)
  const menuRef = React.useRef<HTMLDivElement>(null)
  const api = menu.connect(state, send, normalizeProps)

  const customMenuStyles = customStyles?.customMenuStyles

  React.useEffect(() => {
    if (!actionsDropdownOptions?.setIsActive) return
    actionsDropdownOptions.setIsActive(api.open)
  }, [api.open])

  const isOpenRef = React.useRef(api.open)

  React.useEffect(() => {
    isOpenRef.current = api.open
    if (api.open) {
      setIsFocused(true)
    } else {
      setIsFocused(false)
      buttonRef.current?.blur()
    }
  }, [api.open])

  const handleScroll = () => {
    if (isOpenRef.current) {
      api.setOpen(false)
    }
  }

  React.useEffect(() => {
    const handleFocus = () => setIsFocused(true)
    const handleBlur = () => setIsFocused(false)

    const button = buttonRef.current
    if (button) {
      button.addEventListener('focus', handleFocus)
      button.addEventListener('blur', handleBlur)
    }

    return () => {
      if (button) {
        button.removeEventListener('focus', handleFocus)
        button.removeEventListener('blur', handleBlur)
      }
    }
  }, [])

  const handleClickOutside = (event: MouseEvent) => {
    if (
      buttonRef.current &&
      !buttonRef.current.contains(event.target as Node) &&
      menuRef.current &&
      !menuRef.current.contains(event.target as Node)
    ) {
      setIsFocused(false)
      api.setOpen(false)
    }
  }

  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

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
        <div {...api.getPositionerProps()} ref={menuRef}>
          <div {...api.getContentProps()} className={classes.menus} style={customMenuStyles}>
            {menuItems
              .filter(menu => {
                if (!menu.filterFn) return true
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
                      : () => {
                          menu.onClick()
                          api.setOpen(false)
                        }
                  }
                  style={menu.customStyles}
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
      <button
        ref={buttonRef}
        className={clsx(
          classes.btn,
          classes.btnGrp,
          variant === BUTTON_V2_VARIANT.PRIMARY && classes.btnPrimary,
          variant === BUTTON_V2_VARIANT.SECONDARY && classes.btnSecondary,
          variant === BUTTON_V2_VARIANT.TERTIARY && classes.btnTertiary,
          size === BUTTON_V2_SIZE.SMALL && classes.btnSmall,
          disabled && classes.disabled,
          isFocused && classes.focusVisible,
          isTable && classes.btnTable,
        )}
        disabled={disabled}
        {...api.getTriggerProps()}
      >
        <span className={classes.grpTextBtn}>{children}</span>
        {showDownIconBtn && (
          <span
            className={clsx(
              classes.grpIconBtn,
              variant === BUTTON_V2_VARIANT.PRIMARY && classes.btnAddonPrimary,
              variant === BUTTON_V2_VARIANT.SECONDARY && classes.btnAddonSecondary,
              variant === BUTTON_V2_VARIANT.TERTIARY && classes.btnAddonTertiary,
              size === BUTTON_V2_SIZE.SMALL && classes.btnAddonSmall,
            )}
          >
            <SVG path={chevronDown} width={16} height={16} svgClassName={classes.chevronDown} />
          </span>
        )}
      </button>
      {isTable ? <Portal>{dropdown}</Portal> : dropdown}
    </>
  )
}

export interface ActionsDropdownProps {
  variant?: BUTTON_V2_VARIANT
  disabled?: boolean
  menuItems: MenuItemV2[]
  customData?: any
  size?: BUTTON_V2_SIZE
  positionerProps?: PositioningOptions
  isTable?: boolean
}

export function ActionsDropdown({
  variant,
  disabled,
  menuItems,
  customData,
  size,
  positionerProps,
  isTable,
}: ActionsDropdownProps) {
  const [isActive, setIsActive] = React.useState(false)

  return (
    <GroupAction
      variant={variant}
      disabled={disabled}
      menuItems={menuItems}
      customData={customData}
      size={size}
      actionsDropdownOptions={{setIsActive}}
      positionerProps={positionerProps}
      isTable={isTable}
      showDownIconBtn={false}
    >
      <SVG
        path={moreMenuIcon}
        width={16}
        height={16}
        svgClassName={isTable ? classes.moreMenuIconTable : undefined}
      />
    </GroupAction>
  )
}

ButtonV2.GroupAction = GroupAction
ButtonV2.ActionsDropdown = ActionsDropdown
