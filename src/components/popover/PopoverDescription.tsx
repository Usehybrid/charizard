interface PopoverDescriptionProps {
  /**
   * The content of the PopoverDescription.
   */
  children: React.ReactNode
  /**
   * The popover API object.
   */
  api?: any
  /**
   * The styles to apply to the PopoverDescription.
   */
  styles?: React.CSSProperties
  /**
   * The className to apply to the PopoverDescription.
   */
  className?: string
}

export function PopoverDescription({children, api, styles, className}: PopoverDescriptionProps) {
  return (
    <div {...api?.getDescriptionProps()} style={styles} className={className}>
      {children}
    </div>
  )
}
