import * as React from 'react'
import clsx from 'clsx'
import classes from './table-box-ellipses.module.css'
import {TooltipV2} from '../../../tooltip-v2'

interface TableBoxEllipsesProps {
  data: string | undefined
  customStyle: React.CSSProperties
}

export default function TableBoxEllipses({data, customStyle}: TableBoxEllipsesProps) {
  const [isEllipsesActive, setIsEllipsesActive] = React.useState(false)
  const ellipseRef = React.useRef(null)

  React.useEffect(() => {
    if (ellipseRef.current && checkIsEllipsisActive(ellipseRef.current)) {
      setIsEllipsesActive(true)
    }
  }, [])

  function checkIsEllipsisActive(e: HTMLButtonElement) {
    return e.offsetWidth < e.scrollWidth
  }

  return isEllipsesActive ? (
    <TooltipV2
      placement="right"
      opacity={1}
      portalClass="react-flow__renderer"
      id={`charizard-table-cell-${data}`}
      contentMaxLength={100}
      trigger={
        <div
          className={clsx(classes.box, 'zap-content-medium')}
          style={customStyle}
          ref={ellipseRef}
        >
          {data}
        </div>
      }
      content={data!}
    />
  ) : (
    <div className={clsx(classes.box, 'zap-content-medium')} style={customStyle} ref={ellipseRef}>
      {data}
    </div>
  )
}
