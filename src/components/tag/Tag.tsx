import classes from './styles.module.css'
import {SVG} from '../svg'

interface TagProps {
  text: string
  status: STATUS_MAP
  icon?: string
  customStyles?: React.CSSProperties
}

export enum STATUS_MAP {
  SUCCESS = 'success',
  INFO = 'info',
  ERROR = 'error',
  WARNING = 'warning',
  DEFAULT = 'default',
}

const statusMap = {
  [STATUS_MAP.SUCCESS]: {
    name: 'Assigned',
    bgColor: 'var(--feedback-success-bg)',
    color: 'var(--feedback-success-text)',
  },
  [STATUS_MAP.WARNING]: {
    name: 'Unassigned',
    bgColor: 'var(--feedback-warning-bg)',
    color: 'var(--feedback-warning-text)',
  },
  [STATUS_MAP.INFO]: {
    name: 'In-Transition',
    bgColor: 'var(--feedback-info-bg)',
    color: 'var(--feedback-info-text)',
  },
  [STATUS_MAP.DEFAULT]: {
    name: 'Archived',
    bgColor: 'var(--surface-muted)',
    color: 'var(--text-primary)',
  },
  [STATUS_MAP.ERROR]: {
    name: 'Under maintenance',
    bgColor: 'var(--feedback-error-bg)',
    color: 'var(--feedback-error-text)',
  },
}

export function Tag({status, text, icon, customStyles = {}}: TagProps) {
  return (
    <div
      className={classes.status}
      style={{
        backgroundColor: statusMap[status].bgColor,
        color: statusMap[status].color,
        ...customStyles,
      }}
    >
      {icon && (
        <SVG
          path={icon}
          svgClassName={classes.icon}
          customSvgStyles={{fill: statusMap[status].color, width: '20px', height: '20px'}}
          customSpanStyles={{marginLeft: '-2px'}}
        />
      )}
      {text}
    </div>
  )
}
