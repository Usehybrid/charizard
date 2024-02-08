import * as React from 'react'
import classes from './table-custom-cols.module.css'
import {useDraggable} from '@dnd-kit/core'

interface DraggableProps {
  children: React.ReactNode
  id: string
}

export default function Draggable(props: DraggableProps) {
  const {attributes, listeners, setNodeRef, transform} = useDraggable({
    id: props.id,
  })
  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined

  return (
    <button
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={classes.draggable}
    >
      {props.children}
    </button>
  )
}
