import * as React from 'react'
import classes from './sortable.module.css'
import dragIcon from '../../../assets/drag-handles.svg'
import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
import type {DraggableSyntheticListeners, UniqueIdentifier} from '@dnd-kit/core'
import type {CSSProperties, PropsWithChildren} from 'react'
import {SVG} from '../../../svg'

interface Props {
  id: UniqueIdentifier
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

export function SortableItem({children, id}: PropsWithChildren<Props>) {
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
      <li className={classes.sort} ref={setNodeRef} style={style}>
        {children}
      </li>
    </SortableItemContext.Provider>
  )
}

export function DragHandle() {
  const {attributes, listeners, ref} = React.useContext(SortableItemContext)

  return (
    <button className={classes.dragHandle} {...attributes} {...listeners} ref={ref}>
      <SVG path={dragIcon} svgClassName={classes.dragIcon} />
    </button>
  )
}
