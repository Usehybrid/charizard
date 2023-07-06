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
}

export default function ModalBody({children, api}: ModalBodyProps) {
  return (
    <div {...api.descriptionProps} className={classes.body}>
      {children}
    </div>
  )
}
