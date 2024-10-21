import * as React from 'react'
import * as popover from '@zag-js/popover'
import clsx from 'clsx'
import noteDownloadIcon from '../../assets/notes/note-download.svg'
import classes from './table-export.module.css'
import {SVG} from '../../svg'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {getFileTypeIcon} from '../../upload/helper'

interface TableExportProps {
  exportConfig: {
    isPending: boolean
    isError: boolean
    handleExport: any
    isLegacy?: boolean
  }
}

export default function TableExport({exportConfig}: TableExportProps) {
  const {isPending, handleExport} = exportConfig
  const [state, send] = useMachine(popover.machine({id: React.useId()}))
  const api = popover.connect(state, send, normalizeProps)
  const Wrapper = api.portalled ? Portal : React.Fragment

  const handleExportInternal = async (type: string) => {
    if (isPending) return
    await handleExport(type)
    api.setOpen(false)
  }

  if (exportConfig?.isLegacy)
    return (
      <button
        onClick={() => handleExportInternal('csv')}
        className={clsx(classes.actionCommon, 'zap-reset-btn')}
      >
        <SVG path={noteDownloadIcon} width={16} height={16} />
      </button>
    )

  return (
    <div className={classes.tableExportBox}>
      <button
        {...api.getTriggerProps()}
        className={clsx(classes.actionCommon, 'zap-reset-btn', api.open && classes.active)}
      >
        <SVG path={noteDownloadIcon} width={16} height={16} />
      </button>

      <Wrapper>
        <div {...api.getPositionerProps()} className={classes.positioner}>
          <div {...api.getContentProps()} className={classes.content}>
            <div className={classes.options}>
              <div className={classes.option} onClick={() => handleExportInternal('csv')}>
                <img className={classes.uploadingImg} src={getFileTypeIcon('csv')} alt="csv icon" />
                <p className="zap-subcontent-medium">.csv</p>
              </div>

              <div className={classes.option} onClick={() => handleExportInternal('xlsx')}>
                <img
                  className={classes.uploadingImg}
                  src={getFileTypeIcon('xlsx')}
                  alt="xlsx icon"
                />
                <p className="zap-subcontent-medium">.xlsx</p>
              </div>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  )
}
