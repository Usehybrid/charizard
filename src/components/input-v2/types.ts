import {TooltipV2Props} from '../tooltip-v2/TooltipV2'

export enum INPUT_COMPONENTS {
  INPUT = 'input',
  TEXTAREA = 'textarea',
  CONTROL = 'control',
  LABEL = 'label',
  GROUP = 'group',
  LEFT_ICON = 'leftIcon',
  RIGHT_ICON = 'rightIcon',
  LEFT_ADORNMENT = 'leftAdornment',
  RIGHT_ADORNMENT = 'rightAdornment',
  COUNT = 'count',
  NUMBER = 'number',
  NUMBER_ADORNMENT = 'numberAdornment',
}

export interface InputV2Props extends React.InputHTMLAttributes<HTMLInputElement> {
  errorMsg?: string
  containerClassName?: string
  inputStyles?: never
  containerStyles?: never
}

export interface TextareaV2Props extends React.TextareaHTMLAttributes<HTMLTextAreaElement> {
  errorMsg?: string
  containerClassName?: string
  inputStyles?: never
  containerStyles?: never
}

export interface InputControlPropsV2 extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface LabelPropsV2 extends React.LabelHTMLAttributes<HTMLLabelElement> {
  children: React.ReactNode
  info?: string
  disabled?: boolean
  required?: boolean
  tooltipProps?: Partial<TooltipV2Props>
}

export interface InputGroupPropsV2 extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
}

export interface InputIconProps {
  icon: string
  onClick?: () => void
  iconStyles?: never
  disabled?: boolean
  className?: string
}

export interface DropdownOption {
  value: string
  label: string
}

export interface BaseInputAdornmentProps {
  children: React.ReactNode
  disabled?: boolean
}

export interface DropdownProps extends BaseInputAdornmentProps {
  isDropdown: true
  options: DropdownOption[]
  onOptionSelect: (value: string) => void
  hideSearch?: boolean
  isLoading?: boolean
}

export interface NonDropdownProps extends BaseInputAdornmentProps {
  isDropdown?: false
  options?: never
  hideSearch?: never
  onOptionSelect?: never
  isLoading?: never
}

export type InputAdornmentProps = DropdownProps | NonDropdownProps

export interface InputCountProps extends InputV2Props {
  onCountChange: (value: number) => void
  onChange?: never
  min?: number
  max?: number
  count?: number
  countContainerClassName?: string
}

export interface InputNumberProps extends InputV2Props {
  onCountChange: (value: number) => void
  onChange?: never
  min?: number
  max?: number
  count?: number
  countContainerClassName?: string
}

export interface NumberAdornmentProps {
  onIncrement: () => void
  onDecrement: () => void
  disabled?: boolean
}
