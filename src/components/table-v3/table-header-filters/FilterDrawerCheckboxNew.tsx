import * as React from 'react'
import ReactCountryFlag from 'react-country-flag'
import classes from './styles-new.module.css'

export default function FilterDrawerCheckboxNew({
  label,
  checked,
  onChange,
  countryCode,
  customName,
  customStyles,
}: {
  label: string
  checked: boolean
  onChange: (checked: boolean) => void
  countryCode?: string
  customName?: string
  customStyles?: React.CSSProperties
}) {
  return (
    <label className={classes.optionLabel}>
      {/* Hidden Checkbox */}
      <input
        type="checkbox"
        checked={checked}
        onChange={e => onChange(e.target.checked)}
        className={classes.hiddenCheckbox}
      />
      {/* Custom SVG for Checkbox */}
      <span className={classes.customCheckbox}>
        {checked ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <rect
              x="0.5"
              y="0.5"
              width="15"
              height="15"
              rx="3.5"
              fill="var(--theme-blue)"
              stroke="var(--theme-blue)"
            />
            <path
              d="M12 4.5C11.72 4.5 11.47 4.61 11.29 4.79L7 9.09L4.71 6.79C4.53 6.61 4.28 6.5 4 6.5C3.45 6.5 3 6.95 3 7.5C3 7.78 3.11 8.03 3.29 8.21L6.29 11.21C6.47 11.39 6.72 11.5 7 11.5C7.28 11.5 7.53 11.39 7.71 11.21L12.71 6.21C12.89 6.03 13 5.78 13 5.5C13 4.95 12.55 4.5 12 4.5Z"
              fill="white"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
          >
            <rect x="0.5" y="0.5" width="15" height="15" rx="3.5" fill="white" stroke="#D3DBF8" />
          </svg>
        )}
      </span>
      {/* Label Text */}
      <span className={'zap-content-medium'} style={customStyles}>
        {countryCode && (
          <ReactCountryFlag
            countryCode={countryCode}
            style={{
              fontSize: '15px',
              lineHeight: '15px',
              marginRight: '7px',
              verticalAlign: 'unset',
            }}
          />
        )}
        {customName ? <div dangerouslySetInnerHTML={{__html: customName}}></div> : label}
      </span>
    </label>
  )
}
