import * as React from 'react'
import clsx from 'clsx'
import classes from './styles.module.css'

type SelectorsProps = {
  selectors: {name: string; onClick: any}[]
}

export default function Selectors({selectors}: SelectorsProps) {
  const [active, setActive] = React.useState(0)
  return (
    <div className={classes.box}>
      {selectors.map((selector, idx) => (
        <div
          key={selector.name}
          onClick={() => {
            setActive(idx)
            selector.onClick()
          }}
          className={clsx(classes.selector, idx === active && classes.active)}
          style={{
            borderRadius:
              idx === 0 ? '4px 0px 0px 4px' : idx === selectors.length - 1 ? '0px 4px 4px 0px' : 0,
            boxShadow: idx === 0 ? 'none' : '',
          }}
        >
          {selector.name}
        </div>
      ))}
    </div>
  )
}
