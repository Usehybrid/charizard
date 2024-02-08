import * as React from 'react'
import * as dialog from '@zag-js/dialog'
import clsx from 'clsx'
import viewColIcon from '../../assets/view-columns.svg'
import closeIcon from '../../assets/close.svg'
import classes from './table-custom-cols.module.css'
import {useMachine, normalizeProps, Portal} from '@zag-js/react'
import {SVG} from '../../svg'
import {BUTTON_VARIANT, Button} from '../../button'
import {Search} from '../../search'
import {TableV2Props} from '../TableV2'

interface TableCustomColsProps {
  customColumnConfig: TableV2Props['customColumnConfig']
}

export default function TableCustomCols({customColumnConfig}: TableCustomColsProps) {
  // const [filterCheckedState, setFilterCheckedState] = React.useState<Record<string, any[]>>({})
  const [search, setSearch] = React.useState('')

  const [state, send] = useMachine(
    dialog.machine({
      id: 'charizard-table-filters',
      onOpenChange(details) {
        if (!details.open) {
          // setFilterCheckedState({})
        }
      },
    }),
  )

  const api = dialog.connect(state, send, normalizeProps)

  const handleSave = () => {}

  const columns = [{id: 'test1'}]

  const filteredCols = [{id: 'test'}]

  return (
    <>
      <button {...api.triggerProps} className={clsx('hybr1d-ui-reset-btn', classes.actionCommon)}>
        <SVG path={viewColIcon} width={22} height={22} />
      </button>
      {api.isOpen && (
        <Portal>
          <div {...api.backdropProps} className={classes.backdrop} />
          <div {...api.positionerProps} style={{...api.positionerProps.style}}>
            <div {...api.contentProps} className={classes.content}>
              <h2 {...api.titleProps} className={classes.title}>
                <div>
                  <span>Columns</span>
                  <p {...api.descriptionProps} className={classes.desc}>
                    Description here
                  </p>
                </div>
                <button
                  {...api.closeTriggerProps}
                  type="button"
                  // onClick={api?.close}
                  className="hybr1d-ui-reset-btn"
                >
                  <SVG
                    path={closeIcon}
                    svgClassName={classes.closeIcon}
                    spanClassName={classes.closeIconSpan}
                  />
                </button>
              </h2>

              <div className={classes.colBox}>
                <div className={classes.dropdownSearch}>
                  <Search
                    id="table-custom-column-search"
                    search={search}
                    setSearch={setSearch}
                    placeholder={'Search'}
                  />
                </div>

                {
                  <div className={classes.options}>
                    {filteredCols.length === 0 ? (
                      <div className={classes.optionsEmpty}>No results found</div>
                    ) : (
                      <>
                        {columns?.map((column, idx) => (
                          <div
                            key={idx}
                            className={classes.option}
                            // style={{
                            //   display: search.length
                            //     ? !filteredOptions.includes(option.value)
                            //       ? 'none'
                            //       : undefined
                            //     : undefined,
                            // }}
                          >
                            test
                          </div>
                        ))}
                      </>
                    )}
                  </div>
                }
              </div>

              <div className={classes.footer}>
                <Button {...api.closeTriggerProps} variant={BUTTON_VARIANT.SECONDARY}>
                  Cancel
                </Button>
                <Button onClick={handleSave}>Save</Button>
              </div>
            </div>
          </div>
        </Portal>
      )}
    </>
  )
}
