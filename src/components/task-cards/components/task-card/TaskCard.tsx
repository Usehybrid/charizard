import clsx from 'clsx'
import moreMenuIcon from '../../../assets/more-menu.svg'
import infoOctagonIcon from '../../../assets/info-octagon.svg'
import classes from './task-card.module.css'
import {UserChip} from '../../../user-chip'
import {ITask, ITaskDetails, ITaskObjectValue} from '../../types'
import {Badge, BADGE_HIGHLIGHT, BADGE_STATUS} from '../../../badge'
import {BUTTON_V2_SIZE, BUTTON_V2_VARIANT, ButtonV2} from '../../../button-v2'
import {SVG} from '../../../svg'

export default function TaskCard({data}: {data: ITask}) {
  function isObject(value: ITaskObjectValue | string | null): value is ITaskObjectValue {
    return typeof value === 'object' && value !== null && 'first_name' in value
  }

  return (
    <div className={classes.card}>
      <div className={classes.taskSection}>
        <div className={clsx(classes.taskName, 'zap-content-semibold')}>{data.name}</div>
        <div className={clsx(classes.dateAndTime, 'zap-caption-medium')}>{data.date}</div>
        <Badge
          highlight={BADGE_HIGHLIGHT.ICON}
          icon={data.icon_url}
          status={moduleStatusMap[data.module_reference] || BADGE_STATUS.DEFAULT}
        >
          {data.module_name}
        </Badge>
      </div>
      <div className={classes.detailsSection}>
        {data.details.map((detail: ITaskDetails, i: number) => (
          <div key={i} className={classes.detail}>
            <div className={clsx(classes.detailKey, 'zap-subcontent-medium')}>{detail.key}</div>
            {detail.value && isObject(detail.value) ? (
              <UserChip
                username={detail.value.first_name}
                profileImgUrl={detail.value.profile_img_url}
              />
            ) : detail.value === null ? (
              <div className={clsx(classes.detailValueNA, 'zap-subcontent-medium')}>N/A</div>
            ) : (
              <div className={clsx(classes.detailValue, 'zap-subcontent-medium')}>
                {detail.value}
              </div>
            )}
          </div>
        ))}
      </div>
      <div className={classes.statusSection}>
        <Badge highlight={BADGE_HIGHLIGHT.DOT} status={statusMap[data.status]}>
          <span style={{textTransform: 'capitalize'}}>{data.status}</span>
        </Badge>
      </div>
      <div className={classes.actionSection}>
        <ButtonV2.GroupAction
          menuItems={[{label: 'See Details', onClick: () => {}, iconSrc: infoOctagonIcon}]}
          variant={BUTTON_V2_VARIANT.TERTIARY}
          size={BUTTON_V2_SIZE.SMALL}
        >
          <SVG path={moreMenuIcon} customSvgStyles={{height: '20px', width: '20px'}} />
        </ButtonV2.GroupAction>
      </div>
    </div>
  )
}

const moduleStatusMap: {[key: string]: BADGE_STATUS} = {
  profile: BADGE_STATUS.DEFAULT,
  leave: BADGE_STATUS.POSITIVE,
  it_request: BADGE_STATUS.NEGATIVE,
  attendance: BADGE_STATUS.HIGHLIGHT,
  reimbursement: BADGE_STATUS.DEFAULT,
  document: BADGE_STATUS.HIGHLIGHT,
}

const statusMap: {[key: string]: BADGE_STATUS} = {
  pending: BADGE_STATUS.WARNING,
  declined: BADGE_STATUS.NEGATIVE,
  pending_second_approver: BADGE_STATUS.WARNING,
  cancelled: BADGE_STATUS.NEUTRAL,
  approved: BADGE_STATUS.POSITIVE,
}
