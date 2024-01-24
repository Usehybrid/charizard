import * as React from 'react'
import * as dialog from '@zag-js/dialog'
import clsx from 'clsx'
import filterIcon from '../../assets/filter-lines.svg'
import classes from './table-filters-drawer.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {SVG} from '../../svg'

interface TableFiltersDrawerProps {
  a?: any
}

export default function TableFiltersDrawer({a}: TableFiltersDrawerProps) {
  const [state, send] = useMachine(dialog.machine({id: 'charizard-table-filters'}))

  const api = dialog.connect(state, send, normalizeProps)
  return (
    <>
      <button
        {...api.triggerProps}
        className={clsx('hybr1d-ui-reset-btn', classes.actionCommon, classes.filterBtn)}
      >
        <SVG path={filterIcon} width={22} height={22} />
        Filter
      </button>
      {api.isOpen && (
        <Portal>
          <div {...api.backdropProps} className={classes.backdrop} />
          <div {...api.positionerProps} style={{...api.positionerProps.style}}>
            <div {...api.contentProps} className={classes.content}>
              <h2 {...api.titleProps}>Edit profile</h2>
              <p {...api.descriptionProps}>
                Make changes to your profile here. Click save when you are done.
              </p>
              <div>
                <input placeholder="Enter name..." />
                <button>Save</button>
              </div>
              <button {...api.closeTriggerProps}>Close</button>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
