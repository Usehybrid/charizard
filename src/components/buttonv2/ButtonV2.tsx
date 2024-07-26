import * as React from 'react'
import * as menu from '@zag-js/menu'
import clsx from 'clsx'
import chevronDown from '../assets/chevron-down-16.svg'
import classes from './styles.module.css'
import { useMachine, normalizeProps, Portal } from '@zag-js/react'
import { SVG } from '../svg'
import { PositioningOptions } from '@zag-js/popper'

export enum BUTTON_V2_VARIANT {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  TERTIARY = 'tertiary',
}

export enum BUTTON_V2_SIZE {
  SMALL = 'small',
  DEFAULT = 'deafult',
}

export enum BUTTON_V2_TYPE {
  BASIC = 'basic',
  ICON_LEFT = 'icon-left',
  ICON_RIGHT = 'icon-right',
  ICON_ONLY = 'icon-only'
}

interface BaseButtonProps {
  variant?: BUTTON_V2_VARIANT
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  size?: BUTTON_V2_SIZE
  customStyles?: React.CSSProperties
}

interface IconOnlyButtonV2TypeProps extends BaseButtonProps {
  type: BUTTON_V2_TYPE.ICON_ONLY
  icon: React.ReactNode // Icon is mandatory for these types
  children?: React.ReactNode
}

interface IconButtonV2TypeProps extends BaseButtonProps {
  type: BUTTON_V2_TYPE.ICON_LEFT | BUTTON_V2_TYPE.ICON_RIGHT
  icon: React.ReactNode // Icon is mandatory for these types
  children: React.ReactNode
}

interface OtherButtonV2TypeProps extends BaseButtonProps {
  type?: Exclude<BUTTON_V2_TYPE, BUTTON_V2_TYPE.ICON_LEFT | BUTTON_V2_TYPE.ICON_RIGHT | BUTTON_V2_TYPE.ICON_ONLY>
  icon?: React.ReactNode // Icon is optional for these types
  children: React.ReactNode
}

export type ButtonV2Props = IconOnlyButtonV2TypeProps | IconButtonV2TypeProps | OtherButtonV2TypeProps

// 1. Button => primary, secondary, tertiary
// 2. Button Group => primary
// 2. Button Menu => primary

export function ButtonV2({
  children,
  variant = BUTTON_V2_VARIANT.PRIMARY,
  disabled = false,
  onClick,
  type = BUTTON_V2_TYPE.BASIC,
  size = BUTTON_V2_SIZE.DEFAULT,
  customStyles = {},
  icon,
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
        (type === BUTTON_V2_TYPE.ICON_ONLY && size === BUTTON_V2_SIZE.DEFAULT) && classes.iconOnlyDefault,
        (type === BUTTON_V2_TYPE.ICON_ONLY && size === BUTTON_V2_SIZE.SMALL) && classes.iconOnlySmall,
        disabled && classes.disabled,
      )}
      disabled={disabled}
      onClick={onClick}
      style={customStyles}
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
}

export interface GroupActionProps {
  children: React.ReactNode
  variant?: BUTTON_V2_VARIANT
  disabled?: boolean
  menuItems: MenuItemV2[]
  customData?: any
  size?: BUTTON_V2_SIZE
  // props for actions dropdown
  actionsDropdownOptions?: {
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>
  }
  positionerProps?: PositioningOptions
  isTable?: boolean
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
}: GroupActionProps) {
  const [state, send] = useMachine(
    menu.machine({
      id: React.useId(),
      positioning: { placement: positionerProps?.placement || 'bottom-end' },
    }),
  )
  const api = menu.connect(state, send, normalizeProps)

  // to sync with actions dropdown, to get active state styles
  React.useEffect(() => {
    if (!actionsDropdownOptions?.setIsActive) return
    actionsDropdownOptions.setIsActive(api.open)
  }, [api.open])

  const isOpenRef = React.useRef(api.open)

  React.useEffect(() => {
    isOpenRef.current = api.open
  }, [api.open])

  const handleScroll = () => {
    if (isOpenRef.current) {
      console.log('scrolling...')
      api.setOpen(false)
    }
  }

  React.useEffect(() => {
    if (isTable) {
      const scrollContainer = document.getElementById('hui-table-scroll-container')
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', handleScroll, { passive: true })
        return () => scrollContainer.removeEventListener('scroll', handleScroll)
      }
    }
  }, [])

  const dropdown = (
    <>
      {menuItems.length > 0 && (
        <div {...api.getPositionerProps()}>
          <div {...api.getContentProps()} className={classes.menus}>
            {menuItems
              .filter(menu => {
                if (!menu.filterFn) return true
                // used to pass the table row data in the hide callback
                return menu.filterFn(customData)
              })
              .map(menu => (
                <div
                  key={menu.label}
                  className={clsx(classes.menu, { [classes.menuDisabled]: menu.disabled })}
                  {...api.getItemProps({ value: menu.label.toLowerCase() })}
                  onClick={
                    menu.disabled
                      ? undefined
                      : menu.onClick
                  }
                >
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
          className={clsx(
            classes.btn,
            classes.btnGrp,
            variant === BUTTON_V2_VARIANT.PRIMARY && classes.btnPrimary,
            variant === BUTTON_V2_VARIANT.SECONDARY && classes.btnSecondary,
            variant === BUTTON_V2_VARIANT.TERTIARY && classes.btnTertiary,
            size === BUTTON_V2_SIZE.SMALL && classes.btnSmall,
            disabled && classes.disabled,
          )}
          disabled={disabled}
          {...api.getTriggerProps()}
        >
          <span className={classes.grpTextBtn}>{children}</span>
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
        </button>
      {isTable ? <Portal>{dropdown}</Portal> : dropdown}
    </>
  )
}


ButtonV2.GroupAction = GroupAction
