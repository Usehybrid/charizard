import clsx from 'clsx'
import noteDownloadIcon from '../../assets/notes/note-download.svg'
import classes from './table-export.module.css'
import {SVG} from '../../svg'

interface TableExportProps {
  exportConfig: {
    isPending: boolean
    isError: boolean
    handleExport: any
  }
}

export default function TableExportLegacy({exportConfig}: TableExportProps) {
  const {isPending, handleExport} = exportConfig

  const handleExportInternal = async (type: string) => {
    if (isPending) return
    await handleExport(type)
  }

  return (
    <button
      className={clsx(classes.actionCommon, 'zap-reset-btn')}
      onClick={() => handleExportInternal('csv')}
    >
      <SVG path={noteDownloadIcon} width={16} height={16} />
    </button>
  )
}
