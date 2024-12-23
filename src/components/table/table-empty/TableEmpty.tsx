import clsx from 'clsx'
import standardIllustration from './standard.svg'
import classes from './table-empty.module.css'
import {TableProps} from '../Table'
import {BUTTON_TYPE, BUTTON_VARIANT, Button} from '../../button'
import {SVG} from '../../svg'

interface TableEmptyProps {
  emptyStateConfig: TableProps['emptyStateConfig']
  visibleCols: number
}

export default function TableEmpty({emptyStateConfig, visibleCols}: TableEmptyProps) {
  const heading = emptyStateConfig?.title || 'Uh oh! Nothing found'
  const info =
    emptyStateConfig?.desc || 'Try applying a different set of filters and check the results.'
  const ctaTxt = emptyStateConfig?.btnText
  const ctaOnclick = emptyStateConfig?.onClick
  const ctaIcon = emptyStateConfig?.icon
  const hasCTA = ctaTxt && ctaOnclick

  return (
    <tbody>
      <tr>
        <td style={emptyStateConfig?.customStyle} colSpan={visibleCols}>
          <div className={classes.box}>
            <div className={classes.illustrationContainer}>
              <img
                className={classes.illustration}
                src={standardIllustration}
                alt="empty-state-illustrations"
              />
            </div>
            <div className={classes.infoBox}>
              <h3 className={clsx(classes.head, 'zap-lead-semibold')}>{heading}</h3>
              <p className={clsx(classes.info, 'zap-content-regular')}>{info}</p>
              {hasCTA && (
                <Button
                  variant={BUTTON_VARIANT.PRIMARY}
                  type={ctaIcon ? BUTTON_TYPE.ICON_LEFT : BUTTON_TYPE.BASIC}
                  icon={
                    ctaIcon ? (
                      <SVG path={ctaIcon} customSvgStyles={{width: '16px', height: '16px'}} />
                    ) : undefined
                  }
                  onClick={ctaOnclick}
                  customStyles={{marginTop: '10px', width: 'fit-content'}}
                >
                  {ctaTxt}
                </Button>
              )}
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )
}
