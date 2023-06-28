interface PopoverTitleProps {
  /**
   * The content of the PopoverTitle.
   */
  children: React.ReactNode
  /**
   * The popover API object.
   */
  api?: any
  /**
   * The styles to apply to the PopoverTitle.
   */
  styles?: React.CSSProperties
  /**
   * The className to apply to the PopoverTitle.
   */
  className?: string
}

export default function PopoverTitle({children, api, styles, className}: PopoverTitleProps) {
  return (
    <div {...api?.titleProps} style={styles} className={className}>
      {children}
    </div>
  )
}
