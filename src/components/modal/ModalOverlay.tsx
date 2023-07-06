import classes from './styles.module.css'

interface ModalOverlayProps {
  /**
   * Zagjs modal API (no need to pass when using this component)
   * will be inserted by default
   */
  api?: any
}

export default function ModalOverlay({api}: ModalOverlayProps) {
  return <div {...api?.backdropProps} className={classes.backdrop} />
}
