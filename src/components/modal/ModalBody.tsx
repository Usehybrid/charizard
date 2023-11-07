import classes from './styles.module.css'

interface ModalBodyProps {
  /**
   * Modal body children
   */
  children: React.ReactNode
  /**
   * Zagjs modal API (no need to pass when using this component)
   * will be inserted by default
   */
  api?: any
  /**
   * custom styles
   */
  customStyles?: React.CSSProperties
}

export function ModalBody({children, api, customStyles = {}}: ModalBodyProps) {
  return (
    <div {...api.descriptionProps} className={classes.body} style={customStyles}>
      {children}
    </div>
  )
}
