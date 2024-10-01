import clsx from 'clsx'
import standardIllustration from './standard.svg'
import classes from './styles.module.css'
import {TableProps} from '../Table'
import {BUTTON_V2_TYPE, BUTTON_V2_VARIANT, ButtonV2} from '../../button-v2'
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
            <img
              className={classes.illustration}
              src={standardIllustration}
              alt="empty-state-illustrations"
            />

            <div className={classes.infoBox}>
              <h3 className={clsx(classes.head, 'zap-lead-semibold')}>{heading}</h3>
              <p className={clsx(classes.info, 'zap-content-regular')}>{info}</p>

              {hasCTA && (
                <ButtonV2
                  variant={BUTTON_V2_VARIANT.PRIMARY}
                  type={ctaIcon ? BUTTON_V2_TYPE.ICON_LEFT : BUTTON_V2_TYPE.BASIC}
                  icon={
                    ctaIcon ? (
                      <SVG path={ctaIcon} customSvgStyles={{width: '16px', height: '16px'}} />
                    ) : undefined
                  }
                  onClick={ctaOnclick}
                  customStyles={{marginTop: '10px', width: 'fit-content'}}
                >
                  {ctaTxt}
                </ButtonV2>
              )}
            </div>
          </div>
        </td>
      </tr>
    </tbody>
  )
}
