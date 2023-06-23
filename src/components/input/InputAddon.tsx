import clsx from 'clsx'
import classes from './styles.module.scss'
import {Inputs, Placement} from './types'

interface InputAddonProps {
  children: React.ReactNode
  placement?: Placement
}

function InputAddon({children, placement = 'left'}: InputAddonProps) {
  const attr = placement === 'left' ? 'left' : 'right'

  return <div className={clsx(classes.inputAddon, classes[attr])}>{children}</div>
}

interface InputDirectionAddonProps {
  children: React.ReactNode
}

export function InputLeftAddon({children}: InputDirectionAddonProps) {
  return <InputAddon placement="left" children={children} />
}

export function InputRightAddon({children}: InputDirectionAddonProps) {
  return <InputAddon placement="right" children={children} />
}

InputAddon.displayName = Inputs.INPUT_ADDON
InputAddon.id = Inputs.INPUT_ADDON

InputLeftAddon.displayName = Inputs.INPUT_LEFT_ADDON
InputLeftAddon.id = Inputs.INPUT_LEFT_ADDON

InputRightAddon.displayName = Inputs.INPUT_RIGHT_ADDON
InputRightAddon.id = Inputs.INPUT_RIGHT_ADDON
