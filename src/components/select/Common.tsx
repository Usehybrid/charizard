/**
 * @author Pratik Awaik <pratik@hybr1d.io>
 */

import clsx from 'clsx'
import classes from './styles.module.css'
import closeIcon from '../assets/close.svg'
import chevronDownIcon from '../assets/chevron-down.svg'
import {components} from 'react-select'
import {SVG} from '../svg'

export const Option = (props: any) => {
  return (
    <components.Option
      {...props}
      className={clsx({[classes.subLabelContainer]: props.data.subLabel}, classes.optionContainer)}
    >
      <div className={clsx(classes.label)}>
        {props.data.profileImgUrl && (
          <img
            src={props.data.profileImgUrl}
            className={classes.profileImg}
            alt={props.data.label}
          />
        )}
        <span>{props.data.label}</span>
      </div>
      {props.data.subLabel && <div className={clsx(classes.subLabel)}>{props.data.subLabel}</div>}
    </components.Option>
  )
}

export const MultiValueLabel = (props: any) => {
  return (
    <components.MultiValueLabel {...props}>
      <div className={classes.multiLabelContainer}>
        {props.data.profileImgUrl && (
          <img
            src={props.data.profileImgUrl}
            className={classes.profileImg}
            alt={props.data.label}
          />
        )}
        <div className={clsx(classes.label)}>
          <span>{props.data.label}</span>
        </div>
      </div>
    </components.MultiValueLabel>
  )
}

export const MultiValueRemove = (props: any) => {
  return (
    <components.MultiValueRemove {...props}>
      <SVG path={closeIcon} spanClassName={classes.closeSpan} />
    </components.MultiValueRemove>
  )
}

export const ClearIndicator = (props: any) => {
  return (
    <components.ClearIndicator {...props}>
      <SVG path={closeIcon} spanClassName={classes.closeSpan} />
    </components.ClearIndicator>
  )
}

export const DropdownIndicator = (props: any) => {
  return (
    <components.DropdownIndicator {...props}>
      <SVG path={chevronDownIcon} spanClassName={classes.downArrowSpan} />
    </components.DropdownIndicator>
  )
}

export const SingleValue = (props: any) => {
  return (
    <components.SingleValue {...props}>
      <div className={classes.singleValueContainer}>
        {props.data.profileImgUrl && (
          <img
            src={props.data.profileImgUrl}
            className={classes.profileImg}
            alt={props.data.label}
          />
        )}
        <div className={clsx(classes.label)}>
          <span>{props.data.label}</span>
        </div>
      </div>
    </components.SingleValue>
  )
}
