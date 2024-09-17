import * as React from 'react'
import classes from './sortable.module.css'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import type {DraggableSyntheticListeners, UniqueIdentifier} from '@dnd-kit/core'
import type {CSSProperties, PropsWithChildren} from 'react'
import clsx from 'clsx'

interface Props {
  id: UniqueIdentifier
  isHidden?: boolean
}

interface Context {
  attributes: Record<string, any>
  listeners: DraggableSyntheticListeners
  ref(node: HTMLElement | null): void
}

const SortableItemContext = React.createContext<Context>({
  attributes: {},
  listeners: undefined,
  ref() {},
})

export function SortableItem({children, id, isHidden = false}: PropsWithChildren<Props>) {
  const {
    attributes,
    isDragging,
    listeners,
    setNodeRef,
    setActivatorNodeRef,
    transform,
    transition,
  } = useSortable({id})
  const context = React.useMemo(
    () => ({
      attributes,
      listeners,
      ref: setActivatorNodeRef,
    }),
    [attributes, listeners, setActivatorNodeRef],
  )
  const style: CSSProperties = {
    opacity: isDragging ? 0.4 : undefined,
    transform: CSS.Translate.toString(transform),
    transition,
  }

  return (
    <SortableItemContext.Provider value={context}>
      <li
        className={clsx(classes.sort, isHidden && classes.sortHidden)}
        ref={setNodeRef}
        style={style}
      >
        {children}
      </li>
    </SortableItemContext.Provider>
  )
}

export function DragHandle() {
  const {attributes, listeners, ref} = React.useContext(SortableItemContext)

  return (
    <div className={classes.dragHandle} {...attributes} {...listeners} ref={ref}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="23"
        height="23"
        viewBox="0 0 23 23"
        fill="none"
      >
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.00102 10.4996C9.55382 10.4996 10.002 10.9445 10.002 11.4933L10.002 11.5066C10.002 12.0554 9.55382 12.5003 9.00102 12.5003C8.44822 12.5003 8.00009 12.0554 8.00009 11.5066L8.00009 11.4933C8.00009 10.9445 8.44822 10.4996 9.00102 10.4996Z"
          fill="#9D9DB6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.00102 5.19995C9.55382 5.19995 10.002 5.64484 10.002 6.19364L10.002 6.20689C10.002 6.75569 9.55382 7.20058 9.00102 7.20058C8.44822 7.20058 8.00009 6.75569 8.00009 6.20689L8.00009 6.19364C8.00009 5.64484 8.44822 5.19995 9.00102 5.19995Z"
          fill="#9D9DB6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M9.00102 15.7993C9.55382 15.7993 10.002 16.2442 10.002 16.793L10.002 16.8063C10.002 17.3551 9.55382 17.7999 9.00102 17.7999C8.44822 17.7999 8.00009 17.3551 8.00009 16.8063L8.00009 16.793C8.00009 16.2442 8.44822 15.7993 9.00102 15.7993Z"
          fill="#9D9DB6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 10.4996C14.5528 10.4996 15.001 10.9445 15.001 11.4933L15.001 11.5066C15.001 12.0554 14.5528 12.5003 14 12.5003C13.4472 12.5003 12.9991 12.0554 12.9991 11.5066L12.9991 11.4933C12.9991 10.9445 13.4472 10.4996 14 10.4996Z"
          fill="#9D9DB6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 5.19995C14.5528 5.19995 15.001 5.64484 15.001 6.19364L15.001 6.20689C15.001 6.75569 14.5528 7.20058 14 7.20058C13.4472 7.20058 12.9991 6.75569 12.9991 6.20689L12.9991 6.19364C12.9991 5.64484 13.4472 5.19995 14 5.19995Z"
          fill="#9D9DB6"
        />
        <path
          fillRule="evenodd"
          clipRule="evenodd"
          d="M14 15.7993C14.5528 15.7993 15.001 16.2442 15.001 16.793L15.001 16.8063C15.001 17.3551 14.5528 17.7999 14 17.7999C13.4472 17.7999 12.9991 17.3551 12.9991 16.8063L12.9991 16.793C12.9991 16.2442 13.4472 15.7993 14 15.7993Z"
          fill="#9D9DB6"
        />
      </svg>
    </div>
  )
}
