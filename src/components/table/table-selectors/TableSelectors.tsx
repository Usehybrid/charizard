import * as React from 'react'
import classes from './styles.module.css'
import clsx from 'clsx'

interface TableSelectorsProps {
  selectorConfig: {
    selectors: {name: string; onClick: any}[]
  }
}

export default function TableSelectors({selectorConfig}: TableSelectorsProps) {
  const [active, setActive] = React.useState(0)
  return (
    <div className={classes.box}>
      {selectorConfig.selectors.map((selector, idx) => (
        <div
          key={selector.name}
          onClick={() => {
            setActive(idx)
            selector.onClick()
          }}
          className={clsx(classes.selector, idx === active && classes.active)}
          style={{
            borderRadius:
              idx === 0
                ? '4px 0px 0px 4px'
                : idx === selectorConfig.selectors.length - 1
                ? '0px 4px 4px 0px'
                : 0,
            boxShadow: idx === 0 ? 'none' : '',
          }}
        >
          {selector.name}
        </div>
      ))}
    </div>
  )
}
