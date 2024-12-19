import * as React from 'react'
import * as menu from '@zag-js/menu'
import clsx from 'clsx'
import chevronDown from '../assets/chevron-down-16.svg'
import moreMenuIcon from '../assets/more-menu-2.svg'
import classes from './styles.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {SVG} from '../svg'
import {BUTTON_SIZE, BUTTON_TYPE, BUTTON_VARIANT} from './types'
import type {PositioningOptions} from '@zag-js/popper'
import {handleScrollTable} from './utils'

interface BaseButtonProps {
  variant?: BUTTON_VARIANT
  disabled?: boolean
  onClick?: React.MouseEventHandler<HTMLButtonElement>
  size?: BUTTON_SIZE
  customStyles?: React.CSSProperties
  btnType?: 'button' | 'reset' | 'submit'
}

interface IconOnlyButtonTypeProps extends BaseButtonProps {
  type: BUTTON_TYPE.ICON_ONLY
  icon: React.ReactNode
  children?: React.ReactNode
}

interface IconButtonTypeProps extends BaseButtonProps {
  type: BUTTON_TYPE.ICON_LEFT | BUTTON_TYPE.ICON_RIGHT
  icon: React.ReactNode
  children: React.ReactNode
}

interface OtherButtonTypeProps extends BaseButtonProps {
  type?: BUTTON_TYPE.BASIC | BUTTON_TYPE.BUTTON | BUTTON_TYPE.RESET
  icon?: React.ReactNode
  children: React.ReactNode
}

export type ButtonProps = IconOnlyButtonTypeProps | IconButtonTypeProps | OtherButtonTypeProps

export function Button({
  children,
  variant = BUTTON_VARIANT.PRIMARY,
  disabled = false,
  onClick,
  type = BUTTON_TYPE.BASIC,
  size = BUTTON_SIZE.DEFAULT,
  customStyles = {},
  icon,
  btnType,
}: ButtonProps) {
  return (
    <button
      className={clsx(
        classes.btn,
        variant === BUTTON_VARIANT.PRIMARY && classes.btnPrimary,
        variant === BUTTON_VARIANT.SECONDARY && classes.btnSecondary,
        variant === BUTTON_VARIANT.TERTIARY && classes.btnTertiary,
        variant === BUTTON_VARIANT.LINK && classes.btnLink,
        size === BUTTON_SIZE.DEFAULT && classes.btnDefault,
        size === BUTTON_SIZE.SMALL && classes.btnSmall,
        type === BUTTON_TYPE.ICON_ONLY && size === BUTTON_SIZE.DEFAULT && classes.iconOnlyDefault,
        type === BUTTON_TYPE.ICON_ONLY && size === BUTTON_SIZE.SMALL && classes.iconOnlySmall,
        disabled && classes.disabled,
      )}
      disabled={disabled}
      onClick={onClick}
      style={customStyles}
      type={btnType}
    >
      {type === BUTTON_TYPE.ICON_LEFT && icon}
      {type === BUTTON_TYPE.ICON_ONLY ? icon : children}
      {type === BUTTON_TYPE.ICON_RIGHT && icon}
    </button>
  )
}

export type MenuItem = {
  label: string
  iconSrc?: string
  onClick: any
  filterFn?: any
  disabled?: boolean
  customStyles?: React.CSSProperties
  customSvgClassName?: string
}

export interface GroupActionProps {
  children: React.ReactNode
  variant?: BUTTON_VARIANT
  disabled?: boolean
  menuItems: MenuItem[]
  customData?: any
  size?: BUTTON_SIZE
  positionerProps?: PositioningOptions
  isTable?: boolean
  customStyles?: {
    customMenuStyles?: React.CSSProperties
    customButtonStyles?: React.CSSProperties
  }
  isCustomTrigger?: boolean
  isSingleBtnTrigger?: boolean
  hideDivider?: boolean
  onClick?: any
}

const GroupAction = React.forwardRef(function (
  {
    children,
    variant = BUTTON_VARIANT.PRIMARY,
    disabled = false,
    menuItems,
    customData,
    size = BUTTON_SIZE.DEFAULT,
    positionerProps,
    isTable = false,
    isCustomTrigger = false,
    customStyles,
    isSingleBtnTrigger = false,
    hideDivider = false,
    onClick,
  }: GroupActionProps,
  ref,
) {
  const [state, send] = useMachine(
    menu.machine({
      id: React.useId(),
      positioning: {placement: positionerProps?.placement || 'bottom-end'},
    }),
  )

  const api = menu.connect(state, send, normalizeProps)

  const customMenuStyles = customStyles?.customMenuStyles
  const customButtonStyles = customStyles?.customButtonStyles

  React.useImperativeHandle(
    ref,
    () => {
      return {
        blur() {
          api.setOpen(false)
        },
      }
    },
    [api],
  )

  React.useEffect(() => {
    if (isTable) {
      const scrollContainer = document.getElementById('zap-table-scroll-container')
      if (scrollContainer) {
        scrollContainer.addEventListener('scroll', () => handleScrollTable(api), {passive: true})
        return () => scrollContainer.removeEventListener('scroll', () => handleScrollTable(api))
      }
    }
  }, [api])

  const dropdown = (
    <>
      {menuItems.length > 0 && (
        <div {...api.getPositionerProps()}>
          <div {...api.getContentProps()} className={classes.menus} style={customMenuStyles}>
            {menuItems
              .filter(menu => {
                if (!menu.filterFn) return true
                // used to pass the table row data in the hide callback
                return menu.filterFn(customData)
              })
              .map(menu => (
                <div
                  key={menu.label}
                  className={clsx(classes.menu, !hideDivider && classes.divider, {
                    [classes.menuDisabled]: menu.disabled,
                  })}
                  {...api.getItemProps({value: menu.label.toLowerCase()})}
                  onClick={
                    menu.disabled
                      ? undefined
                      : isCustomTrigger
                      ? () => menu.onClick(customData)
                      : menu.onClick
                  }
                  style={menu.customStyles}
                >
                  {menu.iconSrc && (
                    <SVG
                      path={menu.iconSrc}
                      svgClassName={clsx(classes.menuIcon, menu.customSvgClassName)}
                    />
                  )}
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
            variant === BUTTON_VARIANT.PRIMARY && classes.btnPrimary,
            variant === BUTTON_VARIANT.SECONDARY && classes.btnSecondary,
            variant === BUTTON_VARIANT.TERTIARY && classes.btnTertiary,
            variant === BUTTON_VARIANT.LINK && classes.btnLink,
            size === BUTTON_SIZE.DEFAULT && classes.btnDefault,
            size === BUTTON_SIZE.SMALL && classes.btnSmall,
            disabled && classes.disabled,
          )}
          disabled={disabled}
          {...api.getTriggerProps()}
        >
          {children}
          <SVG
            path={chevronDown}
            svgClassName={classes.chevronDown}
            spanClassName={classes.chevronDownSpan}
          />
        </button>
      ) : isCustomTrigger ? (
        <button
          className={clsx(
            classes.btn,
            variant === BUTTON_VARIANT.PRIMARY && classes.btnPrimary,
            variant === BUTTON_VARIANT.SECONDARY && classes.btnSecondary,
            variant === BUTTON_VARIANT.TERTIARY && classes.btnTertiary,
            variant === BUTTON_VARIANT.LINK && classes.btnLink,
            size === BUTTON_SIZE.DEFAULT && classes.btnDefault,
            size === BUTTON_SIZE.SMALL && classes.btnSmall,
            disabled && classes.disabled,
            size === BUTTON_SIZE.DEFAULT && classes.iconOnlyDefault,
            size === BUTTON_SIZE.SMALL && classes.iconOnlySmall,
            isTable && classes.groupActionTable,
          )}
          style={customButtonStyles}
          {...api.getTriggerProps()}
        >
          {children}
        </button>
      ) : (
        <div className={classes.btnGrp}>
          <button
            className={clsx(
              classes.btn,
              variant === BUTTON_VARIANT.PRIMARY && classes.btnPrimary,
              variant === BUTTON_VARIANT.SECONDARY && classes.btnSecondary,
              variant === BUTTON_VARIANT.TERTIARY && classes.btnTertiary,
              variant === BUTTON_VARIANT.LINK && classes.btnLink,
              size === BUTTON_SIZE.DEFAULT && classes.btnDefault,
              size === BUTTON_SIZE.SMALL && classes.btnSmall,
              disabled && classes.disabled,
              classes.btnGrpLeft,
            )}
            disabled={disabled}
            onClick={onClick}
          >
            {children}
          </button>

          <button
            className={clsx(
              classes.btn,
              variant === BUTTON_VARIANT.PRIMARY && classes.btnPrimary,
              variant === BUTTON_VARIANT.SECONDARY && classes.btnSecondary,
              variant === BUTTON_VARIANT.TERTIARY && classes.btnTertiary,
              variant === BUTTON_VARIANT.LINK && classes.btnLink,
              size === BUTTON_SIZE.DEFAULT && classes.btnDefault,
              size === BUTTON_SIZE.SMALL && classes.btnSmall,
              disabled && classes.disabled,
              classes.btnGrpRight,
            )}
            disabled={disabled}
            {...api.getTriggerProps()}
          >
            <SVG
              path={chevronDown}
              svgClassName={classes.chevronDown}
              spanClassName={classes.chevronDownSpan}
            />
          </button>
        </div>
      )}
      {isTable ? <Portal>{dropdown}</Portal> : dropdown}
    </>
  )
})

export interface ActionsDropdownProps {
  variant?: BUTTON_VARIANT
  disabled?: boolean
  menuItems: MenuItem[]
  customData?: any
  size?: BUTTON_SIZE
  positionerProps?: PositioningOptions
  isTable?: boolean
  children?: React.ReactNode
  hideDivider?: boolean
  customStyles?: {
    customMenuStyles?: React.CSSProperties
    customButtonStyles?: React.CSSProperties
  }
}

export const ActionsDropdown = React.forwardRef(function (
  {
    variant,
    disabled,
    menuItems,
    customData,
    size,
    positionerProps,
    isTable,
    children,
    hideDivider,
    customStyles,
  }: ActionsDropdownProps,
  ref,
) {
  return (
    <GroupAction
      variant={variant}
      disabled={disabled}
      menuItems={menuItems}
      customData={customData}
      size={size}
      positionerProps={positionerProps}
      isTable={isTable}
      isCustomTrigger={true}
      hideDivider={hideDivider}
      customStyles={customStyles}
      ref={ref}
    >
      {children ? (
        children
      ) : (
        <SVG
          path={moreMenuIcon}
          width={16}
          height={16}
          svgClassName={isTable ? classes.moreMenuIconTable : undefined}
        />
      )}
    </GroupAction>
  )
})

Button.GroupAction = GroupAction
Button.ActionsDropdown = ActionsDropdown
